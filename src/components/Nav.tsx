import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import Button from "./Button";
import { consultationHref, navLinks } from "../config/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`nav ${scrolled || open ? "scrolled" : ""}`}>
      <div className="container wide nav-inner">
        <Logo />
        <nav className="nav-links" aria-label="Primary" onMouseLeave={() => setHovered(null)}>
          {navLinks.map((l) => {
            const active = pathname.startsWith(l.to);
            return (
              <NavLink key={l.to} to={l.to} className={`nav-link ${active ? "active" : ""}`} onMouseEnter={() => setHovered(l.to)}>
                {hovered === l.to && (
                  <motion.span layoutId="nav-hover" className="nav-hover" transition={{ type: "spring", bounce: 0.15, duration: 0.4 }} />
                )}
                <span className="nav-link-text">{l.label}</span>
                {active && <motion.span layoutId="nav-active" className="nav-active" transition={{ type: "spring", bounce: 0.15, duration: 0.5 }} />}
              </NavLink>
            );
          })}
        </nav>
        <div className="nav-cta">
          <Button to={consultationHref} size="sm">Book a Consultation</Button>
        </div>
        <button
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav aria-label="Mobile">
              {navLinks.map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 * i, duration: 0.3 }}>
                  <NavLink to={l.to} className={({ isActive }) => `mobile-link ${isActive ? "active" : ""}`}>{l.label}</NavLink>
                </motion.div>
              ))}
            </nav>
            <Button to={consultationHref} arrow className="btn-block">Book a Consultation</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
