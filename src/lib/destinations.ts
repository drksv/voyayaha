import heroDawn from "@/assets/hero-dawn.jpg";
import hiddenWaterfall from "@/assets/place-hidden-waterfall.jpg";
import caveTemple from "@/assets/place-cave-temple.jpg";
import mindfulLake from "@/assets/place-mindful-lake.jpg";
import villageCraft from "@/assets/place-village-craft.jpg";
import stepwell from "@/assets/place-stepwell.jpg";
import fortClouds from "@/assets/place-fort-clouds.jpg";
import riverGhat from "@/assets/place-river-ghat.jpg";
import forestTrail from "@/assets/place-forest-trail.jpg";
import homestay from "@/assets/place-homestay.jpg";

export type CategorySlug =
  | "hidden-places"
  | "spiritual-journeys"
  | "mindful-escapes"
  | "village-local"
  | "heritage";

export type Category = {
  slug: CategorySlug;
  label: string;
  short: string;
  tagline: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
};

export const categories: Category[] = [
  {
    slug: "hidden-places",
    label: "Hidden Places",
    short: "Hidden",
    tagline: "Beyond the obvious",
    description:
      "Lesser-known destinations, quiet natural corners and offbeat attractions that rarely appear on a standard tourist trail.",
    metaTitle: "Hidden Places to Discover | Voyayaha",
    metaDescription:
      "Discover hidden places, offbeat attractions and quiet natural corners beyond mainstream tourism. Save them, visit them, remember them.",
  },
  {
    slug: "spiritual-journeys",
    label: "Spiritual Journeys",
    short: "Spiritual",
    tagline: "Places of devotion and stillness",
    description:
      "Temples, pilgrimage routes, ashrams, meditation centres and sacred landmarks across many faiths and traditions.",
    metaTitle: "Spiritual Journeys & Sacred Places | Voyayaha",
    metaDescription:
      "Explore temples, pilgrimage circuits, ashrams and sacred landmarks across traditions. Meaningful spiritual travel, curated with care.",
  },
  {
    slug: "mindful-escapes",
    label: "Mindful Escapes",
    short: "Mindful",
    tagline: "Slow down, on purpose",
    description:
      "Restorative places for meditation, nature, wellness and digital detox — where the point of the trip is to travel slowly.",
    metaTitle: "Mindful Escapes & Quiet Retreats | Voyayaha",
    metaDescription:
      "Find quiet retreats, nature stays and restorative places built for slowing down, reflection and digital detox travel.",
  },
  {
    slug: "village-local",
    label: "Village & Local",
    short: "Village",
    tagline: "Life as it is lived",
    description:
      "Villages, crafts, kitchens, homestays and community experiences where travel happens alongside local life.",
    metaTitle: "Village & Local Experiences | Voyayaha",
    metaDescription:
      "Stay in villages, learn crafts, eat home-cooked food and join community experiences rooted in real local life.",
  },
  {
    slug: "heritage",
    label: "Heritage",
    short: "Heritage",
    tagline: "Stone, story and memory",
    description:
      "Historical sites, architecture, museums and living traditions that carry a place's memory forward.",
    metaTitle: "Heritage & Culture Destinations | Voyayaha",
    metaDescription:
      "Discover historical places, architecture, museums and living cultural traditions worth travelling slowly for.",
  },
];

export function getCategory(slug: CategorySlug): Category {
  return categories.find((c) => c.slug === slug)!;
}

export type Destination = {
  slug: string;
  name: string;
  location: string;
  region: string;
  category: CategorySlug;
  secondaryCategories?: CategorySlug[];
  image: string;
  imageAlt: string;
  summary: string;
  whySpecial: string[];
  experiences: string[];
  bestTime: string;
  howToReach: string[];
  significance?: string;
  localExperiences: string[];
  nearby: string[];
  memories: { traveler: string; note: string; when: string }[];
  featured?: boolean;
};

