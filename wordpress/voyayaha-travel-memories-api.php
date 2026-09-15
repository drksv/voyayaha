<?php
/**
 * Plugin Name: Voyayaha Travel Memories API
 * Description: Adds a moderated public submission endpoint for Voyayaha Travel Memories and exposes latitude/longitude/location/date/image metadata through WordPress REST API.
 * Version: 1.3.0
 */

if (!defined('ABSPATH')) exit;

add_action('init', function () {
    if (!post_type_exists('travel_memory')) return;
    $fields = [
        'latitude' => 'string', 'longitude' => 'string', 'location' => 'string', 'date' => 'string', 'image' => 'string'
    ];
    foreach ($fields as $key => $type) {
        register_post_meta('travel_memory', $key, [
            'type' => $type, 'single' => true, 'show_in_rest' => true, 'auth_callback' => '__return_true'
        ]);
    }
}, 20);

add_action('rest_api_init', function () {
    register_rest_route('voyayaha/v1', '/travel-memory', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => 'voyayaha_get_travel_memories',
    ]);
    register_rest_route('voyayaha/v1', '/travel-memory', [
        'methods' => 'POST',
        'permission_callback' => '__return_true',
        'callback' => 'voyayaha_submit_travel_memory',
    ]);
});

function voyayaha_get_travel_memories(WP_REST_Request $request) {
    if (!post_type_exists('travel_memory')) {
        return new WP_Error('travel_memory_post_type_missing', 'The travel_memory post type is not registered.', ['status' => 503]);
    }
    $posts = get_posts([
        'post_type' => 'travel_memory',
        'post_status' => 'publish',
        'posts_per_page' => min(100, max(1, (int)($request->get_param('per_page') ?: 100))),
        'orderby' => 'date',
        'order' => 'DESC',
    ]);
    $items = [];
    foreach ($posts as $post) {
        $items[] = [
            'id' => $post->ID,
            'title' => ['rendered' => get_the_title($post)],
            'content' => ['rendered' => apply_filters('the_content', $post->post_content)],
            'meta' => [
                'latitude' => get_post_meta($post->ID, 'latitude', true),
                'longitude' => get_post_meta($post->ID, 'longitude', true),
                'location' => get_post_meta($post->ID, 'location', true),
                'date' => get_post_meta($post->ID, 'date', true),
                'image' => get_post_meta($post->ID, 'image', true),
            ],
        ];
    }
    return rest_ensure_response($items);
}

function voyayaha_submit_travel_memory(WP_REST_Request $request) {
    $ip = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : 'unknown';
    $rate_key = 'voyayaha_memory_' . md5($ip);
    if (get_transient($rate_key)) return new WP_Error('rate_limited', 'Please wait a few minutes before submitting another memory.', ['status' => 429]);
    set_transient($rate_key, 1, 120);

    if (!empty($request->get_param('website'))) return new WP_Error('spam', 'Submission rejected.', ['status' => 400]);
    $title = sanitize_text_field($request->get_param('title'));
    $location = sanitize_text_field($request->get_param('location'));
    $lat = filter_var($request->get_param('latitude'), FILTER_VALIDATE_FLOAT);
    $lon = filter_var($request->get_param('longitude'), FILTER_VALIDATE_FLOAT);
    $date = sanitize_text_field($request->get_param('date'));
    $description = wp_kses_post($request->get_param('description'));

    if (!$title || !$location || $lat === false || $lon === false) return new WP_Error('invalid_memory', 'Title, place and valid map coordinates are required.', ['status' => 400]);
    if ($lat < -90 || $lat > 90 || $lon < -180 || $lon > 180) return new WP_Error('invalid_coordinates', 'The selected coordinates are invalid.', ['status' => 400]);

    $post_id = wp_insert_post(['post_type' => 'travel_memory', 'post_status' => 'pending', 'post_title' => $title, 'post_content' => $description], true);
    if (is_wp_error($post_id)) return $post_id;

    update_post_meta($post_id, 'latitude', (string)$lat);
    update_post_meta($post_id, 'longitude', (string)$lon);
    update_post_meta($post_id, 'location', $location);
    if ($date) update_post_meta($post_id, 'date', $date);

    if (!empty($_FILES['photo']['name'])) {
        require_once ABSPATH . 'wp-admin/includes/file.php';
        require_once ABSPATH . 'wp-admin/includes/media.php';
        require_once ABSPATH . 'wp-admin/includes/image.php';
        $file = $_FILES['photo'];
        if (!empty($file['size']) && $file['size'] > 5 * 1024 * 1024) { wp_delete_post($post_id, true); return new WP_Error('image_too_large', 'Please use an image smaller than 5 MB.', ['status' => 400]); }
        $allowed = ['image/jpeg', 'image/png', 'image/webp'];
        $check = wp_check_filetype_and_ext($file['tmp_name'], $file['name']);
        if (!$check['type'] || !in_array($check['type'], $allowed, true)) { wp_delete_post($post_id, true); return new WP_Error('invalid_image', 'Please upload a JPG, PNG or WebP image.', ['status' => 400]); }
        $attachment_id = media_handle_upload('photo', $post_id);
        if (is_wp_error($attachment_id)) { wp_delete_post($post_id, true); return $attachment_id; }
        update_post_meta($post_id, 'image', esc_url_raw(wp_get_attachment_url($attachment_id)));
        set_post_thumbnail($post_id, $attachment_id);
    }

    return new WP_REST_Response(['success' => true, 'id' => $post_id, 'message' => 'Travel memory submitted for review.'], 201);
}

