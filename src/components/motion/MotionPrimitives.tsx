import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { motionTokens } from "../../styles/motion";
export function Reveal({
  children,
  className = "",
  delay = 0,
  x = 0,
  y = 22,
  duration = motionTokens.reveal,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
  duration?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, x, y }}
      whileInView={reduced ? {} : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration,
        ease: motionTokens.easeOut,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export function Magnet({
  children,
  className = "",
  padding = 150,
  strength = 3,
}: {
  children: ReactNode;
  className?: string;
  padding?: number;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pointer = useMediaQuery("(hover:hover) and (pointer:fine)");
  const reduced = useReducedMotion();
  const [transform, setTransform] = useState("translate3d(0, 0, 0)");
  useEffect(() => {
    if (!pointer || reduced) return;
    const element = ref.current;
    if (!element) return;
    const move = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      const active = Math.abs(x) <= rect.width / 2 + padding && Math.abs(y) <= rect.height / 2 + padding;
      setTransform(active ? `translate3d(${x / strength}px, ${y / strength}px, 0)` : "translate3d(0, 0, 0)");
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [padding, pointer, reduced, strength]);
  return <div ref={ref} className={className} style={{ transform, transition: "transform 0.3s ease-out", willChange: pointer && !reduced ? "transform" : undefined }}>{children}</div>;
}

export function ScrollRevealText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });
  return (
    <p ref={ref} className={`scroll-reveal-text ${className}`}>
      {Array.from(text).map((character, index) => <RevealCharacter key={`${character}-${index}`} character={character} index={index} length={text.length} progress={scrollYProgress} reduced={Boolean(reduced)} />)}
    </p>
  );
}

function RevealCharacter({ character, index, length, progress, reduced }: { character: string; index: number; length: number; progress: ReturnType<typeof useScroll>["scrollYProgress"]; reduced: boolean }) {
  const start = index / length;
  const end = Math.min(1, start + 0.12);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return reduced ? character : <motion.span style={{ opacity }}>{character}</motion.span>;
}

export type MarqueeItem = { id: string; src: string; alt: string };
export function Marquee({ items }: { items: MarqueeItem[] }) {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const update = () => {
      const top = ref.current?.getBoundingClientRect().top ?? 0;
      setOffset((window.scrollY - top + window.innerHeight) * 0.3);
    };
    addEventListener("scroll", update, { passive: true });
    update();
    return () => removeEventListener("scroll", update);
  }, []);
  const repeated = [...items, ...items, ...items];
  return <section ref={ref} className="marquee" aria-label="Cultgig creative disciplines">
    <div className="marquee-row" style={{ transform: `translate3d(${offset - 200}px, 0, 0)` }}>{repeated.slice(0, items.length * 2).map((item, index) => <img key={`${item.id}-a-${index}`} src={item.src} alt={item.alt} loading="lazy" width="420" height="270" />)}</div>
    <div className="marquee-row" style={{ transform: `translate3d(-${offset - 200}px, 0, 0)` }}>{repeated.map((item, index) => <img key={`${item.id}-b-${index}`} src={item.src} alt={item.alt} loading="lazy" width="420" height="270" />)}</div>
  </section>;
}

export function StickyStackCard({ children, index, total }: { children: ReactNode; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : targetScale]);
  return <motion.div ref={ref} className="sticky-stack-card" style={{ top: `${index * 28 + 24}px`, scale: reduced ? 1 : scale }}>{children}</motion.div>;
}
export function StaggerReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduced ? 0 : 0.1 } },
      }}
    >
      {children}
    </motion.div>
  );
}
export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: motionTokens.reveal,
            ease: motionTokens.easeOut,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const pointer = useMediaQuery("(hover:hover) and (pointer:fine)");
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`tilt-card ${className}`}
      whileHover={
        pointer && !reduced
          ? { y: -7, rotateX: 2, rotateY: -2, scale: 1.01 }
          : undefined
      }
      transition={motionTokens.spring}
    >
      {children}
    </motion.div>
  );
}
export function ParallaxImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, reduced ? 0 : 28]);
  return (
    <motion.img
      className={className}
      src={src}
      alt={alt}
      style={{ y }}
      loading="eager"
    />
  );
}
export function FloatingVisual() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="floating-visual"
      animate={reduced ? {} : { y: [0, -9, 0], rotate: [-4, 2, -4] }}
      transition={{ duration: motionTokens.emphasis * 8, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <span>✦</span>
      <i />
      <b />
    </motion.div>
  );
}
export function CreativeIllustration({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      className={`creative-illustration ${className}`}
      viewBox="0 0 180 130"
      aria-hidden="true"
    >
      <rect
        x="24"
        y="26"
        width="94"
        height="72"
        rx="15"
        fill="var(--color-primary-tint)"
        stroke="var(--color-primary)"
        strokeWidth="3"
      />
      <circle
        cx="72"
        cy="61"
        r="18"
        fill="var(--color-secondary)"
        stroke="var(--color-primary)"
        strokeWidth="3"
      />
      <path d="M132 35l24 14v30l-24 14z" fill="var(--color-primary)" />
      <circle cx="153" cy="64" r="5" fill="var(--color-secondary)" />
      <path
        d="M39 107h95"
        stroke="var(--color-primary)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