export const destinations: Destination[] = [
  {
    slug: "hampi-sunrise-ruins",
    name: "Hampi's Eastern Ruins at Sunrise",
    location: "Hampi, Karnataka",
    region: "South India",
    category: "heritage",
    secondaryCategories: ["spiritual-journeys", "hidden-places"],
    image: heroDawn,
    imageAlt: "Traveller on ancient stone steps facing a temple tower in Hampi at sunrise",
    summary:
      "A boulder-strewn river valley of temples and bazaars where dawn light turns granite the colour of embers.",
    whySpecial: [
      "The eastern group of ruins stays almost empty until mid-morning, so sunrise here feels private.",
      "Fourteenth-century streets, sacred tanks and colonnaded bazaars are still legible in the landscape.",
      "The Tungabhadra river and granite hills make the site as much a natural place as a monumental one.",
    ],
    experiences: [
      "Walk the old bazaar street to the temple gopuram before the day heats up",
      "Cross the river by coracle to the quieter northern hamlets",
      "Sit on Matanga Hill for the last light over the valley",
    ],
    bestTime: "November to February, for cool mornings and clear light.",
    howToReach: [
      "Nearest railhead: Hosapete (13 km), with overnight trains from Bengaluru and Hubballi.",
      "Nearest airport: Hubballi (145 km) or Bengaluru (340 km).",
      "Local travel is easiest by bicycle or scooter; the site is spread over several kilometres.",
    ],
    significance:
      "The valley is identified with Kishkindha in the Ramayana, and the Virupaksha temple has been in continuous worship for over five centuries.",
    localExperiences: [
      "Breakfast of idli and filter coffee at a family kitchen in Kamalapur",
      "Stone-carving demonstration with a local sculptor",
      "Banana-plantation walk with a farmer from Anegundi",
    ],
    nearby: ["anegundi-village", "badami-cave-shrines"],
    memories: [
      {
        traveler: "Meera R.",
        note: "I came for the temples and stayed for the silence. Sat on a rock for an hour and did not once reach for my phone.",
        when: "January 2026",
      },
      {
        traveler: "Arun K.",
        note: "A shepherd showed me a carving I would have walked straight past. That five-minute detour was the trip.",
        when: "December 2025",
      },
    ],
    featured: true,
  },
  {
    slug: "devkund-gorge-falls",
    name: "Devkund Gorge Falls",
    location: "Bhira, Raigad, Maharashtra",
    region: "Western Ghats",
    category: "hidden-places",
    secondaryCategories: ["mindful-escapes"],
    image: hiddenWaterfall,
    imageAlt: "Tall waterfall falling into a green basalt gorge in the Western Ghats",
    summary:
      "A curtain of water at the end of a forest trail, reached on foot through a monsoon-green basalt gorge.",
    whySpecial: [
      "The approach is a two-hour walk through forest and stream crossings, so the falls stay uncrowded on weekdays.",
      "Basalt walls hold mist all morning, giving the pool a hushed, cathedral quality.",
      "Local guides from the village manage access, which keeps the site cared for.",
    ],
    experiences: [
      "Walk the streambed trail with a village guide",
      "Sit at the far ledge where the spray reaches you",
      "Return through the plateau for views over the reservoir",
    ],
    bestTime: "Late September to December, once the monsoon flow settles and trails are safe.",
    howToReach: [
      "Base village: Bhira, about 4 hours by road from Mumbai and 3 from Pune.",
      "Nearest railhead: Karjat, then a local taxi to Bhira.",
      "The final stretch is trail-only; guides are arranged at the village gate.",
    ],
    localExperiences: [
      "Rice-and-solkadhi lunch cooked by a Bhira household",
      "Guided walk on Ghat medicinal plants",
    ],
    nearby: ["kalsubai-cloud-fort", "sahyadri-pine-trail"],
    memories: [
      {
        traveler: "Nikhil D.",
        note: "Left Pune at four in the morning, had the pool to ourselves by nine. Worth every wet shoe.",
        when: "October 2025",
      },
    ],
    featured: true,
  },
  {
    slug: "badami-cave-shrines",
    name: "Badami Cave Shrines",
    location: "Badami, Karnataka",
    region: "South India",
    category: "spiritual-journeys",
    secondaryCategories: ["heritage"],
    image: caveTemple,
    imageAlt: "Rock-cut cave temple with carved pillars set into a sandstone hillside",
    summary:
      "Sixth-century shrines cut straight into a sandstone cliff, lit for a few minutes each morning by a single shaft of sun.",
    whySpecial: [
      "Four cave temples carved from living rock, dedicated across Shaiva, Vaishnava and Jain traditions.",
      "The reliefs are early Chalukyan work — some of the oldest of their kind still in place.",
      "The tank below reflects the whole cliff at first light.",
    ],
    experiences: [
      "Climb to Cave 3 for the Vishnu reliefs before the tour groups arrive",
      "Walk the tank path to the north fort steps",
      "Stay for evening prayer at the Bhutanatha shrine",
    ],
    bestTime: "October to February; mornings are best for photography and for cool stone underfoot.",
    howToReach: [
      "Nearest railhead: Badami, on the Hubballi–Solapur line.",
      "Nearest airport: Hubballi (105 km).",
      "The caves are a short walk from the town centre.",
    ],
    significance:
      "Badami was the Chalukyan capital, and the caves mark one of the earliest points where Hindu and Jain rock-cut worship shared a single cliff.",
    localExperiences: [
      "Jowar rotti thali at a Badami home kitchen",
      "Heritage walk with a local historian through the old town",
    ],
    nearby: ["hampi-sunrise-ruins", "chand-baori-stepwell"],
    memories: [
      {
        traveler: "Fatima S.",
        note: "An old caretaker explained the carvings for twenty minutes and refused money. I still think about it.",
        when: "November 2025",
      },
    ],
    featured: true,
  },
  {
    slug: "still-lake-retreat",
    name: "Still Lake Meditation Retreat",
    location: "Bhandardara, Maharashtra",
    region: "Western Ghats",
    category: "mindful-escapes",
    image: mindfulLake,
    imageAlt: "Wooden jetty beside a misty lake at sunrise",
    summary:
      "A lakeside retreat where the day begins with mist on the water and nothing on the schedule before breakfast.",
    whySpecial: [
      "No wifi in the common areas by design; phones stay in the room.",
      "Sunrise sittings happen on a wooden deck a metre above the water.",
      "Silence is kept from evening to mid-morning, which changes how the place sounds.",
    ],
    experiences: [
      "Dawn sitting on the lake deck",
      "Slow walk to the reservoir wall with a flask of tea",
      "Evening journalling session under the neem tree",
    ],
    bestTime: "September to February, when mornings hold mist and nights are cool.",
    howToReach: [
      "By road: 5 hours from Mumbai, 4 from Pune, via Igatpuri.",
      "Nearest railhead: Igatpuri (45 km).",
      "Pick-ups are arranged from Igatpuri by prior request.",
    ],
    localExperiences: [
      "Vegetarian farm-to-table meals from the retreat's own garden",
      "Guided breathwork with a resident teacher",
    ],
    nearby: ["sahyadri-pine-trail", "kalsubai-cloud-fort"],
    memories: [
      {
        traveler: "Priya M.",
        note: "Two days of not talking and I could hear the lake move. I've never rested like that on a holiday.",
        when: "February 2026",
      },
    ],
    featured: true,
  },
  {
    slug: "anegundi-village",
    name: "Anegundi Potters' Village",
    location: "Anegundi, Koppal, Karnataka",
    region: "South India",
    category: "village-local",
    secondaryCategories: ["heritage"],
    image: villageCraft,
    imageAlt: "Village potter shaping clay on a wheel in a mud-walled workshop",
    summary:
      "An older settlement across the river from Hampi, where clay, banana fibre and stone are still worked by hand.",
    whySpecial: [
      "Potters, weavers and banana-fibre craftspeople work in home workshops open to visitors.",
      "The village is older than Hampi itself and much quieter.",
      "Community-run homestays return income directly to households.",
    ],
    experiences: [
      "Sit at the wheel with a potter and throw your own bowl",
      "Walk the riverside path to the old ferry point",
      "Share an evening meal in a homestay courtyard",
    ],
    bestTime: "November to February. Craft workshops run year-round on weekdays.",
    howToReach: [
      "From Hampi: coracle across the Tungabhadra, or 30 km by road via Gangavathi.",
      "Nearest railhead: Hosapete (25 km).",
    ],
    localExperiences: [
      "Banana-fibre weaving session",
      "Home-cooked North Karnataka thali",
      "Bullock-cart ride through the paddy fields",
    ],
    nearby: ["hampi-sunrise-ruins", "kutch-craft-homestay"],
    memories: [
      {
        traveler: "Sanjay B.",
        note: "My pot collapsed twice. The potter laughed, fixed it, and sent it home with me anyway.",
        when: "December 2025",
      },
    ],
    featured: true,
  },
  {
    slug: "chand-baori-stepwell",
    name: "Chand Baori Stepwell",
    location: "Abhaneri, Rajasthan",
    region: "North India",
    category: "heritage",
    secondaryCategories: ["hidden-places"],
    image: stepwell,
    imageAlt: "Symmetrical sandstone steps descending into an ancient stepwell",
    summary:
      "Thirteen storeys of geometric sandstone steps descending into cool shadow — engineering as devotion.",
    whySpecial: [
      "One of the deepest and most precisely built stepwells in India.",
      "Afternoon shadows turn the geometry into something close to op-art.",
      "Most visitors stop for ten minutes; an hour here is a different experience.",
    ],
    experiences: [
      "Trace the shadow line as it moves across the steps",
      "Visit the adjacent Harshat Mata temple ruins",
      "Talk to the site caretaker about the well's water years",
    ],
    bestTime: "October to March. Late afternoon for shadow and shape.",
    howToReach: [
      "By road: 95 km from Jaipur, 1.5 hours via the Agra highway.",
      "Nearest railhead: Bandikui (8 km).",
    ],
    significance:
      "Stepwells were both water infrastructure and community space; the attached temple made the descent a small pilgrimage.",
    localExperiences: [
      "Rajasthani home lunch in Abhaneri village",
      "Village walk to the potters' lane",
    ],
    nearby: ["badami-cave-shrines", "kutch-craft-homestay"],
    memories: [
      {
        traveler: "Devika N.",
        note: "Went at 4pm on a caretaker's advice. The shadows made it a completely different building.",
        when: "November 2025",
      },
    ],
  },
  {
    slug: "kalsubai-cloud-fort",
    name: "Kalsubai Cloud Fort",
    location: "Bari, Ahmednagar, Maharashtra",
    region: "Western Ghats",
    category: "hidden-places",
    secondaryCategories: ["mindful-escapes"],
    image: fortClouds,
    imageAlt: "Hilltop fort ruins above a sea of clouds at sunrise",
    summary:
      "Ruined ramparts on a ridge that sits above the cloud line on winter mornings.",
    whySpecial: [
      "The cloud inversion below the ridge is a genuine phenomenon here, not a lucky photograph.",
      "The trail passes through three hamlets that host walkers for tea.",
      "Almost no infrastructure at the top, which is the point.",
    ],
    experiences: [
      "Start the climb at 4am to reach the ridge before sunrise",
      "Walk the ramparts along the eastern wall",
      "Descend through the terraced fields to Bari village",
    ],
    bestTime: "November to February for cloud inversions and safe, dry trails.",
    howToReach: [
      "Base village: Bari, 5 hours by road from Mumbai.",
      "Nearest railhead: Igatpuri (55 km).",
      "Local guides are strongly recommended for pre-dawn starts.",
    ],
    localExperiences: [
      "Trailside tea and pithla-bhakri in a village kitchen",
      "Night-sky session on the ridge with a local guide",
    ],
    nearby: ["devkund-gorge-falls", "still-lake-retreat"],
    memories: [
      {
        traveler: "Rohit A.",
        note: "We climbed in the dark and came out above the clouds. Nobody spoke for about ten minutes.",
        when: "January 2026",
      },
    ],
  },
  {
    slug: "maheshwar-ghats",
    name: "Maheshwar River Ghats",
    location: "Maheshwar, Madhya Pradesh",
    region: "Central India",
    category: "spiritual-journeys",
    secondaryCategories: ["heritage", "village-local"],
    image: riverGhat,
    imageAlt: "River ghats at dawn with oil lamps floating on the water",
    summary:
      "Stone ghats on the Narmada where morning prayer, laundry, weaving and ferry life all happen at once.",
    whySpecial: [
      "The ghats are still working riverfront, not a monument set aside for visitors.",
      "Maheshwari handloom weaving has been practised here since the eighteenth century.",
      "Evening lamp offerings drift downriver in the hundreds.",
    ],
    experiences: [
      "Sit on the ghat steps for the dawn prayer",
      "Take a rowboat upriver at first light",
      "Watch a Maheshwari sari come off the loom",
    ],
    bestTime: "October to March. Aim for dawn and dusk on the water.",
    howToReach: [
      "By road: 90 km from Indore, about 2.5 hours.",
      "Nearest airport: Indore.",
      "Nearest railhead: Barwaha (39 km).",
    ],
    significance:
      "The Narmada is revered along its whole length, and Maheshwar is a traditional halt on the river's circumambulation route.",
    localExperiences: [
      "Handloom workshop visit with a weaving family",
      "Riverside breakfast of poha and jalebi",
    ],
    nearby: ["badami-cave-shrines", "kutch-craft-homestay"],
    memories: [
      {
        traveler: "Ishaan V.",
        note: "A boatman sang the whole way upriver. I recorded it and still play it at home.",
        when: "December 2025",
      },
    ],
  },
  {
    slug: "sahyadri-pine-trail",
    name: "Sahyadri Pine Trail",
    location: "Kasara Ghat, Maharashtra",
    region: "Western Ghats",
    category: "mindful-escapes",
    secondaryCategories: ["hidden-places"],
    image: forestTrail,
    imageAlt: "Foggy pine forest trail with a weathered wooden bench",
    summary:
      "A gentle forest walk in fog and pine, with benches placed for sitting rather than for views.",
    whySpecial: [
      "Flat, unhurried and short — designed for slow walking, not for summiting anything.",
      "Fog holds in this stretch until late morning through winter.",
      "A community trail, maintained by two neighbouring villages.",
    ],
    experiences: [
      "Walk the loop twice: once talking, once in silence",
      "Sit at the middle bench for the birdsong hour after dawn",
      "Carry a flask and stay through the fog lifting",
    ],
    bestTime: "June to February. Fog is heaviest in the monsoon and early winter.",
    howToReach: [
      "Nearest railhead: Kasara, then a 20-minute local ride.",
      "By road: 3 hours from Mumbai on the Nashik highway.",
    ],
    localExperiences: [
      "Forest-edge tea stall run by the trail committee",
      "Birdwatching walk with a village naturalist",
    ],
    nearby: ["still-lake-retreat", "kalsubai-cloud-fort"],
    memories: [
      {
        traveler: "Anita J.",
        note: "The least dramatic place I've travelled to and the one I recommend most.",
        when: "August 2025",
      },
    ],
  },
  {
    slug: "kutch-craft-homestay",
    name: "Kutch Craft Homestay",
    location: "Hodka, Kutch, Gujarat",
    region: "West India",
    category: "village-local",
    secondaryCategories: ["heritage"],
    image: homestay,
    imageAlt: "Village homestay courtyard at dusk with lanterns and painted mud walls",
    summary:
      "A bhunga courtyard in the Banni grasslands where embroidery, lacquer work and long dinners fill the evening.",
    whySpecial: [
      "Run by the village as a collective, with earnings shared across households.",
      "Mud-relief and mirror-work walls are made and repaired by the family that hosts you.",
      "The grassland light at dusk is unlike anywhere else in the country.",
    ],
    experiences: [
      "Embroidery session with a Meghwal artisan",
      "Evening walk into the grassland for the light",
      "Dinner cooked and eaten in the courtyard",
    ],
    bestTime: "November to February, overlapping the Rann season without the crowds.",
    howToReach: [
      "By road: 65 km from Bhuj, about 1.5 hours.",
      "Nearest airport and railhead: Bhuj.",
    ],
    localExperiences: [
      "Lacquer-turning demonstration in Nirona",
      "Rogan art visit with a practising family",
      "Folk music evening with village musicians",
    ],
    nearby: ["anegundi-village", "chand-baori-stepwell"],
    memories: [
      {
        traveler: "Leah T.",
        note: "I learnt four stitches badly and was fed three times too much. Best week of my year.",
        when: "January 2026",
      },
    ],
  },
];

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function destinationsByCategory(slug: CategorySlug): Destination[] {
  return destinations.filter(
    (d) => d.category === slug || d.secondaryCategories?.includes(slug),
  );
}

export function searchDestinations(query: string): Destination[] {
  const q = query.trim().toLowerCase();
  if (!q) return destinations;
  const words = q.split(/\s+/);
  return destinations.filter((d) => {
    const haystack = [
      d.name,
      d.location,
      d.region,
      d.summary,
      getCategory(d.category).label,
      ...(d.secondaryCategories ?? []).map((c) => getCategory(c).label),
    ]
      .join(" ")
      .toLowerCase();
    return words.some((w) => haystack.includes(w));
  });
}

export const searchExamples = [
  "Hidden places near Pune",
  "Spiritual places in Maharashtra",
  "Peaceful places near Mumbai",
  "Villages worth visiting",
  "Mindful weekend escapes",
];

export const travelerDiscoveries = destinations
  .flatMap((d) =>
    d.memories.map((m) => ({
      ...m,
      place: d.name,
      slug: d.slug,
      location: d.location,
      image: d.image,
      imageAlt: d.imageAlt,
    })),
  )
  .slice(0, 4);
