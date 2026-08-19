export const siteConfig = {
  name: "Cultgig",
  tagline: "Where Artists & Gigs Get Discovered.",
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || "",
  legalEntityName: import.meta.env.VITE_LEGAL_ENTITY_NAME || "Cultgig",
  registeredAddress: import.meta.env.VITE_REGISTERED_ADDRESS || "",
  socialLinks: {
    instagram: import.meta.env.VITE_INSTAGRAM_URL || "",
    linkedin: import.meta.env.VITE_LINKEDIN_URL || "",
    youtube: import.meta.env.VITE_YOUTUBE_URL || "",
  },
} as const;
