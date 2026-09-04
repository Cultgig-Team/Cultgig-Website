import { createContext, useContext, useEffect, useState } from "react";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { OnboardingModal } from "../components/onboarding/OnboardingModal";
import { BookingModal } from "../components/marketplace/BookingModal";
import { PostRequirementModal } from "../components/marketplace/PostRequirementModal";
import { OnboardingProvider } from "../state/onboardingContext";
import { pageImages } from "../content/images";
import { siteConfig } from "../config/site";
import { homeContent } from "../content/home";
import { aboutContent } from "../content/about";
import type { Role } from "../types/onboarding";
import type { ArtistProfile } from "../content/artists";
import {
  ContactPage,
  FAQPage,
  HomePage,
  InfoPage,
  LegalPage,
  NotFoundPage,
} from "../routes/Pages";

type Navigate = (to: string) => void;
const NavContext = createContext<Navigate>(() => {});

export function Link({
  to,
  children,
  ...props
}: {
  to: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const nav = useContext(NavContext);
  return (
    <a
      href={to}
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        if (!e.defaultPrevented && to.startsWith("/")) {
          e.preventDefault();
          nav(to);
        }
      }}
    >
      {children}
    </a>
  );
}

export default function App() {
  const [path, setPath] = useState(location.pathname);
  const [onboarding, setOnboarding] = useState<{ open: boolean; role?: Role }>({
    open: false,
  });
  const [bookingArtist, setBookingArtist] = useState<ArtistProfile | null>(null);
  const [postRequirementOpen, setPostRequirementOpen] = useState(false);

  useEffect(() => {
    const h = () => setPath(location.pathname);
    window.addEventListener("popstate", h);
    return () => window.removeEventListener("popstate", h);
  }, []);

  const navigate = (to: string) => {
    history.pushState({}, "", to);
    setPath(new URL(to, location.origin).pathname);
    window.scrollTo(0, 0);
    const hash = new URL(to, location.origin).hash;
    if (hash) {
      requestAnimationFrame(() =>
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" })
      );
    }
  };

  const openOnboarding = (role?: Role) => setOnboarding({ open: true, role });
  const openPostRequirement = () => setPostRequirementOpen(true);
  const handleRequestBook = (artist: ArtistProfile) => setBookingArtist(artist);

  let page: React.ReactNode;
  switch (path) {
    case "/":
      page = (
        <HomePage
          openOnboarding={openOnboarding}
          openPostRequirement={openPostRequirement}
          onRequestBook={handleRequestBook}
        />
      );
      break;

    case "/about":
      page = (
        <InfoPage
          title="A better place for creative work."
          eyebrow="ABOUT CULTGIG"
          open={openOnboarding}
          openPostRequirement={openPostRequirement}
          image={pageImages.aboutHero}
          about
        >
          Cultgig exists because creative work in India is too often scattered
          across unvetted DMs, frantic WhatsApp groups, and second-hand
          referrals. We are building a professional two-sided marketplace where
          exceptional artists present their craft with pride, and venues,
          companies, and event hosts can discover and book talent with complete
          confidence.
        </InfoPage>
      );
      break;

    case "/how-it-works":
      page = (
        <InfoPage
          title="A clear start for every creative collaboration."
          eyebrow="HOW CULTGIG WORKS"
          open={openOnboarding}
          openPostRequirement={openPostRequirement}
          image={pageImages.howItWorksHero}
          stepGroups={[
            {
              title: "For Businesses & Event Planners",
              steps: homeContent.howItWorks.clientTrack.steps,
            },
            {
              title: "For Independent Artists",
              steps: homeContent.howItWorks.artistTrack.steps,
            },
          ]}
        >
          Whether you need a live acoustic band for a cafe sundowner, an
          editorial photographer for a corporate launch, or a full floral
          scenography team for a wedding, Cultgig provides two streamlined
          paths: direct artist booking and custom requirement matching.
        </InfoPage>
      );
      break;

    case "/for-artists":
      page = (
        <InfoPage
          title="Your work deserves to be discovered."
          eyebrow="FOR INDEPENDENT ARTISTS"
          open={openOnboarding}
          openPostRequirement={openPostRequirement}
          role="artist"
          image={pageImages.forArtistsHero}
          stepGroups={[
            {
              title: "The Artist Journey",
              steps: homeContent.howItWorks.artistTrack.steps,
            },
          ]}
        >
          Build a professional portfolio + booking profile tailored to your
          craft. From live singers and DJs to photographers, cinematographers,
          stage decorators, and dancers, Cultgig puts your verified proof of work
          directly in front of venues, brands, and clients in your city.
        </InfoPage>
      );
      break;

    case "/for-businesses":
      page = (
        <InfoPage
          title="Find the right creative talent with confidence."
          eyebrow="FOR VENUES, BRANDS & ORGANIZERS"
          open={openOnboarding}
          openPostRequirement={openPostRequirement}
          role="client"
          image={pageImages.forBusinessesHero}
          stepGroups={[
            {
              title: "The Client Booking Path",
              steps: homeContent.howItWorks.clientTrack.steps,
            },
          ]}
        >
          Skip endless back-and-forth calls and unreliable DMs. Explore vetted
          artist profiles, compare transparent starting rates, review authentic
          performance media, and send direct booking requests or post custom
          gig requirements with zero client commissions.
        </InfoPage>
      );
      break;

    case "/faq":
      page = <FAQPage />;
      break;

    case "/contact":
      page = <ContactPage openOnboarding={() => openOnboarding()} />;
      break;

    case "/privacy":
      page = <LegalPage kind="Privacy Policy" />;
      break;

    case "/terms":
      page = <LegalPage kind="Terms" />;
      break;

    default:
      page = <NotFoundPage open={openOnboarding} />;
  }

  return (
    <NavContext.Provider value={navigate}>
      <OnboardingProvider>
        <Header
          currentPath={path}
          openOnboarding={openOnboarding}
          openPostRequirement={openPostRequirement}
        />
        {page}
        <Footer />

        {/* Artist / Client Onboarding Modal */}
        <OnboardingModal
          {...onboarding}
          close={() => setOnboarding({ open: false })}
        />

        {/* Direct Booking Modal (Path A) */}
        <BookingModal
          artist={bookingArtist}
          isOpen={!!bookingArtist}
          onClose={() => setBookingArtist(null)}
        />

        {/* Post a Requirement Modal (Path B) */}
        <PostRequirementModal
          isOpen={postRequirementOpen}
          onClose={() => setPostRequirementOpen(false)}
        />
      </OnboardingProvider>
    </NavContext.Provider>
  );
}
