import { createContext, useContext, useEffect, useState } from "react";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { OnboardingModal } from "../components/onboarding/OnboardingModal";
import { OnboardingProvider } from "../state/onboardingContext";
import { pageImages } from "../content/images";
import { siteConfig } from "../config/site";
import { homeContent } from "../content/home";
import { aboutContent } from "../content/about";
import type { Role } from "../types/onboarding";
import {
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
  const [path, setPath] = useState(location.pathname),
    [onboarding, setOnboarding] = useState<{ open: boolean; role?: Role }>({
      open: false,
    });
  useEffect(() => {
    const h = () => setPath(location.pathname);
    addEventListener("popstate", h);
    return () => removeEventListener("popstate", h);
  }, []);
  const navigate = (to: string) => {
    history.pushState({}, "", to);
    setPath(new URL(to, location.origin).pathname);
    scrollTo(0, 0);
    const hash = new URL(to, location.origin).hash;
    if (hash)
      requestAnimationFrame(() =>
        document.querySelector(hash)?.scrollIntoView(),
      );
  };
  const open = (role?: Role) => setOnboarding({ open: true, role });
  let page: React.ReactNode;
  switch (path) {
    case "/":
      page = <HomePage open={open} />;
      break;
    case "/about":
      page = (
        <InfoPage
          title="A better place for creative work."
          eyebrow="ABOUT CULTGIG"
          open={open}
          image={pageImages.aboutHero}
          about
        >
          Cultgig exists because creative work is too often discovered through a
          scattered web of DMs and referrals. We are building a more thoughtful
          way for artists and businesses to introduce themselves.
        </InfoPage>
      );
      break;
    case "/how-it-works":
      page = (
        <InfoPage
          title="A clearer start for every collaboration."
          eyebrow="HOW IT WORKS"
          open={open}
          image={pageImages.howItWorksHero}
          stepGroups={[
            { title: "For artists", steps: homeContent.howItWorks.artistTrack.steps },
            { title: "For businesses", steps: homeContent.howItWorks.clientTrack.steps },
          ]}
        >
          Artists create a profile, show their work, and tell us where they are.
          Businesses share what they need. Discovery and booking are future
          product phases; today, Cultgig creates the foundation.
        </InfoPage>
      );
      break;
    case "/for-artists":
      page = (
        <InfoPage
          title="Your work is your proof."
          eyebrow="FOR ARTISTS"
          open={open}
          role="artist"
          image={pageImages.forArtistsHero}
          stepGroups={[{ title: "Artist path", steps: homeContent.howItWorks.artistTrack.steps }]}
        >
          Build a profile that reflects your craft — from musicians and DJs to
          photographers, decorators, dancers, and performers. A profile is the
          first step toward being discovered.
        </InfoPage>
      );
      break;
    case "/for-businesses":
      page = (
        <InfoPage
          title="Find the right creative fit."
          eyebrow="FOR BUSINESSES"
          open={open}
          role="client"
          image={pageImages.forBusinessesHero}
          stepGroups={[{ title: "Business path", steps: homeContent.howItWorks.clientTrack.steps }]}
        >
          Tell us about your business and creative needs. Profile-based
          discovery and booking are where Cultgig is headed; joining now helps
          shape that marketplace.
        </InfoPage>
      );
      break;
    case "/faq":
      page = <FAQPage />;
      break;
    case "/contact":
      page = (
        <InfoPage title="Let’s talk." eyebrow="CONTACT" open={open}>
          For general questions, artist support, or partnership conversations,
          {siteConfig.supportEmail ? (
            <>
              {" "}email us at{" "}
              <a href={`mailto:${siteConfig.supportEmail}`}>
                {siteConfig.supportEmail}
              </a>
              .
            </>
          ) : (
            " reach out through the contact details configured for this deployment."
          )}
        </InfoPage>
      );
      break;
    case "/privacy":
      page = <LegalPage kind="Privacy Policy" />;
      break;
    case "/terms":
      page = <LegalPage kind="Terms" />;
      break;
    default:
      page = <NotFoundPage open={open} />;
  }
  return (
    <NavContext.Provider value={navigate}>
      <OnboardingProvider>
        <Header openOnboarding={() => open()} />
        {page}
        <Footer />
        <OnboardingModal
          {...onboarding}
          close={() => setOnboarding({ open: false })}
        />
      </OnboardingProvider>
    </NavContext.Provider>
  );
}
