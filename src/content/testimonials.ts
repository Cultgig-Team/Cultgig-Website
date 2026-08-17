export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  category: string;
  city: string;
  photoUrl?: string;
  isRepresentative?: boolean;
}

// Honesty constraint: No fabricated testimonials.
// When real community voices become available, add them here.
export const testimonialItems: TestimonialItem[] = [];
