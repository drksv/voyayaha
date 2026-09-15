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

const site = (name: string, city: string, state: string, religion: string, circuits: string[], latitude: number, longitude: number, description = "A major sacred and pilgrimage destination in India."): SacredSite => ({ name, city, state, religion, circuits, description, latitude, longitude });

export const sacredIndia: SacredSite[] = [
  // Chota Char Dham + Bada Char Dham + Jyotirlingas
  site("Badrinath", "Badrinath", "Uttarakhand", "Hindu", ["Pilgrimage", "Chota Char Dham", "Bada Char Dham"], 30.7433, 79.4938, "A major Vishnu pilgrimage shrine in the Himalayas."),
  site("Kedarnath", "Kedarnath", "Uttarakhand", "Hindu", ["Pilgrimage", "Chota Char Dham", "Jyotirlinga"], 30.7346, 79.0669, "A major Shiva shrine and one of the twelve Jyotirlingas."),
  site("Gangotri", "Gangotri", "Uttarakhand", "Hindu", ["Pilgrimage", "Chota Char Dham"], 30.9947, 78.9398, "A revered Himalayan temple associated with the Ganga."),
  site("Yamunotri", "Yamunotri", "Uttarakhand", "Hindu", ["Pilgrimage", "Chota Char Dham"], 31.0140, 78.4580, "A Himalayan pilgrimage shrine associated with the Yamuna."),
  site("Dwarkadhish Temple", "Dwarka", "Gujarat", "Hindu", ["Pilgrimage", "Bada Char Dham"], 22.2376, 68.9670, "A major Krishna pilgrimage centre on Gujarat's western coast."),
  site("Jagannath Temple", "Puri", "Odisha", "Hindu", ["Pilgrimage", "Bada Char Dham"], 19.8049, 85.8175, "One of India's most important Vaishnavite pilgrimage temples."),
  site("Ramanathaswamy Temple", "Rameswaram", "Tamil Nadu", "Hindu", ["Pilgrimage", "Bada Char Dham", "Jyotirlinga"], 9.2881, 79.3174, "A major Shiva pilgrimage temple on Rameswaram island."),
  site("Somnath Temple", "Somnath", "Gujarat", "Hindu", ["Pilgrimage", "Jyotirlinga"], 20.8880, 70.4012, "One of the twelve traditional Jyotirlinga shrines."),
  site("Mallikarjuna Temple", "Srisailam", "Andhra Pradesh", "Hindu", ["Pilgrimage", "Jyotirlinga", "Shakti Peetha"], 16.0724, 78.8681, "A major Shiva-Shakti pilgrimage centre on the Krishna River."),
  site("Mahakaleshwar Temple", "Ujjain", "Madhya Pradesh", "Hindu", ["Pilgrimage", "Jyotirlinga"], 23.1828, 75.7682, "A major Shiva shrine and Jyotirlinga in Ujjain."),
  site("Omkareshwar Temple", "Omkareshwar", "Madhya Pradesh", "Hindu", ["Pilgrimage", "Jyotirlinga"], 22.2411, 76.1511, "A Jyotirlinga shrine on the Narmada River."),
  site("Bhimashankar Temple", "Bhimashankar", "Maharashtra", "Hindu", ["Pilgrimage", "Jyotirlinga"], 19.0728, 73.5363, "A Jyotirlinga shrine in the Sahyadri hills."),
  site("Kashi Vishwanath Temple", "Varanasi", "Uttar Pradesh", "Hindu", ["Pilgrimage", "Jyotirlinga"], 25.3109, 83.0107, "A major Shaiva pilgrimage destination on the Ganges."),
  site("Trimbakeshwar Temple", "Trimbak", "Maharashtra", "Hindu", ["Pilgrimage", "Jyotirlinga"], 19.9322, 73.5308, "One of the twelve Jyotirlinga shrines near Nashik."),
  site("Vaidyanath Temple", "Deoghar", "Jharkhand", "Hindu", ["Pilgrimage", "Jyotirlinga"], 24.4926, 86.6980, "A major Shiva pilgrimage centre traditionally counted among the Jyotirlingas."),
  site("Nageshwar Temple", "Dwarka", "Gujarat", "Hindu", ["Pilgrimage", "Jyotirlinga"], 22.3352, 68.9712, "A Shiva pilgrimage shrine traditionally associated with the Jyotirlinga tradition."),
  site("Grishneshwar Temple", "Verul", "Maharashtra", "Hindu", ["Pilgrimage", "Jyotirlinga"], 20.0258, 75.1780, "A Jyotirlinga shrine near the Ellora caves."),

  // Shakti Peetha collection (traditions and identifications vary)
  site("Kamakhya Temple", "Guwahati", "Assam", "Hindu", ["Pilgrimage", "Shakti Peetha"], 26.1664, 91.7055, "A major Shakta pilgrimage centre on Nilachal Hill."),
  site("Kalighat Kali Temple", "Kolkata", "West Bengal", "Hindu", ["Pilgrimage", "Shakti Peetha"], 22.5215, 88.3426),
  site("Jwalamukhi Temple", "Jwalamukhi", "Himachal Pradesh", "Hindu", ["Pilgrimage", "Shakti Peetha"], 31.8750, 76.3197),
  site("Vishalakshi Temple", "Varanasi", "Uttar Pradesh", "Hindu", ["Pilgrimage", "Shakti Peetha"], 25.3107, 83.0100),
  site("Mahalakshmi Temple", "Kolhapur", "Maharashtra", "Hindu", ["Pilgrimage", "Shakti Peetha"], 16.7009, 74.2433),
  site("Kamakshi Amman Temple", "Kanchipuram", "Tamil Nadu", "Hindu", ["Pilgrimage", "Shakti Peetha"], 12.8398, 79.7001),
  site("Biraja Temple", "Jajpur", "Odisha", "Hindu", ["Pilgrimage", "Shakti Peetha"], 20.8495, 86.3376),
  site("Mangalagauri Temple", "Gaya", "Bihar", "Hindu", ["Pilgrimage", "Shakti Peetha"], 24.7780, 84.9912),
  site("Chamundeshwari Temple", "Mysuru", "Karnataka", "Hindu", ["Pilgrimage", "Shakti Peetha"], 12.2721, 76.6730),
  site("Renuka Temple", "Mahur", "Maharashtra", "Hindu", ["Pilgrimage", "Shakti Peetha"], 19.8470, 77.9300),
  site("Alopi Devi Temple", "Prayagraj", "Uttar Pradesh", "Hindu", ["Pilgrimage", "Shakti Peetha"], 25.4325, 81.8557),
  site("Jogulamba Temple", "Alampur", "Telangana", "Hindu", ["Pilgrimage", "Shakti Peetha"], 15.8770, 78.1330),
  site("Vaishno Devi", "Katra", "Jammu and Kashmir", "Hindu", ["Pilgrimage", "Shakti Peetha"], 33.0300, 74.9490, "A major pilgrimage shrine in the Trikuta mountains."),
  site("Sharada Peeth tradition site", "Srinagar", "Jammu and Kashmir", "Hindu", ["Pilgrimage", "Shakti Peetha"], 34.0837, 74.7973),
  site("Bhramaramba Temple", "Srisailam", "Andhra Pradesh", "Hindu", ["Pilgrimage", "Shakti Peetha"], 16.0724, 78.8681),
  site("Kukkuteswara Temple", "Pithapuram", "Andhra Pradesh", "Hindu", ["Pilgrimage", "Shakti Peetha"], 17.1160, 82.2520),
  site("Bhimeswara Temple", "Draksharamam", "Andhra Pradesh", "Hindu", ["Pilgrimage", "Shakti Peetha"], 16.7900, 82.0630),
  site("Kapal Mochan / regional Shakti tradition", "Hooghly", "West Bengal", "Hindu", ["Pilgrimage", "Shakti Peetha"], 22.8750, 88.3900),

  // Major Hindu pilgrimage destinations
  site("Ram Janmabhoomi Temple", "Ayodhya", "Uttar Pradesh", "Hindu", ["Pilgrimage"], 26.7990, 82.2040, "A major Hindu pilgrimage destination associated with the Ram tradition."),
  site("Hanuman Garhi", "Ayodhya", "Uttar Pradesh", "Hindu", ["Pilgrimage"], 26.8000, 82.1990),
  site("Tirumala Venkateswara Temple", "Tirupati", "Andhra Pradesh", "Hindu", ["Pilgrimage"], 13.6833, 79.3470, "One of India's most visited Hindu pilgrimage centres."),
  site("Shirdi Sai Baba Temple", "Shirdi", "Maharashtra", "Hindu", ["Pilgrimage"], 19.7667, 74.4777),
  site("Siddhivinayak Temple", "Mumbai", "Maharashtra", "Hindu", ["Pilgrimage"], 19.0169, 72.8305),
  site("Sabarimala", "Sabarimala", "Kerala", "Hindu", ["Pilgrimage"], 9.4300, 77.0800),
  site("Meenakshi Amman Temple", "Madurai", "Tamil Nadu", "Hindu", ["Pilgrimage"], 9.9195, 78.1193),
  site("Sri Ranganathaswamy Temple", "Srirangam", "Tamil Nadu", "Hindu", ["Pilgrimage"], 10.8620, 78.6910),
  site("Kanchipuram Temples", "Kanchipuram", "Tamil Nadu", "Hindu", ["Pilgrimage"], 12.8342, 79.7036),
  site("Udupi Sri Krishna Temple", "Udupi", "Karnataka", "Hindu", ["Pilgrimage"], 13.3409, 74.7421),
  site("Mookambika Temple", "Kollur", "Karnataka", "Hindu", ["Pilgrimage"], 13.8667, 74.8167),
  site("Murudeshwar Temple", "Murudeshwar", "Karnataka", "Hindu", ["Pilgrimage"], 14.0940, 74.4845),
  site("Padmanabhaswamy Temple", "Thiruvananthapuram", "Kerala", "Hindu", ["Pilgrimage"], 8.4824, 76.9434),
  site("Guruvayur Temple", "Guruvayur", "Kerala", "Hindu", ["Pilgrimage"], 10.5946, 76.0410),
  site("Ramanathapuram Rameswaram Ghats", "Rameswaram", "Tamil Nadu", "Hindu", ["Pilgrimage"], 9.2876, 79.3129),
  site("Har Ki Pauri", "Haridwar", "Uttarakhand", "Hindu", ["Pilgrimage"], 29.9457, 78.1642),
  site("Rishikesh Ganga Ghats", "Rishikesh", "Uttarakhand", "Hindu", ["Pilgrimage"], 30.0869, 78.2676),
  site("Triveni Sangam", "Prayagraj", "Uttar Pradesh", "Hindu", ["Pilgrimage"], 25.4300, 81.8800),
  site("Vrindavan Banke Bihari Temple", "Vrindavan", "Uttar Pradesh", "Hindu", ["Pilgrimage"], 27.5830, 77.7000),
  site("Mathura Krishna Janmabhoomi", "Mathura", "Uttar Pradesh", "Hindu", ["Pilgrimage"], 27.5026, 77.6737),
  site("Nathdwara Shrinathji Temple", "Nathdwara", "Rajasthan", "Hindu", ["Pilgrimage"], 24.9340, 73.8233),
  site("Brahma Temple", "Pushkar", "Rajasthan", "Hindu", ["Pilgrimage"], 26.4897, 74.5511),
  site("Ranakpur Jain Temple", "Ranakpur", "Rajasthan", "Jain", ["Pilgrimage", "Jain Circuit"], 25.1200, 73.4700),

  // Buddhist pilgrimage circuit
  site("Mahabodhi Temple", "Bodh Gaya", "Bihar", "Buddhist", ["Pilgrimage", "Buddhist Circuit"], 24.6950, 84.9911, "A major Buddhist pilgrimage site associated with the Buddha's enlightenment."),
  site("Sarnath", "Sarnath", "Uttar Pradesh", "Buddhist", ["Pilgrimage", "Buddhist Circuit"], 25.3811, 83.0213, "The site traditionally associated with the Buddha's first sermon."),
  site("Kushinagar Mahaparinirvana Temple", "Kushinagar", "Uttar Pradesh", "Buddhist", ["Pilgrimage", "Buddhist Circuit"], 26.7397, 83.8889),
  site("Rajgir Vulture Peak", "Rajgir", "Bihar", "Buddhist", ["Pilgrimage", "Buddhist Circuit"], 25.0245, 85.4140),
  site("Nalanda Mahavihara", "Nalanda", "Bihar", "Buddhist", ["Pilgrimage", "Buddhist Circuit"], 25.1367, 85.4438),
  site("Vaishali Buddhist Sites", "Vaishali", "Bihar", "Buddhist", ["Pilgrimage", "Buddhist Circuit"], 25.9860, 85.1300),
  site("Shravasti", "Shravasti", "Uttar Pradesh", "Buddhist", ["Pilgrimage", "Buddhist Circuit"], 27.5100, 82.0500),
  site("Sankassa", "Sankisa", "Uttar Pradesh", "Buddhist", ["Pilgrimage", "Buddhist Circuit"], 27.7000, 79.2700),
  site("Tawang Monastery", "Tawang", "Arunachal Pradesh", "Buddhist", ["Pilgrimage", "Buddhist Circuit"], 27.5860, 91.8650),
  site("Namgyal Monastery", "Dharamshala", "Himachal Pradesh", "Buddhist", ["Pilgrimage", "Buddhist Circuit"], 32.2396, 76.3230),

  // Jain pilgrimage
  site("Shikharji Parasnath", "Madhuban", "Jharkhand", "Jain", ["Pilgrimage", "Jain Circuit"], 23.9620, 86.1510, "One of Jainism's most important pilgrimage mountains."),
  site("Palitana Shatrunjaya", "Palitana", "Gujarat", "Jain", ["Pilgrimage", "Jain Circuit"], 21.5250, 71.8300),
  site("Girnar Jain Temples", "Junagadh", "Gujarat", "Jain", ["Pilgrimage", "Jain Circuit"], 21.5200, 70.5730),
  site("Dilwara Temples", "Mount Abu", "Rajasthan", "Jain", ["Pilgrimage", "Jain Circuit"], 24.5926, 72.7156),
  site("Shravanabelagola", "Shravanabelagola", "Karnataka", "Jain", ["Pilgrimage", "Jain Circuit"], 12.8570, 76.4880),
  site("Pawapuri Jal Mandir", "Pawapuri", "Bihar", "Jain", ["Pilgrimage", "Jain Circuit"], 25.0870, 85.8380),
  site("Kundalpur Jain Temples", "Kundalpur", "Madhya Pradesh", "Jain", ["Pilgrimage", "Jain Circuit"], 23.9950, 79.5930),
  site("Khandagiri Jain Caves", "Bhubaneswar", "Odisha", "Jain", ["Pilgrimage", "Jain Circuit"], 20.2570, 85.7750),

  // Sikh pilgrimage
  site("Golden Temple", "Amritsar", "Punjab", "Sikh", ["Pilgrimage", "Sikh Circuit"], 31.6200, 74.8765, "The Harmandir Sahib, one of Sikhism's most important gurdwaras."),
  site("Akal Takht Sahib", "Amritsar", "Punjab", "Sikh", ["Pilgrimage", "Sikh Circuit"], 31.6204, 74.8769),
  site("Takht Sri Patna Sahib", "Patna", "Bihar", "Sikh", ["Pilgrimage", "Sikh Circuit"], 25.5941, 85.1376),
  site("Takht Sri Hazur Sahib", "Nanded", "Maharashtra", "Sikh", ["Pilgrimage", "Sikh Circuit"], 19.1550, 77.3225),
  site("Takht Sri Kesgarh Sahib", "Anandpur Sahib", "Punjab", "Sikh", ["Pilgrimage", "Sikh Circuit"], 31.2397, 76.5020),
  site("Takht Sri Damdama Sahib", "Talwandi Sabo", "Punjab", "Sikh", ["Pilgrimage", "Sikh Circuit"], 29.9890, 75.0940),
  site("Hemkund Sahib", "Chamoli", "Uttarakhand", "Sikh", ["Pilgrimage", "Sikh Circuit"], 30.7280, 79.6050),
  site("Anandpur Sahib", "Anandpur Sahib", "Punjab", "Sikh", ["Pilgrimage", "Sikh Circuit"], 31.2350, 76.4950),

  // Muslim / Sufi pilgrimage
  site("Ajmer Sharif Dargah", "Ajmer", "Rajasthan", "Muslim", ["Pilgrimage", "Sufi Shrines"], 26.4550, 74.6280),
  site("Nizamuddin Dargah", "New Delhi", "Delhi", "Muslim", ["Pilgrimage", "Sufi Shrines"], 28.5913, 77.2433),
  site("Haji Ali Dargah", "Mumbai", "Maharashtra", "Muslim", ["Pilgrimage", "Sufi Shrines"], 18.9827, 72.8080),
  site("Nagore Dargah", "Nagore", "Tamil Nadu", "Muslim", ["Pilgrimage", "Sufi Shrines"], 10.8170, 79.8420),
  site("Sheikh Salim Chishti Dargah", "Fatehpur Sikri", "Uttar Pradesh", "Muslim", ["Pilgrimage", "Sufi Shrines"], 27.0945, 77.6679),
  site("Baba Budan Dargah", "Chikmagalur", "Karnataka", "Muslim", ["Pilgrimage", "Sufi Shrines"], 13.3160, 75.7720),
  site("Khwaja Banda Nawaz Dargah", "Kalaburagi", "Karnataka", "Muslim", ["Pilgrimage", "Sufi Shrines"], 17.3297, 76.8343),
  site("Kichhauchha Sharif", "Ambedkar Nagar", "Uttar Pradesh", "Muslim", ["Pilgrimage", "Sufi Shrines"], 26.4400, 82.7200),

  // Christian pilgrimage and heritage
  site("Basilica of Bom Jesus", "Old Goa", "Goa", "Christian", ["Pilgrimage", "Christian Heritage"], 15.5009, 73.9118),
  site("Se Cathedral", "Old Goa", "Goa", "Christian", ["Pilgrimage", "Christian Heritage"], 15.5038, 73.9120),
  site("Basilica of Our Lady of Good Health", "Velankanni", "Tamil Nadu", "Christian", ["Pilgrimage", "Christian Heritage"], 10.6830, 79.8449),
  site("San Thome Basilica", "Chennai", "Tamil Nadu", "Christian", ["Pilgrimage", "Christian Heritage"], 13.0335, 80.2794),
  site("Basilica of Our Lady of the Mount", "Bandra, Mumbai", "Maharashtra", "Christian", ["Pilgrimage", "Christian Heritage"], 19.0460, 72.8200),
  site("St. Thomas Mount", "Chennai", "Tamil Nadu", "Christian", ["Pilgrimage", "Christian Heritage"], 13.0068, 80.2046),
  site("Shrine Basilica of Our Lady of Graces", "Sardhana", "Uttar Pradesh", "Christian", ["Pilgrimage", "Christian Heritage"], 29.1480, 77.6130),
];

export const sacredReligions = ["All", "Hindu", "Buddhist", "Jain", "Sikh", "Muslim", "Christian"];
export const sacredCircuits = ["All", "Pilgrimage", "Chota Char Dham", "Bada Char Dham", "Jyotirlinga", "Shakti Peetha", "Buddhist Circuit", "Jain Circuit", "Sikh Circuit", "Sufi Shrines", "Christian Heritage"];
