export type SacredSite = {
  name: string;
  city: string;
  state: string;
  religion: string;
  circuits: string[];
  description: string;
  latitude: number;
  longitude: number;
};

const site = (
  name: string,
  city: string,
  state: string,
  religion: string,
  circuits: string[],
  description: string,
  latitude: number,
  longitude: number,
): SacredSite => ({ name, city, state, religion, circuits, description, latitude, longitude });

/*
 * Sacred India is intentionally a broad, multi-faith pilgrimage catalogue.
 * A site may belong to several collections; filtering never removes a
 * destination just because it appears in another circuit.
 */
export const sacredIndia: SacredSite[] = [
  // Hindu — Char Dham, Jyotirlinga, Shakti Peetha and major pilgrimage sites
  site("Badrinath", "Badrinath", "Uttarakhand", "Hindu", ["Pilgrimage", "Chota Char Dham", "Bada Char Dham"], "A major Vaishnava pilgrimage shrine in the Himalaya.", 30.7433, 79.4938),
  site("Kedarnath", "Kedarnath", "Uttarakhand", "Hindu", ["Pilgrimage", "Chota Char Dham", "Jyotirlinga"], "A Himalayan Shaiva pilgrimage shrine dedicated to Shiva.", 30.7346, 79.0669),
  site("Gangotri", "Gangotri", "Uttarakhand", "Hindu", ["Pilgrimage", "Chota Char Dham"], "A sacred Himalayan temple associated with the Ganges.", 30.9942, 78.9398),
  site("Yamunotri", "Yamunotri", "Uttarakhand", "Hindu", ["Pilgrimage", "Chota Char Dham"], "A high Himalayan shrine associated with the Yamuna.", 31.0138, 78.4601),
  site("Ramanathaswamy Temple", "Rameswaram", "Tamil Nadu", "Hindu", ["Pilgrimage", "Bada Char Dham", "Jyotirlinga"], "A major Shaiva temple and one of the traditional Char Dham destinations.", 9.2881, 79.3174),
  site("Dwarkadhish Temple", "Dwarka", "Gujarat", "Hindu", ["Pilgrimage", "Bada Char Dham"], "A major Krishna pilgrimage centre on Gujarat's western coast.", 22.2376, 68.9675),
  site("Jagannath Temple", "Puri", "Odisha", "Hindu", ["Pilgrimage", "Bada Char Dham"], "One of the most important Vaishnava pilgrimage centres in India.", 19.8049, 85.8179),

  site("Somnath Temple", "Prabhas Patan", "Gujarat", "Hindu", ["Pilgrimage", "Jyotirlinga"], "A major Shaiva shrine on the Arabian Sea.", 20.8880, 70.4010),
  site("Mallikarjuna Temple", "Srisailam", "Andhra Pradesh", "Hindu", ["Pilgrimage", "Jyotirlinga"], "A major Shaiva pilgrimage shrine on the Krishna River.", 16.0720, 78.8680),
  site("Mahakaleshwar Temple", "Ujjain", "Madhya Pradesh", "Hindu", ["Pilgrimage", "Jyotirlinga"], "A major Shaiva temple in the ancient city of Ujjain.", 23.1828, 75.7682),
  site("Omkareshwar Temple", "Omkareshwar", "Madhya Pradesh", "Hindu", ["Pilgrimage", "Jyotirlinga"], "A Narmada island pilgrimage associated with Shiva.", 22.2426, 76.1485),
  site("Bhimashankar Temple", "Bhimashankar", "Maharashtra", "Hindu", ["Pilgrimage", "Jyotirlinga"], "A forested Shaiva pilgrimage centre in the Sahyadris.", 19.0728, 73.5355),
  site("Kashi Vishwanath Temple", "Varanasi", "Uttar Pradesh", "Hindu", ["Pilgrimage", "Jyotirlinga"], "A major Shaiva pilgrimage destination on the Ganges.", 25.3109, 83.0107),
  site("Trimbakeshwar Temple", "Trimbak", "Maharashtra", "Hindu", ["Pilgrimage", "Jyotirlinga"], "A major Shaiva shrine near the source region of the Godavari.", 19.9322, 73.5307),
  site("Nageshwar Jyotirlinga", "Dwarka", "Gujarat", "Hindu", ["Pilgrimage", "Jyotirlinga"], "A coastal Shaiva pilgrimage site near Dwarka.", 22.3351, 68.9662),
  site("Grishneshwar Temple", "Verul (Ellora)", "Maharashtra", "Hindu", ["Pilgrimage", "Jyotirlinga"], "A Shaiva shrine near the Ellora caves.", 20.0238, 75.1780),
  site("Baidyanath Temple", "Deoghar", "Jharkhand", "Hindu", ["Pilgrimage", "Jyotirlinga"], "A major Shaiva pilgrimage centre in Deoghar.", 24.4860, 86.6953),

  // Shakti Peetha collection represented in the supplied catalogue
  site("Bhramaramba Mallikarjuna Temple", "Srisailam", "Andhra Pradesh", "Hindu", ["Pilgrimage", "Shakti Peetha"], "A revered Shakti tradition site associated with Srisailam.", 16.0720, 78.8680),
  site("Kukkuteswara Swamy Temple", "Pithapuram", "Andhra Pradesh", "Hindu", ["Pilgrimage", "Shakti Peetha"], "A historic sacred centre in the Shakti tradition.", 17.1167, 82.2667),
  site("Bhimeswara Temple", "Draksharamam", "Andhra Pradesh", "Hindu", ["Pilgrimage", "Shakti Peetha"], "An important temple town in the Godavari delta.", 16.7904, 82.0644),
  site("Kamakhya Temple", "Guwahati", "Assam", "Hindu", ["Pilgrimage", "Shakti Peetha"], "A major Shakta pilgrimage centre on Nilachal Hill.", 26.1664, 91.7056),
  site("Mangla Gauri Temple", "Gaya", "Bihar", "Hindu", ["Pilgrimage", "Shakti Peetha"], "A revered Shakti shrine in Gaya.", 24.7725, 84.9990),
  site("Jwalamukhi Temple", "Jwalamukhi", "Himachal Pradesh", "Hindu", ["Pilgrimage", "Shakti Peetha"], "A celebrated flame shrine in the Kangra region.", 31.8740, 76.3218),
  site("Chamundeshwari Temple", "Mysuru", "Karnataka", "Hindu", ["Pilgrimage", "Shakti Peetha"], "A prominent hilltop temple dedicated to Chamundeshwari.", 12.3052, 76.6640),
  site("Mahalakshmi Temple", "Kolhapur", "Maharashtra", "Hindu", ["Pilgrimage", "Shakti Peetha"], "A major goddess pilgrimage centre in Maharashtra.", 16.7008, 74.2239),
  site("Renuka Temple", "Mahur", "Maharashtra", "Hindu", ["Pilgrimage", "Shakti Peetha"], "A revered goddess shrine in the Mahur hills.", 19.8500, 77.9300),
  site("Biraja Temple", "Jajpur", "Odisha", "Hindu", ["Pilgrimage", "Shakti Peetha"], "An important Shakta temple in the ancient city of Jajpur.", 20.8480, 86.3330),
  site("Kamakshi Amman Temple", "Kanchipuram", "Tamil Nadu", "Hindu", ["Pilgrimage", "Shakti Peetha"], "A major goddess temple in Kanchipuram.", 12.8431, 79.7036),
  site("Jogulamba Temple", "Alampur", "Telangana", "Hindu", ["Pilgrimage", "Shakti Peetha"], "A historic goddess shrine on the Tungabhadra.", 15.8777, 78.1330),
  site("Vishalakshi Temple", "Varanasi", "Uttar Pradesh", "Hindu", ["Pilgrimage", "Shakti Peetha"], "A revered goddess shrine in the sacred city of Varanasi.", 25.3070, 83.0100),
  site("Alopi Devi Temple", "Prayagraj", "Uttar Pradesh", "Hindu", ["Pilgrimage", "Shakti Peetha"], "A traditional Shakti shrine in Prayagraj.", 25.4358, 81.8463),
  site("Kalighat Kali Temple", "Kolkata", "West Bengal", "Hindu", ["Pilgrimage", "Shakti Peetha"], "One of Kolkata's best-known goddess pilgrimage centres.", 22.5216, 88.3426),
  site("Vaishno Devi", "Katra", "Jammu and Kashmir", "Hindu", ["Pilgrimage", "Shakti Peetha"], "A major pilgrimage destination in the Trikuta mountains.", 33.0300, 74.9490),
  site("Kamakshi Temple", "Kanchipuram", "Tamil Nadu", "Hindu", ["Pilgrimage", "Shakti Peetha"], "A major Shakta pilgrimage temple in Kanchipuram.", 12.8431, 79.7036),
  site("Shrikala Devi Temple", "Pandua", "West Bengal", "Hindu", ["Pilgrimage", "Shakti Peetha"], "A sacred goddess site represented in traditional regional lists.", 23.0740, 88.2860),

  // Major Hindu pilgrimage destinations
  site("Tirumala Venkateswara Temple", "Tirupati", "Andhra Pradesh", "Hindu", ["Pilgrimage"], "One of India's most visited Hindu pilgrimage centres.", 13.6833, 79.3472),
  site("Srisailam Mallikarjuna", "Srisailam", "Andhra Pradesh", "Hindu", ["Pilgrimage", "Jyotirlinga"], "A major Shaiva and Shakti pilgrimage centre.", 16.0720, 78.8680),
  site("Kanaka Durga Temple", "Vijayawada", "Andhra Pradesh", "Hindu", ["Pilgrimage"], "A major goddess temple on Indrakeeladri Hill.", 16.5160, 80.6160),
  site("Shirdi Sai Baba Temple", "Shirdi", "Maharashtra", "Hindu", ["Pilgrimage"], "A major pilgrimage centre associated with Sai Baba of Shirdi.", 19.7668, 74.4770),
  site("Siddhivinayak Temple", "Mumbai", "Maharashtra", "Hindu", ["Pilgrimage"], "A prominent Ganesh pilgrimage temple in Mumbai.", 19.0167, 72.8300),
  site("Sabarimala", "Pathanamthitta", "Kerala", "Hindu", ["Pilgrimage"], "A major Ayyappa pilgrimage centre in the Western Ghats.", 9.4310, 77.0810),
  site("Guruvayur Sri Krishna Temple", "Guruvayur", "Kerala", "Hindu", ["Pilgrimage"], "A major Krishna pilgrimage centre in Kerala.", 10.5940, 76.0410),
  site("Padmanabhaswamy Temple", "Thiruvananthapuram", "Kerala", "Hindu", ["Pilgrimage"], "A major Vaishnava temple in Kerala's capital.", 8.4824, 76.9431),
  site("Udupi Sri Krishna Temple", "Udupi", "Karnataka", "Hindu", ["Pilgrimage"], "A major Krishna pilgrimage centre associated with Madhva tradition.", 13.3409, 74.7421),
  site("Murudeshwar Temple", "Murudeshwar", "Karnataka", "Hindu", ["Pilgrimage"], "A prominent coastal Shaiva pilgrimage centre.", 14.0943, 74.4840),
  site("Sringeri Sharada Peetham", "Sringeri", "Karnataka", "Hindu", ["Pilgrimage"], "A historic Advaita Vedanta monastic and pilgrimage centre.", 13.4160, 75.2520),
  site("Meenakshi Amman Temple", "Madurai", "Tamil Nadu", "Hindu", ["Pilgrimage"], "A major historic temple and pilgrimage centre dedicated to Meenakshi and Sundareshwarar.", 9.9195, 78.1193),
  site("Brihadisvara Temple", "Thanjavur", "Tamil Nadu", "Hindu", ["Pilgrimage"], "A monumental Chola-era temple and living place of worship.", 10.7828, 79.1318),
  site("Kanyakumari Temple", "Kanyakumari", "Tamil Nadu", "Hindu", ["Pilgrimage"], "A major coastal goddess pilgrimage centre at India's southern tip.", 8.0883, 77.5385),
  site("Ranganathaswamy Temple", "Srirangam", "Tamil Nadu", "Hindu", ["Pilgrimage"], "One of India's major Vaishnava temple complexes.", 10.8620, 78.6907),
  site("Ekambareswarar Temple", "Kanchipuram", "Tamil Nadu", "Hindu", ["Pilgrimage"], "A major Shaiva temple in Kanchipuram.", 12.8470, 79.7000),
  site("Ayodhya Ram Mandir", "Ayodhya", "Uttar Pradesh", "Hindu", ["Pilgrimage"], "A major contemporary pilgrimage destination associated with Rama.", 26.7990, 82.2040),
  site("Ram Janmabhoomi", "Ayodhya", "Uttar Pradesh", "Hindu", ["Pilgrimage"], "A central sacred destination in Ayodhya's pilgrimage landscape.", 26.7990, 82.2040),
  site("Krishna Janmabhoomi", "Mathura", "Uttar Pradesh", "Hindu", ["Pilgrimage"], "A major Krishna pilgrimage site in Mathura.", 27.5050, 77.6737),
  site("Banke Bihari Temple", "Vrindavan", "Uttar Pradesh", "Hindu", ["Pilgrimage"], "A major Krishna devotional centre in Vrindavan.", 27.5810, 77.6970),
  site("Har Ki Pauri", "Haridwar", "Uttarakhand", "Hindu", ["Pilgrimage"], "A celebrated Ganges ghat and pilgrimage centre.", 29.9457, 78.1642),
  site("Rishikesh Ganga Ghats", "Rishikesh", "Uttarakhand", "Hindu", ["Pilgrimage"], "A major spiritual centre on the Ganges.", 30.0869, 78.2676),
  site("Triveni Sangam", "Prayagraj", "Uttar Pradesh", "Hindu", ["Pilgrimage"], "A major confluence pilgrimage site and Kumbh destination.", 25.4300, 81.8840),
  site("Nathdwara Shrinathji Temple", "Nathdwara", "Rajasthan", "Hindu", ["Pilgrimage"], "A major Krishna pilgrimage centre in Rajasthan.", 24.9350, 73.8230),
  site("Brahma Temple", "Pushkar", "Rajasthan", "Hindu", ["Pilgrimage"], "A famous pilgrimage temple on Pushkar Lake.", 26.4890, 74.5510),
  site("Somnath Temple", "Prabhas Patan", "Gujarat", "Hindu", ["Pilgrimage", "Jyotirlinga"], "A major Shaiva shrine on the Arabian Sea.", 20.8880, 70.4010),
  site("Akshardham", "Gandhinagar", "Gujarat", "Hindu", ["Pilgrimage"], "A major modern Hindu cultural and devotional complex.", 23.2232, 72.6500),
  site("Jagatpita Brahma Mandir", "Pushkar", "Rajasthan", "Hindu", ["Pilgrimage"], "One of the best-known temples dedicated to Brahma.", 26.4890, 74.5510),
  site("Amarnath Cave", "Pahalgam", "Jammu and Kashmir", "Hindu", ["Pilgrimage"], "A high-altitude Himalayan pilgrimage destination associated with Shiva.", 34.2140, 75.5000),

  // Buddhist pilgrimage
  site("Mahabodhi Temple", "Bodh Gaya", "Bihar", "Buddhist", ["Pilgrimage", "Buddhist Circuit"], "A major Buddhist pilgrimage site associated with the Buddha's enlightenment.", 24.6950, 84.9911),
  site("Sarnath", "Sarnath", "Uttar Pradesh", "Buddhist", ["Pilgrimage", "Buddhist Circuit"], "The site traditionally associated with the Buddha's first sermon.", 25.3811, 83.0227),
  site("Kushinagar", "Kushinagar", "Uttar Pradesh", "Buddhist", ["Pilgrimage", "Buddhist Circuit"], "A major Buddhist pilgrimage site associated with the Buddha's parinirvana.", 27.7399, 83.8880),
  site("Shravasti", "Shravasti", "Uttar Pradesh", "Buddhist", ["Pilgrimage", "Buddhist Circuit"], "An important Buddhist pilgrimage site associated with the Buddha's teaching.", 27.5100, 82.0500),
  site("Rajgir", "Rajgir", "Bihar", "Buddhist", ["Pilgrimage", "Buddhist Circuit"], "An important Buddhist pilgrimage landscape associated with the Buddha.", 25.0308, 85.4204),
  site("Nalanda Mahavihara", "Nalanda", "Bihar", "Buddhist", ["Pilgrimage", "Buddhist Circuit"], "The historic monastic university and an important Buddhist heritage site.", 25.1367, 85.4436),
  site("Sankassa", "Farrukhabad", "Uttar Pradesh", "Buddhist", ["Pilgrimage", "Buddhist Circuit"], "A traditional Buddhist pilgrimage site associated with the Buddha's return from heaven.", 27.3330, 79.3000),
  site("Tawang Monastery", "Tawang", "Arunachal Pradesh", "Buddhist", ["Pilgrimage", "Buddhist Circuit"], "A major Himalayan Buddhist monastery in Arunachal Pradesh.", 27.5860, 91.8590),
  site("Namgyal Monastery", "McLeod Ganj", "Himachal Pradesh", "Buddhist", ["Pilgrimage", "Buddhist Circuit"], "A major Tibetan Buddhist monastery in Dharamshala.", 32.2396, 76.3210),
  site("Rumtek Monastery", "Rumtek", "Sikkim", "Buddhist", ["Pilgrimage", "Buddhist Circuit"], "A major Tibetan Buddhist monastery near Gangtok.", 27.3069, 88.5567),

  // Jain pilgrimage
  site("Dilwara Temples", "Mount Abu", "Rajasthan", "Jain", ["Pilgrimage", "Jain Circuit"], "A celebrated group of Jain temples known for detailed marble carving.", 24.5926, 72.7156),
  site("Palitana Temples", "Palitana", "Gujarat", "Jain", ["Pilgrimage", "Jain Circuit"], "A vast Jain temple complex on Shatrunjaya Hill.", 21.5255, 71.8315),
  site("Shikharji", "Parasnath", "Jharkhand", "Jain", ["Pilgrimage", "Jain Circuit"], "One of the most important Jain pilgrimage destinations.", 23.9620, 86.1500),
  site("Ranakpur Jain Temple", "Ranakpur", "Rajasthan", "Jain", ["Pilgrimage", "Jain Circuit"], "A celebrated Jain temple complex known for intricate marble architecture.", 25.1150, 73.4720),
  site("Pawapuri Jal Mandir", "Pawapuri", "Bihar", "Jain", ["Pilgrimage", "Jain Circuit"], "A major Jain pilgrimage site associated with Mahavira.", 25.0880, 85.6380),
  site("Shravanabelagola", "Hassan", "Karnataka", "Jain", ["Pilgrimage", "Jain Circuit"], "A major Jain pilgrimage centre dominated by the Bahubali monolith.", 12.8570, 76.4880),
  site("Sonagiri Jain Temples", "Datia", "Madhya Pradesh", "Jain", ["Pilgrimage", "Jain Circuit"], "A hill of historic Jain temples in Madhya Pradesh.", 25.5800, 78.3400),
  site("Kundalpur", "Damoh", "Madhya Pradesh", "Jain", ["Pilgrimage", "Jain Circuit"], "A major Jain pilgrimage landscape in central India.", 23.8330, 79.0000),
  site("Hastinapur Jain Temples", "Hastinapur", "Uttar Pradesh", "Jain", ["Pilgrimage", "Jain Circuit"], "An important Jain pilgrimage town associated with several Tirthankaras.", 29.1600, 78.0100),

  // Sikh pilgrimage
  site("Golden Temple", "Amritsar", "Punjab", "Sikh", ["Pilgrimage", "Sikh Circuit"], "The Harmandir Sahib, one of Sikhism's most important gurdwaras.", 31.6200, 74.8765),
  site("Anandpur Sahib", "Anandpur Sahib", "Punjab", "Sikh", ["Pilgrimage", "Sikh Circuit"], "A major Sikh pilgrimage centre and historic city of the Khalsa.", 31.2360, 76.5020),
  site("Takht Sri Patna Sahib", "Patna", "Bihar", "Sikh", ["Pilgrimage", "Sikh Circuit"], "One of Sikhism's five Takhts and the birthplace of Guru Gobind Singh.", 25.6000, 85.1360),
  site("Takht Sri Hazur Sahib", "Nanded", "Maharashtra", "Sikh", ["Pilgrimage", "Sikh Circuit"], "One of Sikhism's five Takhts in Nanded.", 19.1480, 77.3220),
  site("Takht Sri Damdama Sahib", "Talwandi Sabo", "Punjab", "Sikh", ["Pilgrimage", "Sikh Circuit"], "One of Sikhism's five Takhts.", 29.9830, 75.0900),
  site("Hemkund Sahib", "Chamoli", "Uttarakhand", "Sikh", ["Pilgrimage", "Sikh Circuit"], "A high-altitude Sikh pilgrimage site beside a glacial lake.", 30.7020, 79.6000),
  site("Bangla Sahib Gurudwara", "New Delhi", "Delhi", "Sikh", ["Pilgrimage", "Sikh Circuit"], "A prominent historic gurdwara in central Delhi.", 28.6260, 77.2090),
  site("Gurdwara Sis Ganj Sahib", "New Delhi", "Delhi", "Sikh", ["Pilgrimage", "Sikh Circuit"], "A historic gurdwara in Old Delhi.", 28.6560, 77.2310),
  site("Tarn Taran Sahib", "Tarn Taran", "Punjab", "Sikh", ["Pilgrimage", "Sikh Circuit"], "A major Sikh pilgrimage centre south of Amritsar.", 31.4510, 74.9250),

  // Muslim / Sufi pilgrimage
  site("Ajmer Sharif Dargah", "Ajmer", "Rajasthan", "Muslim", ["Pilgrimage", "Sufi Shrines"], "A major Sufi pilgrimage destination associated with Khwaja Moinuddin Chishti.", 26.4550, 74.6280),
  site("Nizamuddin Dargah", "New Delhi", "Delhi", "Muslim", ["Pilgrimage", "Sufi Shrines"], "A major Sufi shrine in Delhi associated with Nizamuddin Auliya.", 28.5915, 77.2420),
  site("Haji Ali Dargah", "Mumbai", "Maharashtra", "Muslim", ["Pilgrimage", "Sufi Shrines"], "A famous shrine on an islet off Mumbai's coast.", 18.9827, 72.8095),
  site("Nagore Dargah", "Nagore", "Tamil Nadu", "Muslim", ["Pilgrimage", "Sufi Shrines"], "A major South Indian Sufi pilgrimage centre.", 10.8160, 79.8430),
  site("Dargah of Sheikh Salim Chishti", "Fatehpur Sikri", "Uttar Pradesh", "Muslim", ["Pilgrimage", "Sufi Shrines"], "A historic Sufi shrine within Fatehpur Sikri.", 27.0945, 77.6670),
  site("Bande Nawaz Dargah", "Kalaburagi", "Karnataka", "Muslim", ["Pilgrimage", "Sufi Shrines"], "A major Sufi shrine associated with Khwaja Bande Nawaz.", 17.3297, 76.8343),
  site("Charar-i-Sharief", "Charar-i-Sharief", "Jammu and Kashmir", "Muslim", ["Pilgrimage", "Sufi Shrines"], "A major Sufi pilgrimage town in Kashmir.", 33.8630, 74.7650),

  // Christian pilgrimage / heritage
  site("Basilica of Bom Jesus", "Old Goa", "Goa", "Christian", ["Pilgrimage", "Christian Heritage"], "A major Christian pilgrimage and heritage site in Goa.", 15.5009, 73.9110),
  site("Se Cathedral", "Old Goa", "Goa", "Christian", ["Pilgrimage", "Christian Heritage"], "A major historic cathedral in Old Goa.", 15.5030, 73.9120),
  site("Velankanni Basilica", "Velankanni", "Tamil Nadu", "Christian", ["Pilgrimage", "Christian Heritage"], "A major Marian pilgrimage destination on India's southeast coast.", 10.6810, 79.8450),
  site("San Thome Basilica", "Chennai", "Tamil Nadu", "Christian", ["Pilgrimage", "Christian Heritage"], "A major Christian pilgrimage basilica in Chennai.", 13.0339, 80.2760),
  site("Santa Cruz Basilica", "Kochi", "Kerala", "Christian", ["Pilgrimage", "Christian Heritage"], "A historic basilica and Christian landmark in Fort Kochi.", 9.9650, 76.2420),
  site("St. Francis Church", "Kochi", "Kerala", "Christian", ["Pilgrimage", "Christian Heritage"], "A historic church in Fort Kochi.", 9.9650, 76.2420),
  site("Mount Mary Basilica", "Mumbai", "Maharashtra", "Christian", ["Pilgrimage", "Christian Heritage"], "A major Marian church and pilgrimage destination in Bandra.", 19.0430, 72.8210),
  site("Basilica of Our Lady of Good Health", "Vailankanni", "Tamil Nadu", "Christian", ["Pilgrimage", "Christian Heritage"], "A major Marian pilgrimage basilica in Tamil Nadu.", 10.6810, 79.8450),
];

export const sacredReligions = Array.from(
  new Set(sacredIndia.map((site) => site.religion)),
).sort();

export const sacredCircuits = [
  "All",
  ...Array.from(new Set(sacredIndia.flatMap((site) => site.circuits))).sort((a, b) => {
    if (a === "Pilgrimage") return -1;
    if (b === "Pilgrimage") return 1;
    return a.localeCompare(b);
  }),
];
