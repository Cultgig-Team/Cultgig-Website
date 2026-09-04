import { createContext, useContext, useEffect, useState } from "react";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { LeadCaptureModal } from "../components/early-access/LeadCaptureModal";
import { AboutPage, ContactPage, FAQPage, HomePage, HowItWorksPage, AudiencePage, LegalPage, NotFoundPage } from "../routes/Pages";
type LeadRole = "artist" | "business";

type Navigate = (to: string) => void;
const NavContext = createContext<Navigate>(() => {});

export function Link({ to, children, ...props }: { to: string; children: React.ReactNode } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const nav = useContext(NavContext);
  return <a href={to} {...props} onClick={(event) => { props.onClick?.(event); if (!event.defaultPrevented && to.startsWith("/")) { event.preventDefault(); nav(to); } }}>{children}</a>;
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [lead, setLead] = useState<{ open: boolean; role?: LeadRole }>({ open: false });
  useEffect(() => { const onPopState = () => setPath(window.location.pathname); window.addEventListener("popstate", onPopState); return () => window.removeEventListener("popstate", onPopState); }, []);
  const navigate = (to: string) => { const url = new URL(to, window.location.origin); history.pushState({}, "", to); setPath(url.pathname); window.scrollTo(0, 0); if (url.hash) requestAnimationFrame(() => document.querySelector(url.hash)?.scrollIntoView({ behavior: "smooth" })); };
  const openLead = (role?: LeadRole) => setLead({ open: true, role });

  let page: React.ReactNode;
  switch (path) {
    case "/": page = <HomePage openLead={openLead} />; break;
    case "/how-it-works": page = <HowItWorksPage openLead={openLead} />; break;
    case "/for-artists": page = <AudiencePage kind="artist" openLead={openLead} />; break;
    case "/for-businesses": page = <AudiencePage kind="business" openLead={openLead} />; break;
    case "/about": page = <AboutPage openLead={openLead} />; break;
    case "/faq": page = <FAQPage />; break;
    case "/contact": page = <ContactPage openLead={openLead} />; break;
    case "/privacy": page = <LegalPage kind="Privacy Policy" />; break;
    case "/terms": page = <LegalPage kind="Terms" />; break;
    default: page = <NotFoundPage openLead={openLead} />;
  }
  return <NavContext.Provider value={navigate}><Header currentPath={path} openLead={openLead} /><div>{page}</div><Footer openLead={openLead} /><LeadCaptureModal open={lead.open} role={lead.role} onClose={() => setLead({ open: false })} /></NavContext.Provider>;
}
