import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "../../app/App";
import { primaryNavigation, mobileExtras } from "../../config/navigation";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { Button, IconButton } from "../ui/Button";
type LeadRole = "artist" | "business";

export function Header({ currentPath, openLead }: { currentPath: string; openLead: (role?: LeadRole) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useFocusTrap(ref, open, () => setOpen(false));
  useEffect(() => { const update = () => setScrolled(window.scrollY > 18); update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
  return <header className={`site-header ${currentPath === "/" && !scrolled ? "header-hero" : ""}`}>
    <div className="header-inner">
      <Link className="logo" to="/" aria-label="Cultgig home"><span className="logo-text">Cultgig</span><span className="logo-badge">Creative connections</span></Link>
      <nav aria-label="Primary navigation" className="header-nav">{primaryNavigation.map((item) => <Link key={item.path} to={item.path} className={currentPath === item.path ? "active" : ""}>{item.label}</Link>)}</nav>
      <div className="header-actions"><Button variant="primary" onClick={() => openLead("business")}>Get Early Access</Button></div>
      <IconButton label="Open navigation menu" className="menu-button" onClick={() => setOpen(true)}><Menu size={22} /></IconButton>
    </div>
    {open && <aside ref={ref} className="drawer" aria-label="Mobile navigation"><div className="drawer-header"><Link className="logo" to="/" onClick={() => setOpen(false)}>Cultgig</Link><IconButton label="Close navigation menu" onClick={() => setOpen(false)}><X size={20} /></IconButton></div><div className="drawer-links">{primaryNavigation.map((item) => <Link key={item.path} to={item.path} onClick={() => setOpen(false)}>{item.label}</Link>)}<div className="drawer-divider" />{mobileExtras.map((item) => <Link key={item.path} to={item.path} onClick={() => setOpen(false)}>{item.label}</Link>)}</div><div className="drawer-actions"><Button variant="outline" onClick={() => { setOpen(false); openLead("artist"); }}>Join as an Artist</Button><Button onClick={() => { setOpen(false); openLead("business"); }}>Get Early Access</Button></div></aside>}
  </header>;
}
