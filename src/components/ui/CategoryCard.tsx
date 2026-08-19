import { ArrowUpRight } from "lucide-react";
import { TiltCard } from "../motion/MotionPrimitives";

export type CategoryCardProps = {
  number: string;
  label: string;
  image: string;
  alt: string;
};

export function CategoryCard({ number, label, image, alt }: CategoryCardProps) {
  return (
    <TiltCard className="category-card-shell">
      <article className="category-card">
        <img src={image} alt={alt} loading="lazy" width="900" height="600" />
        <div className="category-card-wash" />
        <small>{number}</small>
        <span>{label}</span>
        <ArrowUpRight aria-hidden="true" />
      </article>
    </TiltCard>
  );
}
