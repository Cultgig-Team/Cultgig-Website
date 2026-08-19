export interface ImageAsset {
  src: string;
  alt: string;
  category?: string;
  credit?: string;
}

export const heroImage: ImageAsset = {
  src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1800&q=85",
  alt: "Vibrant live performance artist engaging audience with music and lighting",
};

export const floatingCreatorThumb: ImageAsset = {
  src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  alt: "Independent live vocalist and songwriter",
};

export const categoryImages: Record<string, ImageAsset> = {
  musicians: {
    src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    alt: "Musician performing live on acoustic guitar and microphone",
    category: "Musicians & DJs",
  },
  photographers: {
    src: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=800&q=80",
    alt: "Event photographer capturing candid cultural moments",
    category: "Photographers & Videographers",
  },
  decorators: {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    alt: "Creative event designer styling warm ambient lighting and florals",
    category: "Decorators & Event Managers",
  },
  beautyDance: {
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    tags: ["Acoustic", "Indie Pop", "Weddings & Cafés"],
  },
  {
    name: "Arjun Mehta",
    role: "Editorial & Event Photographer",
    city: "Bengaluru",
    category: "Photographer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    tags: ["Candid", "Concerts", "Brand Events"],
  },
  {
    name: "Naina Kapoor",
    role: "Boutique Event & Stage Stylist",
    city: "Delhi NCR",
    category: "Decorator",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    tags: ["Minimalist Decor", "Corporate Galas", "Pop-ups"],
  },
  {
    name: "Kabir Verma",
    role: "Contemporary & Folk Choreographer",
    city: "Pune",
    category: "Dancer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    tags: ["Stage Shows", "Workshops", "Sangeet"],
  },
];

export const avatarCluster = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
];

export const pageImages = {
  aboutHero: {
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    alt: "Creative community gathered at an event",
  },
  aboutStory: {
    src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80",
    alt: "Musician creating music with a guitar",
  },
  forArtistsHero: {
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    alt: "Performer sharing their work on stage",
  },
  forBusinessesHero: {
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    alt: "Business event prepared for a creative gathering",
  },
  howItWorksHero: {
    src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    alt: "Live event with lights and performers",
  },
};
