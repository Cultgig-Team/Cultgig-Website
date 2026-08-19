export const aboutContent = {
  vision: {
    eyebrow: "OUR VISION",
    heading: "Make creative work easier to discover, understand, and support.",
    paragraphs: [
      "Cultgig is building a more thoughtful starting point for independent artists and the businesses looking for creative talent.",
      "We believe a useful introduction should hold more than a name and a message. It should make room for craft, context, location, portfolio proof, and the human story behind the work.",
    ],
  },
  team: {
    eyebrow: "THE PEOPLE BEHIND CULTGIG",
    heading: "A small team building with the creative community.",
    empty: "Team profiles will be added here as official names, roles, images, and social links are approved.",
    members: [] as TeamMember[],
  },
} as const;

export type TeamMember = {
  name: string;
  designation: string;
  bio: string;
  image: string;
  socials: { label: string; href: string }[];
};