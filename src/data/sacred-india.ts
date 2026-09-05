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

export const sacredIndia: SacredSite[] = [
  { name: "Kashi Vishwanath Temple", city: "Varanasi", state: "Uttar Pradesh", religion: "Hindu", circuits: ["Pilgrimage", "Jyotirlinga"], description: "A major Shaiva pilgrimage destination on the Ganges.", latitude: 25.3109, longitude: 83.0107 },
  { name: "Mahabodhi Temple", city: "Bodh Gaya", state: "Bihar", religion: "Buddhist", circuits: ["Pilgrimage", "Buddhist Circuit"], description: "A major Buddhist pilgrimage site associated with the Buddha's enlightenment.", latitude: 24.6950, longitude: 84.9911 },
  { name: "Golden Temple", city: "Amritsar", state: "Punjab", religion: "Sikh", circuits: ["Pilgrimage", "Sikh Circuit"], description: "The Harmandir Sahib, one of Sikhism's most important gurdwaras.", latitude: 31.6200, longitude: 74.8765 },
  { name: "Dilwara Temples", city: "Mount Abu", state: "Rajasthan", religion: "Jain", circuits: ["Pilgrimage", "Jain Circuit"], description: "A celebrated group of Jain temples known for detailed marble carving.", latitude: 24.5926, longitude: 72.7156 },
  { name: "Brihadisvara Temple", city: "Thanjavur", state: "Tamil Nadu", religion: "Hindu", circuits: ["Pilgrimage"], description: "A monumental Chola-era temple and living place of worship.", latitude: 10.7828, longitude: 79.1318 },
  { name: "Vaishno Devi", city: "Katra", state: "Jammu and Kashmir", religion: "Hindu", circuits: ["Pilgrimage"], description: "A major pilgrimage destination in the Trikuta mountains.", latitude: 33.0300, longitude: 74.9490 },
];
