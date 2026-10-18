import { Link } from "react-router-dom";
import Logo from "./Logo";
import { navLinks, site } from "../config/site";
import { solutions } from "../data/solutions";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p className="footer-tagline">{site.tagline}</p>
            <p className="muted small">{site.positioning}</p>
          </div>
          <div>
            <h3 className="footer-h">Company</h3>
            <ul className="footer-list">
              <li><Link to="/">Home</Link></li>
              {navLinks.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3 className="footer-h">Solutions</h3>
            <ul className="footer-list">
              {solutions.map((s) => <li key={s.id}><Link to={`/solutions#${s.id}`}>{s.title}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3 className="footer-h">Contact</h3>
            <ul className="footer-list">
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><Link to="/contact">Start a conversation</Link></li>
              <li><Link to="/contact?intent=discovery-call">Book a discovery call</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Forge AI. All rights reserved.</span>
          <Link to="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
