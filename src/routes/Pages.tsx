import {
  ChevronRight,
  Music2,
  BriefcaseBusiness,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MapPin,
  Users,
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
  TiltCard,
} from "../components/motion/MotionPrimitives";
import { AppMockup } from "../components/ui/AppMockup";
import { NumberedListItem } from "../components/ui/NumberedListItem";
import { faqItems, detailedFaqList } from "../content/faq";
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
  pageType = "website",
  children,
}: {
  title: string;
  pageType?: "website" | "faq";
  children: React.ReactNode;
}) {
  usePageMeta(title, undefined, pageType);
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

function CTA({
  open,
  role,
  title,
  eyebrow,
  buttonText,
}: {
  open: (r?: Role) => void;
  role?: Role;
  title?: string;
  eyebrow?: string;
  buttonText?: string;
}) {
  return (
    <section className="cta-band">
      <Reveal>
        <div>
          <p className="eyebrow">{eyebrow || homeContent.ctaBand.eyebrow}</p>
          <h2>{title || homeContent.ctaBand.heading}</h2>
        </div>
      </Reveal>
      <Button variant="light" className="magnetic" onClick={() => open(role)}>
        {buttonText || homeContent.ctaBand.button} <ChevronRight size={17} />
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
      transition={{
        delay: motionTokens.standard,
        duration: motionTokens.reveal,
        ease: motionTokens.easeOut,
      }}
    >
      <Magnet padding={80} strength={5}>
        <img
          src={floatingCreatorThumb.src}
          alt={floatingCreatorThumb.alt}
          width="72"
          height="72"
        />
      </Magnet>
      <figcaption>
        <small>{homeContent.hero.floatingChip.label}</small>
        <strong>{homeContent.hero.floatingChip.description}</strong>
      </figcaption>
    </motion.figure>
  );
}

/* ==========================================================================
   HOMEPAGE
   ========================================================================== */
export function HomePage({
  openOnboarding,
  openPostRequirement,
}: {
  openOnboarding: (r?: Role) => void;
  openPostRequirement: () => void;
}) {
  usePageMeta("Where Artists & Gigs Get Discovered");

  return (
    <main>
      {/* 1. Hero */}
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
            className="hero-cta-group"
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <Button
              variant="glow"
              className="magnetic"
              onClick={openPostRequirement}
            >
              <BriefcaseBusiness size={16} />
              {homeContent.hero.postRequirementCta}
            </Button>
            <Button
              variant="light"
              className="magnetic"
              onClick={() => openOnboarding("artist")}
            >
              <Music2 size={16} />
              {homeContent.hero.artistCta}
            </Button>
          </motion.div>
        </motion.div>
        <div className="hero-orbit hero-orbit-a" />
        <div className="hero-orbit hero-orbit-b" />
      </section>

      {/* 2. Marquee */}
      <Marquee
        items={[
          ...Object.entries(categoryImages).map(([id, image]) => ({
            id,
            src: image.src,
            alt: image.alt,
          })),
          ...showcaseCreators.map((creator) => ({
            id: creator.name,
            src: creator.image,
            alt: `${creator.category} profile for ${creator.name}`,
          })),
        ]}
      />

      {/* 3. Two-Sided Marketplace Entry */}
      <TwoSidedEntry
        openOnboarding={openOnboarding}
        openPostRequirement={openPostRequirement}
      />

      {/* 4. Creator Showcase — static inspiration, not bookable listings */}
      <CreatorShowcase openOnboarding={openOnboarding} />

      {/* 5. The Problem & Cultgig Truth */}
      <Split />

      {/* 6. How Cultgig Works */}
      <How />

      {/* 7. Categories */}
      <Categories />

      {/* 8. Trust & Reputation System */}
      <Trust />

      {/* 9. Mobile App Concept */}
      <AppComingSoon open={() => openOnboarding("artist")} />

      {/* 10. FAQ Preview */}
      <FaqPreview />

      {/* 11. Final CTA */}
      <CTA open={() => openOnboarding()} />
    </main>
  );
}

function TwoSidedEntry({
  openOnboarding,
  openPostRequirement,
}: {
  openOnboarding: (role?: Role) => void;
  openPostRequirement: () => void;
}) {
  const { clientSide, artistSide, eyebrow, heading } = homeContent.twoSidedSplit;
  return (
    <section className="two-sided-entry-section">
      <div className="two-sided-entry-container">
        <Reveal>
          <div className="two-sided-header">
            <span className="entry-badge">{eyebrow}</span>
            <h2>{heading}</h2>
          </div>
        </Reveal>

        <StaggerReveal className="two-sided-cards-grid">
          {/* Client / Business Side */}
          <StaggerItem>
            <TiltCard>
              <article className="entry-card entry-client-card">
                <span className="entry-badge">{clientSide.badge}</span>
                <h3>{clientSide.title}</h3>
                <p className="entry-desc">{clientSide.description}</p>
                <ul className="entry-highlights">
                  {clientSide.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <div className="entry-actions">
                  <Button variant="primary" onClick={openPostRequirement}>
                    <BriefcaseBusiness size={15} />
                    {clientSide.postCta}
                  </Button>
                </div>
              </article>
            </TiltCard>
          </StaggerItem>

          {/* Artist Side */}
          <StaggerItem>
            <TiltCard>
              <article className="entry-card entry-artist-card">
                <span className="entry-badge">{artistSide.badge}</span>
                <h3>{artistSide.title}</h3>
                <p className="entry-desc">{artistSide.description}</p>
                <ul className="entry-highlights">
                  {artistSide.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <div className="entry-actions">
                  <Button
                    variant="primary"
                    onClick={() => openOnboarding("artist")}
                  >
                    <Music2 size={15} />
                    {artistSide.joinCta}
                  </Button>
                </div>
              </article>
            </TiltCard>
          </StaggerItem>
        </StaggerReveal>
      </div>
    </section>
  );
}

/* CreatorShowcase — static brand section showing example creators
   These are representative profiles, not live bookable listings.
   Full marketplace experience lives in the Cultgig mobile app. */
function CreatorShowcase({ openOnboarding }: { openOnboarding: (role?: Role) => void }) {
  return (
    <section className="creator-showcase-section">
      <div className="creator-showcase-container">
        <Reveal>
          <div className="creator-showcase-header">
            <span className="entry-badge">CREATOR COMMUNITY</span>
            <h2>Meet the artists shaping creative culture.</h2>
            <p className="section-intro">
              From live acoustic sets at rooftop cafes to full floral wedding scenography — Cultgig brings verified independent artists and serious clients together on one trusted platform.
            </p>
          </div>
        </Reveal>

        <StaggerReveal className="creator-showcase-grid">
          {showcaseCreators.map((creator) => (
            <StaggerItem key={creator.name}>
              <TiltCard>
                <article className="creator-showcase-card">
                  <div className="creator-showcase-img-wrap">
                    <img
                      src={creator.image}
                      alt={`${creator.name} — ${creator.role}`}
                      loading="lazy"
                    />
                    <span className="creator-showcase-category-tag">{creator.category}</span>
                  </div>
                  <div className="creator-showcase-info">
                    <h3>{creator.name}</h3>
                    <p className="creator-showcase-role">{creator.role}</p>
                    <p className="creator-showcase-city">📍 {creator.city}</p>
                    <div className="creator-showcase-tags">
                      {creator.tags.map((tag) => (
                        <span key={tag} className="creator-tag-pill">{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <Reveal delay={0.14}>
          <div className="creator-showcase-cta-block">
            <div>
              <p className="eyebrow purple">ARE YOU A CREATIVE PROFESSIONAL?</p>
              <h3>Get discovered by venues, brands &amp; event organizers.</h3>
              <p style={{ color: "var(--color-text-secondary)", maxWidth: "480px" }}>
                Join the growing Cultgig community of verified artists. Create your profile and start receiving direct booking inquiries from clients in your city.
              </p>
            </div>
            <Button variant="glow" className="magnetic" onClick={() => openOnboarding("artist")}>
              <Music2 size={16} />
              Join as an Artist
            </Button>
          </div>
        </Reveal>
      </div>
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
            title="For Businesses & Venues"
            icon={<BriefcaseBusiness size={20} />}
            steps={homeContent.howItWorks.clientTrack.steps}
          />
        </StaggerItem>
        <StaggerItem>
          <Track
            title="For Independent Artists"
            icon={<Music2 size={20} />}
            steps={homeContent.howItWorks.artistTrack.steps}
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
        {steps.map((step) => (
          <NumberedListItem
            key={step.num}
            number={step.num}
            title={step.title}
            description={step.desc}
          />
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
            <CategoryCard
              number={`0${i + 1}`}
              label={category.category!}
              image={category.src}
              alt={category.alt}
            />
          </StaggerItem>
        ))}
      </StaggerReveal>
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
                {index === 0 ? (
                  <ShieldCheck size={28} />
                ) : index === 1 ? (
                  <Sparkles size={28} />
                ) : (
                  <Users size={28} />
                )}
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

function AppComingSoon({ open }: { open: (role?: Role) => void }) {
  return (
    <section className="app-coming-soon">
      <Reveal>
        <p className="eyebrow purple">{homeContent.app.eyebrow}</p>
        <h2>{homeContent.app.heading}</h2>
        <p>{homeContent.app.description}</p>
        <Button variant="glow" onClick={() => open("artist")}>
          {homeContent.app.badge} <ChevronRight size={17} />
        </Button>
      </Reveal>
      <Reveal delay={0.12} x={35}>
        <AppMockup onCreateProfile={() => open("artist")} />
      </Reveal>
    </section>
  );
}

function FaqPreview() {
  return (
    <section className="faq-preview">
      <Reveal>
        <p className="eyebrow purple">FREQUENTLY ASKED QUESTIONS</p>
        <h2>Good questions deserve straight answers.</h2>
      </Reveal>
      {faqItems.slice(0, 4).map(([q, a], index) => (
        <Reveal key={q} delay={index * 0.05}>
          <details>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        </Reveal>
      ))}
    </section>
  );
}

/* ==========================================================================
   GENERIC & INNER PAGES
   ========================================================================== */
export function InfoPage({
  title,
  eyebrow,
  children,
  open,
  openPostRequirement,
  role,
  image,
  stepGroups,
  about = false,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
  open: (r?: Role) => void;
  openPostRequirement?: () => void;
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
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {role === "artist" && (
              <Button className="magnetic" onClick={() => open("artist")}>
                Create Your Artist Profile <ChevronRight size={17} />
              </Button>
            )}
            {role === "client" && openPostRequirement && (
              <>
                <Button
                  className="magnetic"
                  onClick={openPostRequirement}
                >
                  <BriefcaseBusiness size={16} /> Post a Requirement
                </Button>
                <Button
                  variant="outline"
                  className="magnetic"
                  onClick={() => location.assign("/contact")}
                >
                  Contact Us <ArrowUpRight size={16} />
                </Button>
              </>
            )}
          </div>
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
                <NumberedListItem
                  key={step.num}
                  number={step.num}
                  title={step.title}
                  description={step.desc}
                />
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
              <img
                src={member.image}
                alt={`${member.name}, ${member.designation}`}
                width="480"
                height="560"
                loading="lazy"
              />
              <div>
                <h3>{member.name}</h3>
                <p>{member.designation}</p>
                <span>{member.bio}</span>
                <nav aria-label={`${member.name}'s social profiles`}>
                  {member.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {social.label}
                    </a>
                  ))}
                </nav>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="empty-state">{aboutContent.team.empty}</p>
      )}
    </section>
  );
}

/* ==========================================================================
   FAQ PAGE
   ========================================================================== */
export function FAQPage() {
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "For Artists", "For Businesses", "Trust & Bookings", "General"] as const;

  const filtered = detailedFaqList.filter((item) => {
    if (selectedCat !== "All" && item.category !== selectedCat) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <Page title="Frequently Asked Questions" pageType="faq">
      <section className="inner-hero faq-page-hero">
        <Reveal>
          <p className="eyebrow purple">HELP & ANSWERS</p>
          <h1>Frequently Asked Questions</h1>
          <p className="prose">
            Straightforward answers about Cultgig artist profiles, event bookings, trust verification, and pricing transparency.
          </p>

          <div style={{ maxWidth: "600px", margin: "24px 0" }}>
            <div className="discovery-search-input-wrap" style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Search questions (e.g. fees, verification, booking flow)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="discovery-search-input"
                style={{ background: "#ffffff", border: "1px solid var(--color-border)" }}
              />
            </div>
          </div>

          <div className="category-pills-rail" style={{ marginBottom: "20px" }}>
            {categories.map((c) => (
              <button
                key={c}
                className={`category-pill ${selectedCat === c ? "active" : ""}`}
                onClick={() => setSelectedCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="faq-list">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <FAQItem key={item.question} question={item.question} answer={item.answer} />
            ))
          ) : (
            <p className="empty-state">No answers match your search term. Try a different query.</p>
          )}
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

/* ==========================================================================
   CONTACT PAGE
   ========================================================================== */
export function ContactPage({ openOnboarding }: { openOnboarding: () => void }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Page title="Let’s talk.">
      <section className="inner-hero contact-page-section">
        <Reveal>
          <p className="eyebrow purple">CONTACT & SUPPORT</p>
          <h1 className="brand-gradient-text">Let’s talk.</h1>
          <p className="prose">
            Have questions about artist onboarding, partnership inquiries, or hiring creative talent? We are here to help.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px", marginTop: "32px" }}>
            <div style={{ background: "var(--color-surface)", padding: "28px", borderRadius: "18px", border: "1px solid var(--color-border)" }}>
              <h3>Direct Channels</h3>
              <p style={{ margin: "14px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                <Mail size={16} className="purple" />
                {siteConfig.supportEmail ? (
                  <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>
                ) : (
                  <span>support@cultgig.com</span>
                )}
              </p>
              <p style={{ margin: "14px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                <MapPin size={16} className="purple" />
                <span>Mumbai, Maharashtra, India</span>
              </p>
              <p style={{ margin: "14px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                <ShieldCheck size={16} className="purple" />
                <span>Official Partner & Support Desk</span>
              </p>
            </div>

            <div style={{ background: "#ffffff", padding: "28px", borderRadius: "18px", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-soft)" }}>
              {!sent ? (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600 }}>
                    Your Name
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kabir Sen"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={{ display: "block", width: "100%", marginTop: "6px", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)" }}
                    />
                  </label>
                  <label style={{ fontSize: "13px", fontWeight: 600 }}>
                    Email Address
                    <input
                      type="email"
                      required
                      placeholder="kabir@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={{ display: "block", width: "100%", marginTop: "6px", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)" }}
                    />
                  </label>
                  <label style={{ fontSize: "13px", fontWeight: 600 }}>
                    Message
                    <textarea
                      required
                      rows={3}
                      placeholder="How can we assist you today?"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      style={{ display: "block", width: "100%", marginTop: "6px", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)" }}
                    />
                  </label>
                  <Button type="submit" variant="primary" style={{ marginTop: "8px" }}>
                    Send Message
                  </Button>
                </form>
              ) : (
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <CheckCircle2 size={40} color="#22a06b" style={{ margin: "0 auto 12px" }} />
                  <h3>Message Sent!</h3>
                  <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>
                    Thank you, {form.name}. Our support team will respond to {form.email} within 24 hours.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </section>
    </Page>
  );
}

/* ==========================================================================
   LEGAL & 404 PAGES
   ========================================================================== */
export function LegalPage({ kind }: { kind: "Privacy Policy" | "Terms" }) {
  const { legalEntityName, registeredAddress, supportEmail } = siteConfig;
  return (
    <Page title={kind}>
      <section className="inner-hero legal">
        <Reveal>
          <p className="eyebrow purple">LEGAL INFORMATION</p>
          <h1>{kind}</h1>
          <p>Last updated: August 2026</p>
          <h2>1. Introduction & Overview</h2>
          <p>
            Cultgig operates a two-sided marketplace platform designed to connect creative professionals and artists with venues, organizers, businesses, and private clients. This document outlines our practices regarding data privacy, account terms, and service standards maintained by {legalEntityName}
            {registeredAddress ? ` at ${registeredAddress}` : ""}.
          </p>
          <h2>2. Information Collected & Verified</h2>
          <p>
            We collect information provided directly during profile registration, event booking inquiries, and requirement submissions. This includes: contact credentials (name, verified email, verified phone number), city/location, category, portfolio media, starting rate ranges, and event specifics.
          </p>
          <h2>3. Usage & Direct Connections</h2>
          <p>
            Your information is used solely to provide and improve the Cultgig marketplace, display verified creator portfolios, match custom gig requirements, and facilitate direct communications between clients and artists upon confirmed booking requests.
          </p>
          <h2>4. Contact & Inquiries</h2>
          <p>
            For any legal or privacy questions, contact our compliance officer{supportEmail ? ` at ${supportEmail}` : " via the support email configured for this deployment"}.
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
          <p className="eyebrow purple">404 ERROR</p>
          <h1>Looks like this gig disappeared.</h1>
          <p>The page you are looking for does not exist or has been moved.</p>
          <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
            <Button onClick={() => (location.href = "/")}>Go Home</Button>{" "}
            <Button variant="outline" onClick={() => open()}>
              Explore Cultgig
            </Button>
          </div>
        </Reveal>
      </section>
    </Page>
  );
}