/**
 * CORS for the public Travel Memories endpoint.
 *
 * The endpoint is intentionally public and the frontend does not send cookies
 * or WordPress authentication. We reflect only known Voyayaha frontend origins
 * instead of using a wildcard, and we explicitly handle OPTIONS preflight.
 */
function voyayaha_travel_memory_is_route() {
    $uri = isset($_SERVER['REQUEST_URI']) ? wp_unslash($_SERVER['REQUEST_URI']) : '';
    return strpos($uri, '/wp-json/voyayaha/v1/travel-memory') !== false;
}

function voyayaha_travel_memory_allowed_origin() {
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? esc_url_raw(wp_unslash($_SERVER['HTTP_ORIGIN'])) : '';
    if (!$origin) return '';

    $allowed = [
        'https://voyayaha.com',
        'https://www.voyayaha.com',
    ];

    // Also allow local development origins.
    if (in_array($origin, $allowed, true) || preg_match('#^https?://localhost(?::\\d+)?$#', $origin) || preg_match('#^https?://127\\.0\\.0\\.1(?::\\d+)?$#', $origin)) {
        return $origin;
    }

    // If the production frontend is served from another custom domain, set
    // VOYAYAHA_FRONTEND_ORIGIN in wp-config.php to that exact origin.
    if (defined('VOYAYAHA_FRONTEND_ORIGIN') && VOYAYAHA_FRONTEND_ORIGIN && hash_equals(rtrim((string) VOYAYAHA_FRONTEND_ORIGIN, '/'), rtrim($origin, '/'))) {
        return $origin;
    }

    return '';
}

function voyayaha_travel_memory_cors_headers() {
    if (!voyayaha_travel_memory_is_route()) return;
    $origin = voyayaha_travel_memory_allowed_origin();
    if (!$origin) return;

    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Accept, Content-Type, X-WP-Nonce');
    header('Access-Control-Max-Age: 600');
    header('Vary: Origin', false);
}

add_action('send_headers', 'voyayaha_travel_memory_cors_headers', 20);

add_filter('rest_pre_serve_request', function ($served, $result, $request) {
    if (strpos($request->get_route(), '/voyayaha/v1/travel-memory') === 0) {
        voyayaha_travel_memory_cors_headers();
    }
    return $served;
}, 10, 3);

// WordPress normally answers REST OPTIONS requests. This explicit handler is
// only for the Travel Memory route and avoids host/security-layer interference.
add_action('init', function () {
    if (!voyayaha_travel_memory_is_route()) return;
    if (isset($_SERVER['REQUEST_METHOD']) && strtoupper($_SERVER['REQUEST_METHOD']) === 'OPTIONS') {
        voyayaha_travel_memory_cors_headers();
        status_header(204);
        exit;
    }
}, 1);

