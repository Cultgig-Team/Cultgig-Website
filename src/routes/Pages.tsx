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
  Magnet,
  Marquee,
  ParallaxImage,
  Reveal,
  ScrollRevealText,
  StaggerItem,
  StaggerReveal,
  StickyStackCard,
  TiltCard,
} from "../components/motion/MotionPrimitives";
import { AppMockup } from "../components/ui/AppMockup";
import { NumberedListItem } from "../components/ui/NumberedListItem";
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
import { aboutContent } from "../content/about";
import { siteConfig } from "../config/site";
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
      <Magnet padding={80} strength={5}>
        <img src={floatingCreatorThumb.src} alt={floatingCreatorThumb.alt} width="72" height="72" />
      </Magnet>
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
            <span className="brand-gradient-text">{homeContent.hero.titleMain}</span>
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
            <Button variant="glow" className="magnetic" onClick={() => open("artist")}>
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
      <Marquee items={[
        ...Object.entries(categoryImages).map(([id, image]) => ({ id, src: image.src, alt: image.alt })),
        ...showcaseCreators.map((creator) => ({ id: creator.name, src: creator.image, alt: `${creator.category} profile for ${creator.name}` })),
      ]} />
      <Audience open={open} />
      <Split />
      <How />
      <Categories />
      <Showcase />
      <Trust />
      <AppComingSoon open={open} />
      <FaqPreview />
      <CTA open={open} />
    </main>
  );
}
function AppComingSoon({ open }: { open: (role?: Role) => void }) {
  return (
    <section className="app-coming-soon">
      <Reveal>
        <p className="eyebrow purple">{homeContent.app.eyebrow}</p>
        <h2>{homeContent.app.heading}</h2>
        <p>{homeContent.app.description}</p>
        <Button variant="glow" onClick={() => open("artist")}>{homeContent.app.badge} <ChevronRight size={17} /></Button>
      </Reveal>
      <Reveal delay={0.12} x={35}>
        <AppMockup />
      </Reveal>
    </section>
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
          <ScrollRevealText text={homeContent.problem.paragraphs.join(" ")} />
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
            steps={homeContent.howItWorks.artistTrack.steps}
          />
        </StaggerItem>
        <StaggerItem>
          <Track
            title="For businesses"
            icon={<BriefcaseBusiness />}
            steps={homeContent.howItWorks.clientTrack.steps}
          />
        </StaggerItem>
      </StaggerReveal>
    </section>
  );
}
function Track({
  title,
  icon,
  steps,
}: {
  title: string;
  icon: React.ReactNode;
  steps: { num: string; title: string; desc: string }[];
}) {
  return (
    <TiltCard>
      <article className="track">
        <b>
          {icon}
          {title}
        </b>
        {steps.map((step) => <NumberedListItem key={step.num} number={step.num} title={step.title} description={step.desc} />)}
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
                variant="rect"
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
  stepGroups,
  about = false,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
  open: (r?: Role) => void;
  role?: Role;
  image?: { src: string; alt: string };
  stepGroups?: { title: string; steps: { num: string; title: string; desc: string }[] }[];
  about?: boolean;
}) {
  return (
    <Page title={title}>
      <section className="inner-hero">
        <Reveal>
          <p className="eyebrow purple">{eyebrow}</p>
          <h1 className="brand-gradient-text">{title}</h1>
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
      {about && <AboutStory />}
      {stepGroups && (
        <section className="editorial-workflows">
          {stepGroups.map((group) => (
            <div className="editorial-workflow" key={group.title}>
              <p className="eyebrow purple">{group.title}</p>
              {group.steps.map((step) => (
                <NumberedListItem key={step.num} number={step.num} title={step.title} description={step.desc} />
              ))}
            </div>
          ))}
        </section>
      )}
      {role && <CTA open={open} role={role} />}
    </Page>
  );
}
function AboutStory() {
  return (
    <>
      <section className="about-vision">
        <Reveal>
          <p className="eyebrow purple">{aboutContent.vision.eyebrow}</p>
          <h2>{aboutContent.vision.heading}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <ScrollRevealText text={aboutContent.vision.paragraphs.join(" ")} />
        </Reveal>
      </section>
      <TeamSection />
    </>
  );
}
function TeamSection() {
  return (
    <section className="team-section">
      <Reveal>
        <p className="eyebrow purple">{aboutContent.team.eyebrow}</p>
        <h2>{aboutContent.team.heading}</h2>
      </Reveal>
      {aboutContent.team.members.length ? (
        <div className="team-grid">
          {aboutContent.team.members.map((member) => (
            <article className="team-card" key={member.name}>
              <img src={member.image} alt={`${member.name}, ${member.designation}`} width="480" height="560" loading="lazy" />
              <div><h3>{member.name}</h3><p>{member.designation}</p><span>{member.bio}</span><nav aria-label={`${member.name}'s social profiles`}>{member.socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label}</a>)}</nav></div>
            </article>
          ))}
        </div>
      ) : <p className="empty-state">{aboutContent.team.empty}</p>}
    </section>
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
  const panelId = `faq-${question.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <article>
      <button
        id={`${panelId}-trigger`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
      >
        {question}
        <motion.span animate={{ rotate: open ? 45 : 0 }}>+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            id={panelId}
            role="region"
            aria-labelledby={`${panelId}-trigger`}
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
  const { legalEntityName, registeredAddress, supportEmail } = siteConfig;
  return (
    <Page title={kind}>
      <section className="inner-hero legal">
        <Reveal>
          <p className="eyebrow purple">LEGAL</p>
          <h1>{kind}</h1>
          <p>Last updated: August 19, 2026</p>
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
            facilitate relevant connections. This policy is maintained by{" "}
            {legalEntityName}
            {registeredAddress ? ` at ${registeredAddress}` : ""}.
          </p>
          <h2>Contact</h2>
          <p>
            For questions, contact us{supportEmail ? ` at ${supportEmail}` : ""}.
          </p>
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
