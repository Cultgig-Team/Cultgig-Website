export type Role = "artist" | "client";
export type ArtistSubmission = {
  role: "artist";
  email: string;
  fullName: string;
  photoUrl?: string;
  city: string;
  willingToTravel: boolean;
  bio?: string;
  category: string;
  portfolioUrls?: string[];
  instagram?: string;
  youtube?: string;
  website?: string;
  hourlyBudgetMin: number;
  hourlyBudgetMax: number;
  experienceLevel?: string;
  gigInterests?: string[];
  createdAt: string;
};
export type ClientSubmission = {
  role: "client";
  email: string;
  fullName: string;
  city: string;
  bio?: string;
  category: string;
  portfolioUrls?: string[];
  instagram?: string;
  youtube?: string;
  website?: string;
  businessEmail?: string;
  businessPhone?: string;
  businessAddress?: string;
  createdAt: string;
};
export type OnboardingSubmission = ArtistSubmission | ClientSubmission;
export type OnboardingData = {
  email: string;
  role: Role | null;
  fullName: string;
  city: string;
  photo: File | null;
  bio: string;
  category: string | null;
  willingToTravel: boolean | null;
  portfolio: File[];
  instagram: string;
  youtube: string;
  website: string;
  budget: [number, number];
  budgetConfirmed: boolean;
  experience: string | null;
  interests: string[];
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
};
export type OnboardingStep =
  | "email"
  | "otp"
  | "role"
  | "bio"
  | "business"
  | "location"
  | "about"
  | "category"
  | "work"
  | "social"
  | "budget"
  | "experience"
  | "interests"
  | "done";
