<?php
/**
 * Plugin Name: Voyayaha Travel Memories API
 * Description: Adds a moderated public submission endpoint for Voyayaha Travel Memories and exposes latitude/longitude/location/date/image metadata through WordPress REST API.
 * Version: 1.0.0
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
        'methods' => 'POST',
        'permission_callback' => '__return_true',
        'callback' => 'voyayaha_submit_travel_memory',
    ]);
});

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

add_action('rest_api_init', function () {
    add_filter('rest_pre_serve_request', function ($served, $result, $request) {
        if (strpos($request->get_route(), '/voyayaha/v1/travel-memory') === 0 || strpos($request->get_route(), '/wp/v2/travel_memory') !== false) {
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type');
        }
        return $served;
    }, 10, 3);
});

add_action('init', function () {
    if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS' && isset($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], '/wp-json/voyayaha/v1/travel-memory') !== false) {
        header('Access-Control-Allow-Origin: *'); header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); header('Access-Control-Allow-Headers: Content-Type'); status_header(200); exit;
    }
});
