import { Menu, X, ArrowUpRight, PlusCircle, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "../../app/App";
import { mobileExtras, primaryNavigation } from "../../config/navigation";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { motionTokens } from "../../styles/motion";
import { Button, IconButton } from "../ui/Button";
import type { Role } from "../../types/onboarding";

export function Header({
  openOnboarding,
  openPostRequirement,
  currentPath = "/",
}: {
  openOnboarding: (role?: Role) => void;
  openPostRequirement: () => void;
  currentPath?: string;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useFocusTrap(ref, open, () => setOpen(false));

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 18);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const isHero = currentPath === "/" && !scrolled;

  return (
    <header className={`site-header ${isHero ? "header-hero" : ""}`}>
      <div className="header-inner">
        <Link className="logo" to="/" aria-label="Cultgig Home">
          <span className="logo-text">Cultgig</span>
          <span className="logo-badge">Marketplace</span>
        </Link>

        <nav aria-label="Primary navigation" className="header-nav">
          {primaryNavigation.map((item) => {
            const isActive =
              currentPath === item.path ||
              (item.path.startsWith("/#") && currentPath === "/");
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive ? "active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                <i />
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <Button
            variant="outline"
            className="post-req-header-btn"
            onClick={openPostRequirement}
          >
            Post Requirement
          </Button>
          <Button
            variant="primary"
            className="join-artist-header-btn"
            onClick={() => openOnboarding("artist")}
          >
            Join as Artist
          </Button>
        </div>

        <IconButton
          label="Open navigation menu"
          className="menu-button"
          onClick={() => setOpen(true)}
        >
          <Menu size={22} />
        </IconButton>
      </div>

      <AnimatePresence>
        {open && (
          <motion.aside
            ref={ref}
            className="drawer"
            aria-label="Mobile navigation"
            initial={reduced ? false : { x: "100%", opacity: 0.4 }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { x: "100%", opacity: 0 }}
            transition={{
              duration: motionTokens.standard,
              ease: motionTokens.easeOut,
            }}
          >
            <div className="drawer-header">
              <Link
                className="logo"
                to="/"
                onClick={() => setOpen(false)}
                aria-label="Cultgig Home"
              >
                <span className="logo-text">Cultgig</span>
              </Link>
              <IconButton
                label="Close navigation menu"
                onClick={() => setOpen(false)}
              >
                <X size={20} />
              </IconButton>
            </div>

            <div className="drawer-links">
              {primaryNavigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="drawer-link"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="drawer-divider" />
              <p className="drawer-section-label">MORE</p>

              {mobileExtras.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="drawer-link sub-link"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="drawer-actions">
              <Button
                variant="outline"
                className="drawer-action-btn"
                onClick={() => {
                  setOpen(false);
                  openPostRequirement();
                }}
              >
                Post a Requirement
              </Button>
              <Button
                variant="primary"
                className="drawer-action-btn"
                onClick={() => {
                  setOpen(false);
                  openOnboarding("artist");
                }}
              >
                Join as an Artist
              </Button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
}
