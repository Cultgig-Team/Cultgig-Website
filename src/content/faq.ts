export interface FAQItemData { category: "General" | "For Artists" | "For Businesses"; question: string; answer: string; }
export const detailedFaqList: FAQItemData[] = [
  { category: "General", question: "What is Cultgig?", answer: "Cultgig is building a trusted ecosystem where artists and businesses can discover each other and build meaningful professional relationships." },
  { category: "General", question: "Who is Cultgig for?", answer: "For artists, creative professionals, venues, brands, event teams, and businesses looking for better creative connections." },
  { category: "For Artists", question: "How can artists join?", answer: "Join the early-access list through the website. We will share launch updates as the mobile app gets closer." },
  { category: "For Businesses", question: "How can businesses join?", answer: "Choose Get Early Access and share a few details so we can keep you informed." },
  { category: "General", question: "Can I book an artist through the website?", answer: "No. The website is currently a marketing and early-access platform. The Cultgig mobile app will provide the future product experience." },
  { category: "For Businesses", question: "Can I post a requirement through the website?", answer: "No. The website does not currently support job or event posting. Businesses can join the early-access list to be notified when the Cultgig app launches." },
  { category: "General", question: "When is the app launching?", answer: "The app is coming soon on iOS and Android. Join the list for launch updates." },
];
export const faqItems = detailedFaqList.map((item) => [item.question, item.answer]) as [string, string][];
