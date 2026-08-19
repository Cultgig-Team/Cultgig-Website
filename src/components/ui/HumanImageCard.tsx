import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export type HumanImageCardProps = {
  src: string;
  alt: string;
  eyebrow?: string;
  name?: string;
  role?: string;
  location?: string;
  badge?: string;
  className?: string;
  eager?: boolean;
};

export function HumanImageCard({
  src,
  alt,
  eyebrow,
  name,
  role,
  location,
  badge,
  className = '',
  eager = false,
}: HumanImageCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.figure
      className={`human-card ${className}`}
      whileHover={reduced ? undefined : { scale: 1.02, y: -6 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
    >
      <div className="human-card-media">
        <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} />
        {badge && <span className="human-card-badge">{badge}</span>}
      </div>
      <figcaption className="human-card-meta">
        {eyebrow && <small className="human-card-eyebrow">{eyebrow}</small>}
        <div className="human-card-title">
          {name && <strong className="human-card-name">{name}</strong>}
          {role && <span className="human-card-role">{role}</span>}
        </div>
        {location && <div className="human-card-location">{location}</div>}
      </figcaption>
    </motion.figure>
  );
}

export default HumanImageCard;
