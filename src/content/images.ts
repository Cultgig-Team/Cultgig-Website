import heroPerformance from "../assets/images/hero-performance.jpg";
import creatorRhea from "../assets/images/creator-rhea.jpg";
import categoryMusicians from "../assets/images/category-musicians.jpg";
import categoryPhotographers from "../assets/images/category-photographers.jpg";
import categoryDecorators from "../assets/images/category-decorators.jpg";
import categoryBeautyDance from "../assets/images/category-beauty-dance.jpg";
import creatorArjun from "../assets/images/creator-arjun.jpg";
import creatorNaina from "../assets/images/creator-naina.jpg";
import creatorKabir from "../assets/images/creator-kabir.jpg";
import creatorMeera from "../assets/images/creator-meera.jpg";
import pageAbout from "../assets/images/page-about.jpg";
import pageStory from "../assets/images/page-story.jpg";
import pageArtists from "../assets/images/page-artists.jpg";
import pageBusinesses from "../assets/images/page-businesses.jpg";
import pageHowItWorks from "../assets/images/page-how-it-works.jpg";

export interface ImageAsset {
  src: string;
  alt: string;
  category?: string;
  credit?: string;
}

export const heroImage: ImageAsset = {
  src: heroPerformance,
  alt: "Vibrant live performance artist engaging audience with music and lighting",
};

export const floatingCreatorThumb: ImageAsset = {
  src: creatorRhea,
  alt: "Independent live vocalist and songwriter",
};

export const categoryImages: Record<string, ImageAsset> = {
  musicians: {
    src: categoryMusicians,
    alt: "Musician performing live on acoustic guitar and microphone",
    category: "Musicians & DJs",
  },
  photographers: {
    src: categoryPhotographers,
    alt: "Event photographer capturing candid cultural moments",
    category: "Photographers & Videographers",
  },
  decorators: {
    src: categoryDecorators,
    alt: "Creative event designer styling warm ambient lighting and florals",
    category: "Decorators & Event Managers",
  },
  beautyDance: {
    src: categoryBeautyDance,
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
    image: creatorRhea,
    tags: ["Acoustic", "Indie Pop", "Weddings & Cafés"],
  },
  {
    name: "Arjun Mehta",
    role: "Editorial & Event Photographer",
    city: "Bengaluru",
    category: "Photographer",
    image: creatorArjun,
    tags: ["Candid", "Concerts", "Brand Events"],
  },
  {
    name: "Naina Kapoor",
    role: "Boutique Event & Stage Stylist",
    city: "Delhi NCR",
    category: "Decorator",
    image: creatorNaina,
    tags: ["Minimalist Decor", "Corporate Galas", "Pop-ups"],
  },
  {
    name: "Kabir Verma",
    role: "Contemporary & Folk Choreographer",
    city: "Pune",
    category: "Dancer",
    image: creatorKabir,
    tags: ["Stage Shows", "Workshops", "Sangeet"],
  },
];

export const avatarCluster = [
  creatorRhea,
  creatorArjun,
  creatorNaina,
  creatorKabir,
  creatorMeera,
];

export const pageImages = {
  aboutHero: {
    src: pageAbout,
    alt: "Creative community gathered at an event",
  },
  aboutStory: {
    src: pageStory,
    alt: "Musician creating music with a guitar",
  },
  forArtistsHero: {
    src: pageArtists,
    alt: "Performer sharing their work on stage",
  },
  forBusinessesHero: {
    src: pageBusinesses,
    alt: "Business event prepared for a creative gathering",
  },
  howItWorksHero: {
    src: pageHowItWorks,
    alt: "Live event with lights and performers",
  },
};
