import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "../../app/App";
import { mobileExtras, primaryNavigation } from "../../config/navigation";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { motionTokens } from "../../styles/motion";
import { Button, IconButton } from "../ui/Button";
export function Header({ openOnboarding }: { openOnboarding: () => void }) {
  const [open, setOpen] = useState(false),
    [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useFocusTrap(ref, open, () => setOpen(false));
  useEffect(() => {
    const update = () => setScrolled(scrollY > 18);
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);
  return (
    <header
      className={`site-header ${location.pathname === "/" && !scrolled ? "header-hero" : ""}`}
    >
      <Link className="logo" to="/">
        Cultgig
      </Link>
      <nav aria-label="Primary navigation">
        {primaryNavigation.map((x) => (
          <Link
            key={x.path}
            to={x.path}
            aria-current={location.pathname === x.path ? "page" : undefined}
          >
            {x.label}
            <i />
          </Link>
        ))}
      </nav>
      <Button onClick={openOnboarding}>Get Started</Button>
      <IconButton
        label="Open navigation menu"
        className="menu-button"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </IconButton>
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
            <IconButton
              label="Close navigation menu"
              onClick={() => setOpen(false)}
            >
              <X />
            </IconButton>
            <Link className="logo" to="/" onClick={() => setOpen(false)}>
              Cultgig
            </Link>
            {[...primaryNavigation, ...mobileExtras].map((x) => (
              <Link key={x.path} to={x.path} onClick={() => setOpen(false)}>
                {x.label}
              </Link>
            ))}
            <Button
              onClick={() => {
                setOpen(false);
                openOnboarding();
              }}
            >
              Get Started
            </Button>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
}
