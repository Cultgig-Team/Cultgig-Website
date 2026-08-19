export interface ImageAsset {
  src: string;
  alt: string;
  category?: string;
  credit?: string;
}

export const heroImage: ImageAsset = {
  src: "/images/hero-performance.jpg",
  alt: "Vibrant live performance artist engaging audience with music and lighting",
};

export const floatingCreatorThumb: ImageAsset = {
  src: "/images/creator-rhea.jpg",
  alt: "Independent live vocalist and songwriter",
};

export const categoryImages: Record<string, ImageAsset> = {
  musicians: {
    src: "/images/category-musicians.jpg",
    alt: "Musician performing live on acoustic guitar and microphone",
    category: "Musicians & DJs",
  },
  photographers: {
    src: "/images/category-photographers.jpg",
    alt: "Event photographer capturing candid cultural moments",
    category: "Photographers & Videographers",
  },
  decorators: {
    src: "/images/category-decorators.jpg",
    alt: "Creative event designer styling warm ambient lighting and florals",
    category: "Decorators & Event Managers",
  },
  beautyDance: {
    src: "/images/category-beauty-dance.jpg",
    alt: "Makeup artist and classical performer preparing backstage",
    category: "Makeup, Beauty & Dance",
  },
};

export const showcaseCreators = [
  {
    name: "Rhea Sengupta",
    role: "Live Vocalist & Acoustic Artist",
    city: "Mumbai",
    category: "Musician",
    image:
      "/images/creator-rhea.jpg",
    tags: ["Acoustic", "Indie Pop", "Weddings & Cafés"],
  },
  {
    name: "Arjun Mehta",
    role: "Editorial & Event Photographer",
    city: "Bengaluru",
    category: "Photographer",
    image:
      "/images/creator-arjun.jpg",
    tags: ["Candid", "Concerts", "Brand Events"],
  },
  {
    name: "Naina Kapoor",
    role: "Boutique Event & Stage Stylist",
    city: "Delhi NCR",
    category: "Decorator",
    image:
      "/images/creator-naina.jpg",
    tags: ["Minimalist Decor", "Corporate Galas", "Pop-ups"],
  },
  {
    name: "Kabir Verma",
    role: "Contemporary & Folk Choreographer",
    city: "Pune",
    category: "Dancer",
    image:
      "/images/creator-kabir.jpg",
    tags: ["Stage Shows", "Workshops", "Sangeet"],
  },
];

export const avatarCluster = [
  "/images/creator-rhea.jpg",
  "/images/creator-arjun.jpg",
  "/images/creator-naina.jpg",
  "/images/creator-kabir.jpg",
  "/images/creator-meera.jpg",
];

export const pageImages = {
  aboutHero: {
    src: "/images/page-about.jpg",
    alt: "Creative community gathered at an event",
  },
  aboutStory: {
    src: "/images/page-story.jpg",
    alt: "Musician creating music with a guitar",
  },
  forArtistsHero: {
    src: "/images/page-artists.jpg",
    alt: "Performer sharing their work on stage",
  },
  forBusinessesHero: {
    src: "/images/page-businesses.jpg",
    alt: "Business event prepared for a creative gathering",
  },
  howItWorksHero: {
    src: "/images/page-how-it-works.jpg",
    alt: "Live event with lights and performers",
  },
};
