function safeHttpsUrl(value: string | undefined) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
}

function safeEmail(value: string | undefined) {
  return value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : "";
}

export const siteConfig = {
  name: "Cultgig",
  tagline: "Where Artists & Gigs Get Discovered.",
  supportEmail: safeEmail(import.meta.env.VITE_SUPPORT_EMAIL),
  legalEntityName: import.meta.env.VITE_LEGAL_ENTITY_NAME || "Cultgig",
  registeredAddress: import.meta.env.VITE_REGISTERED_ADDRESS || "",
  socialLinks: {
    instagram: safeHttpsUrl(import.meta.env.VITE_INSTAGRAM_URL),
    linkedin: safeHttpsUrl(import.meta.env.VITE_LINKEDIN_URL),
    youtube: safeHttpsUrl(import.meta.env.VITE_YOUTUBE_URL),
  },
} as const;

export const pageDescriptions: Record<string, string> = {
  "Where Artists & Gigs Get Discovered":
    "Create a thoughtful Cultgig profile and help shape a better way for artists and businesses to meet.",
  "A better place for creative work.":
    "Learn why Cultgig is building a more thoughtful starting point for creative work in India.",
  "A clearer start for every collaboration.":
    "See how Cultgig onboarding gives artists and businesses a clearer foundation for future creative connections.",
  "Your work is your proof.":
    "Create an artist profile for your craft, story, location, portfolio, and creative identity.",
  "Find the right creative fit.":
    "Tell Cultgig what your business needs and help shape better creative introductions.",
  "Frequently Asked Questions":
    "Straight answers about Cultgig profiles, onboarding, supported creative categories, and the marketplace roadmap.",
  "Let’s talk.":
    "Contact Cultgig about artist support, general questions, or partnership conversations.",
  "Privacy Policy":
    "Read how Cultgig handles information submitted during profile onboarding.",
  Terms:
    "Read the terms that govern use of Cultgig profile onboarding and this website.",
  "Page Not Found": "The Cultgig page you requested could not be found.",
};
