import type { ButtonHTMLAttributes, ReactNode } from "react";
export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: {
  children: ReactNode;
  variant?: "primary" | "light" | "outline" | "glow" | "outline-light";
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`button button-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}
export function IconButton({
  label,
  children,
  ...props
}: {
  label: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="icon-button" aria-label={label} {...props}>
      {children}
    </button>
  );
}
