import {
  ChevronRight,
  Music2,
  BriefcaseBusiness,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Button } from "../components/ui/Button";
import { CategoryCard } from "../components/ui/CategoryCard";
import { HumanImageCard } from "../components/ui/HumanImageCard";
import {
  CreativeIllustration,
  FloatingVisual,
  ParallaxImage,
  Reveal,
  StaggerItem,
  StaggerReveal,
  TiltCard,
} from "../components/motion/MotionPrimitives";
import { faqItems } from "../content/faq";
import { homeContent } from "../content/home";
import {
  categoryImages,
  heroImage,
  pageImages,
  floatingCreatorThumb,
  showcaseCreators,
} from "../content/images";
import { testimonialItems } from "../content/testimonials";
import { usePageMeta } from "../hooks/usePageMeta";
import { motionTokens } from "../styles/motion";
import type { Role } from "../types/onboarding";
function Page({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  usePageMeta(title);
  const reduced = useReducedMotion();
  return (
    <motion.main
      className="page"
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: motionTokens.standard,
        ease: motionTokens.easeOut,
      }}
    >
      {children}
    </motion.main>
  );
}
function CTA({ open, role }: { open: (r?: Role) => void; role?: Role }) {
  return (
    <section className="cta-band">
      <Reveal>
        <div>
          <p className="eyebrow">{homeContent.ctaBand.eyebrow}</p>
          <h2>{homeContent.ctaBand.heading}</h2>
        </div>
      </Reveal>
      <Button variant="light" className="magnetic" onClick={() => open(role)}>
        {homeContent.ctaBand.button} <ChevronRight size={17} />
      </Button>
    </section>
  );
}
function FloatingProfileChip() {
  return (
    <motion.figure
      className="floating-profile-chip"
      initial={{ opacity: 0, y: 18, rotate: 3 }}
      animate={{ opacity: 1, y: 0, rotate: -4 }}
      transition={{ delay: motionTokens.standard, duration: motionTokens.reveal, ease: motionTokens.easeOut }}
    >
      <img src={floatingCreatorThumb.src} alt={floatingCreatorThumb.alt} width="72" height="72" />
      <figcaption>
        <small>{homeContent.hero.floatingChip.label}</small>
        <strong>{homeContent.hero.floatingChip.description}</strong>
      </figcaption>
    </motion.figure>
  );
}
export function HomePage({ open }: { open: (r?: Role) => void }) {
  usePageMeta("Where Artists & Gigs Get Discovered");
  return (
    <main>
      <section className="hero">
        <div className="hero-media">
          <ParallaxImage src={heroImage.src} alt={heroImage.alt} />
        </div>
        <FloatingVisual />
        <FloatingProfileChip />
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.p
            className="eyebrow"
            variants={{
              hidden: { opacity: 0, y: 15 },
              show: { opacity: 1, y: 0 },
            }}
          >
            {homeContent.hero.eyebrow}
          </motion.p>
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 32 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: motionTokens.slow,
                  ease: motionTokens.easeOut,
                },
              },
            }}
          >
            {homeContent.hero.titleMain}
            <i>{homeContent.hero.titleAccent}</i>
            {homeContent.hero.titleEnd}
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            {homeContent.hero.subtitle}
          </motion.p>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <Button className="magnetic" onClick={() => open("artist")}>
              {homeContent.hero.artistCta} <Music2 size={17} />
            </Button>
            <Button
              className="magnetic"
              variant="light"
              onClick={() => open("client")}
            >
              {homeContent.hero.clientCta} <BriefcaseBusiness size={17} />
            </Button>
          </motion.div>
        </motion.div>
        <div className="hero-orbit hero-orbit-a" />
        <div className="hero-orbit hero-orbit-b" />
      </section>
      <Audience open={open} />
      <Split />
      <How />
      <Categories />
      <Showcase />
      <Trust />
      <FaqPreview />
      <CTA open={open} />
    </main>
  );
}
function Audience({ open }: { open: (r?: Role) => void }) {
  return (
    <section className="audience">
      <Reveal>
        <p className="eyebrow purple">{homeContent.audienceSplit.eyebrow}</p>
        <h2>{homeContent.audienceSplit.heading}</h2>
      </Reveal>
      <StaggerReveal className="audience-grid">
        <StaggerItem>
          <TiltCard>
            <article className="audience-card artist-card">
              <Music2 />
              <p>{homeContent.audienceSplit.artist.badge}</p>
              <h3>{homeContent.audienceSplit.artist.title}</h3>
              <span>{homeContent.audienceSplit.artist.description}</span>
              <ul className="audience-highlights">
                {homeContent.audienceSplit.artist.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
              <Button variant="outline" onClick={() => open("artist")}>
                {homeContent.audienceSplit.artist.cta}{" "}
                <ArrowUpRight size={16} />
              </Button>
            </article>
          </TiltCard>
        </StaggerItem>
        <StaggerItem>
          <TiltCard>
            <article className="audience-card business-card">
              <BriefcaseBusiness />
              <p>{homeContent.audienceSplit.client.badge}</p>
              <h3>{homeContent.audienceSplit.client.title}</h3>
              <span>{homeContent.audienceSplit.client.description}</span>
              <ul className="audience-highlights">
                {homeContent.audienceSplit.client.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
              <Button variant="outline" onClick={() => open("client")}>
                {homeContent.audienceSplit.client.cta}{" "}
                <ArrowUpRight size={16} />
              </Button>
            </article>
          </TiltCard>
        </StaggerItem>
      </StaggerReveal>
    </section>
  );
}
function Split() {
  return (
    <section className="split">
      <Reveal>
        <p className="eyebrow purple">{homeContent.problem.eyebrow}</p>
        <h2>{homeContent.problem.heading}</h2>
      </Reveal>
      <Reveal delay={0.08}>
        <div>
          {homeContent.problem.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Reveal>
      <CreativeIllustration className="problem-illustration" />
    </section>
  );
}
function How() {
  return (
    <section className="surface how-section">
      <Reveal>
        <p className="eyebrow purple">{homeContent.howItWorks.eyebrow}</p>
        <h2>{homeContent.howItWorks.heading}</h2>
        <p className="section-intro">{homeContent.howItWorks.subheading}</p>
      </Reveal>
      <StaggerReveal className="tracks">
        <StaggerItem>
          <Track
            title="For artists"
            icon={<Music2 />}
            items={homeContent.howItWorks.artistTrack.steps.map(
              (step) => step.title,
            )}
          />
        </StaggerItem>
        <StaggerItem>
          <Track
            title="For businesses"
            icon={<BriefcaseBusiness />}
            items={homeContent.howItWorks.clientTrack.steps.map(
              (step) => step.title,
            )}
          />
        </StaggerItem>
      </StaggerReveal>
    </section>
  );
}
function Track({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
}) {
  return (
    <TiltCard>
      <article className="track">
        <b>
          {icon}
          {title}
        </b>
        {items.map((x, i) => (
          <p key={x}>
            <span>0{i + 1}</span>
            {x}
            <ArrowUpRight size={14} />
          </p>
        ))}
      </article>
    </TiltCard>
  );
}
function Categories() {
  return (
    <section id="categories" className="categories">
      <Reveal>
        <p className="eyebrow">{homeContent.categories.eyebrow}</p>
        <h2>{homeContent.categories.heading}</h2>
        <p className="section-intro">{homeContent.categories.subheading}</p>
      </Reveal>
      <StaggerReveal className="category-grid">
        {Object.values(categoryImages).map((category, i) => (
          <StaggerItem key={category.category}>
            <CategoryCard number={`0${i + 1}`} label={category.category!} image={category.src} alt={category.alt} />
          </StaggerItem>
        ))}
      </StaggerReveal>
    </section>
  );
}
function Showcase() {
  return (
    <section className="showcase">
      <Reveal>
        <p className="eyebrow purple">{homeContent.showcase.eyebrow}</p>
        <h2>{homeContent.showcase.heading}</h2>
        <p className="section-intro">{homeContent.showcase.subheading}</p>
      </Reveal>
      <StaggerReveal className="showcase-grid">
        {showcaseCreators.map((creator, index) => (
          <StaggerItem key={creator.name}>
            <TiltCard>
              <HumanImageCard
                src={creator.image}
                alt={`Representative creative showcase: ${creator.name}`}
                eyebrow={creator.category}
                name={creator.name}
                role={creator.role}
                location={creator.city}
                eager={index === 0}
                variant={index === 0 ? "offset" : index === 1 ? "overlap" : "rect"}
              />
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerReveal>
      <p className="representative">{homeContent.showcase.disclaimer}</p>
    </section>
  );
}
function Trust() {
  return (
    <section className="trust">
      <Reveal>
        <p className="eyebrow purple">{homeContent.trust.eyebrow}</p>
        <h2>{homeContent.trust.heading}</h2>
      </Reveal>
      <StaggerReveal className="trust-grid">
        {homeContent.trust.pillars.map((pillar, index) => (
          <StaggerItem key={pillar.title}>
            <TiltCard>
              <article>
                {index === 1 ? <Sparkles /> : <ShieldCheck />}
                <h3>{pillar.title}</h3>
                <p>{pillar.desc}</p>
              </article>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </section>
  );
}
function FaqPreview() {
  return (
    <section className="faq-preview">
      <Reveal>
        <p className="eyebrow purple">FAQ</p>
        <h2>Good questions deserve straight answers.</h2>
      </Reveal>
      {faqItems.slice(0, 3).map(([q, a], index) => (
        <Reveal key={q} delay={index * 0.06}>
          <details>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        </Reveal>
      ))}
      {!testimonialItems.length && (
        <p className="empty-state">
          Community voices will appear here as more artists and businesses join.
        </p>
      )}
    </section>
  );
}
export function InfoPage({
  title,
  eyebrow,
  children,
  open,
  role,
  image,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
  open: (r?: Role) => void;
  role?: Role;
  image?: { src: string; alt: string };
}) {
  return (
    <Page title={title}>
      <section className="inner-hero">
        <Reveal>
          <p className="eyebrow purple">{eyebrow}</p>
          <h1>{title}</h1>
          <div className="prose">{children}</div>
          {role && (
            <Button className="magnetic" onClick={() => open(role)}>
              {role === "artist"
                ? "Create Your Artist Profile"
                : "Start Hiring"}{" "}
              <ChevronRight size={17} />
            </Button>
          )}
        </Reveal>
        {image && (
          <img
            className="inner-hero-image"
            src={image.src}
            alt={image.alt}
            loading="eager"
          />
        )}
        <CreativeIllustration className="inner-illustration" />
      </section>
      {role && <CTA open={open} role={role} />}
    </Page>
  );
}
export function FAQPage() {
  return (
    <Page title="Frequently Asked Questions">
      <section className="inner-hero">
        <Reveal>
          <p className="eyebrow purple">FAQ</p>
          <h1>Answers, without the runaround.</h1>
        </Reveal>
        <div className="faq-list">
          {faqItems.map(([q, a]) => (
            <FAQItem key={q} question={q} answer={a} />
          ))}
        </div>
      </section>
    </Page>
  );
}
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <article>
      <button aria-expanded={open} onClick={() => setOpen(!open)}>
        {question}
        <motion.span animate={{ rotate: open ? 45 : 0 }}>+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: motionTokens.standard }}
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </article>
  );
}
export function LegalPage({ kind }: { kind: "Privacy Policy" | "Terms" }) {
  return (
    <Page title={kind}>
      <section className="inner-hero legal">
        <Reveal>
          <p className="eyebrow purple">LEGAL</p>
          <h1>{kind}</h1>
          <p>Last updated: [DATE]</p>
          <h2>What we collect</h2>
          <p>
            Cultgig collects the information you provide while creating a
            profile: email, name, city, profile image, portfolio media, social
            links, and relevant business information.
          </p>
          <h2>How we use it</h2>
          <p>
            We use profile information to operate and improve the Cultgig
            onboarding experience and, as the marketplace develops, to help
            facilitate relevant connections. This policy is issued by [LEGAL
            ENTITY NAME], [REGISTERED ADDRESS].
          </p>
          <h2>Contact</h2>
          <p>For questions, contact [SUPPORT EMAIL].</p>
        </Reveal>
      </section>
    </Page>
  );
}
export function NotFoundPage({ open }: { open: (r?: Role) => void }) {
  return (
    <Page title="Page Not Found">
      <section className="inner-hero not-found">
        <CreativeIllustration />
        <Reveal>
          <p className="eyebrow purple">404</p>
          <h1>Looks like this gig disappeared.</h1>
          <p>Let’s get you back to Cultgig.</p>
          <Button onClick={() => location.assign("/")}>Go home</Button>{" "}
          <Button variant="outline" onClick={() => open()}>
            Get Started
          </Button>
        </Reveal>
      </section>
    </Page>
  );
}
