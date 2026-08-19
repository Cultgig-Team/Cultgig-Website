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
