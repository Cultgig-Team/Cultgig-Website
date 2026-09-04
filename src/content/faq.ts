export interface FAQItemData {
  category: "General" | "For Artists" | "For Businesses" | "Trust & Bookings";
  question: string;
  answer: string;
}

export const detailedFaqList: FAQItemData[] = [
  {
    category: "General",
    question: "What is Cultgig?",
    answer:
      "Cultgig is a two-sided creative marketplace connecting independent artists (musicians, DJs, photographers, videographers, decorators, dancers, makeup artists) with businesses, venues, event planners, and private hosts looking to hire exceptional talent.",
  },
  {
    category: "General",
    question: "Is Cultgig free to use?",
    answer:
      "Yes! Creating an artist profile and browsing or requesting bookings as a business or host is currently completely free with zero hidden commissions.",
  },
  {
    category: "For Businesses",
    question: "How do businesses and event hosts find artists?",
    answer:
      "You have two flexible paths: 1) 'Find an Artist' allows you to search and filter verified artist profiles by category, city, and starting rates and send direct booking requests. 2) 'Post a Requirement' allows you to submit a custom event brief and receive matching proposals directly.",
  },
  {
    category: "For Businesses",
    question: "How does the 'Request to Book' flow work?",
    answer:
      "When you click 'Request to Book' on an artist profile, you specify your event type, date, location, estimated hours, and budget. The inquiry is sent directly to the artist, who will review your schedule and connect with you to finalize details.",
  },
  {
    category: "For Artists",
    question: "How do I create an artist profile?",
    answer:
      "Click 'Join as an Artist', enter your email to receive a quick verification OTP, and complete the guided onboarding. You'll add your discipline, city, starting rates, portfolio links, and skills in under two minutes.",
  },
  {
    category: "For Artists",
    question: "How do artists receive booking requests and gig opportunities?",
    answer:
      "When clients in your city submit direct booking inquiries or post gig requirements matching your category and budget, you receive notifications and direct contact details to confirm the gig.",
  },
  {
    category: "Trust & Bookings",
    question: "What does 'Phone Verified' mean on an artist profile?",
    answer:
      "The 'Phone Verified' badge indicates that the artist has completed secure OTP authentication and validated their active contact number with Cultgig, giving event hosts confidence in reliable communication.",
  },
  {
    category: "Trust & Bookings",
    question: "How are reviews and ratings handled on Cultgig?",
    answer:
      "Reviews are submitted by verified event clients and hosts following completed performances and engagements. We do not manufacture platform metrics or allow unverified reviews.",
  },
  {
    category: "General",
    question: "Can I switch between Artist and Business modes?",
    answer:
      "Absolutely. Many creators also host workshops, book fellow artists for gigs, or manage creative events. You can participate in both roles with your registered email.",
  },
  {
    category: "Trust & Bookings",
    question: "How is my personal and business information handled?",
    answer:
      "Your personal information is securely handled in compliance with our Privacy Policy. Contact information is only shared between clients and artists upon confirmed booking inquiries.",
  },
];

// Flat list for quick previews
export const faqItems = detailedFaqList.map((item) => [
  item.question,
  item.answer,
]) as [string, string][];
