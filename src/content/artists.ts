import creatorRhea from "../assets/images/creator-rhea.jpg";
import creatorArjun from "../assets/images/creator-arjun.jpg";
import creatorNaina from "../assets/images/creator-naina.jpg";
import creatorKabir from "../assets/images/creator-kabir.jpg";
import creatorMeera from "../assets/images/creator-meera.jpg";
import categoryMusicians from "../assets/images/category-musicians.jpg";

export interface ArtistProfile {
  id: string;
  name: string;
  category: "Musicians" | "Photographers" | "Decorators" | "Dancers" | "DJs" | "Singers";
  specialty: string;
  city: string;
  startingPrice: number;
  rating: number;
  reviewCount: number;
  phoneVerified: boolean;
  available: boolean;
  experienceYears: number;
  image: string;
  bio: string;
  skills: string[];
  eventTypes: string[];
}

export const representativeArtists: ArtistProfile[] = [
  {
    id: "rhea-sengupta",
    name: "Rhea Sengupta",
    category: "Singers",
    specialty: "Live Vocalist & Acoustic Guitarist",
    city: "Mumbai",
    startingPrice: 15000,
    rating: 4.9,
    reviewCount: 28,
    phoneVerified: true,
    available: true,
    experienceYears: 5,
    image: creatorRhea,
    bio: "Versatile indie-pop and semi-classical vocalist delivering soulful acoustic sets for sundowners, intimate weddings, and cafe evenings.",
    skills: ["Acoustic Guitar", "Live Vocals", "Indie Pop", "Bollywood Unplugged"],
    eventTypes: ["Weddings", "Cafes", "Corporate Events", "Private Parties"],
  },
  {
    id: "arjun-mehta",
    name: "Arjun Mehta",
    category: "Photographers",
    specialty: "Candid & Commercial Event Photographer",
    city: "Bengaluru",
    startingPrice: 22000,
    rating: 4.8,
    reviewCount: 34,
    phoneVerified: true,
    available: true,
    experienceYears: 7,
    image: creatorArjun,
    bio: "Editorial visual storyteller specializing in dynamic stage lighting, candid crowd interactions, and vibrant corporate launch coverage.",
    skills: ["Candid Photography", "Low-Light Live Stage", "Drone Cinematography", "Photo Retouching"],
    eventTypes: ["Concerts", "Brand Launches", "Corporate Summits", "Festivals"],
  },
  {
    id: "naina-kapoor",
    name: "Naina Kapoor",
    category: "Decorators",
    specialty: "Boutique Stage & Floral Decorator",
    city: "Delhi NCR",
    startingPrice: 35000,
    rating: 5.0,
    reviewCount: 19,
    phoneVerified: true,
    available: true,
    experienceYears: 6,
    image: creatorNaina,
    bio: "Sustainable, minimalist event scenographer crafting aesthetic floral installations, warm ambient lighting, and bespoke photo-zones.",
    skills: ["Stage Design", "Floral Sculptures", "Ambient Lighting", "Theme Styling"],
    eventTypes: ["Weddings", "Art Exhibitions", "Brand Pop-ups", "Gala Dinners"],
  },
  {
    id: "kabir-verma",
    name: "Kabir Verma",
    category: "Dancers",
    specialty: "Contemporary & Fusion Choreographer",
    city: "Pune",
    startingPrice: 18000,
    rating: 4.9,
    reviewCount: 22,
    phoneVerified: true,
    available: true,
    experienceYears: 4,
    image: creatorKabir,
    bio: "Energetic choreographer and stage performer blending contemporary movement with traditional Indian folk styles for high-impact celebrations.",
    skills: ["Contemporary", "Folk Fusion", "Sangeet Direction", "Flashmobs"],
    eventTypes: ["Stage Shows", "Sangeet & Weddings", "Festivals", "Corporate Galas"],
  },
  {
    id: "meera-nair",
    name: "Meera Nair",
    category: "Musicians",
    specialty: "Violinist & Instrumental Arranger",
    city: "Goa",
    startingPrice: 14000,
    rating: 4.8,
    reviewCount: 15,
    phoneVerified: true,
    available: true,
    experienceYears: 8,
    image: creatorMeera,
    bio: "Classical and crossover electric violinist bringing breathtaking ambient soundscapes to luxury resort events, cocktail hours, and gallery openings.",
    skills: ["Electric Violin", "Classical Arrangement", "Ambient Sets", "Cocktail Sets"],
    eventTypes: ["Resort Sundowners", "Cocktails", "Art Shows", "Private Soirees"],
  },
  {
    id: "dev-kapur",
    name: "Dev Kapur",
    category: "DJs",
    specialty: "Open-Format & Deep House DJ",
    city: "Mumbai",
    startingPrice: 20000,
    rating: 4.9,
    reviewCount: 41,
    phoneVerified: true,
    available: true,
    experienceYears: 6,
    image: categoryMusicians,
    bio: "Crowd-reading resident DJ known for seamless transitions across Nu-Disco, Deep House, and Afrobeat rhythms that keep the dance floor moving.",
    skills: ["Beatmatching", "Live Remixing", "Sound Engineering", "Lighting Sync"],
    eventTypes: ["Club Nights", "Afterparties", "College Festivals", "Corporate Mixers"],
  },
];

export const artistCategories = [
  "All",
  "Singers",
  "Musicians",
  "Photographers",
  "Decorators",
  "Dancers",
  "DJs",
] as const;

export const artistCities = [
  "All Cities",
  "Mumbai",
  "Bengaluru",
  "Delhi NCR",
  "Pune",
  "Goa",
] as const;
