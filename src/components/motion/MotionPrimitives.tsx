import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { ReactNode } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { motionTokens } from "../../styles/motion";
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: motionTokens.reveal,
        ease: motionTokens.easeOut,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
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
