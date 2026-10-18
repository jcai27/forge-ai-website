import { Link } from "react-router-dom";
import Logo from "./Logo";
import SmartLink from "./SmartLink";
import { consultationHref, navLinks, site } from "../config/site";
import { solutions } from "../data/solutions";

export default function Footer() {
  return (
    <footer className="footer night">
      <div className="container wide">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo inverse />
            <p className="footer-tagline">{site.positioning}</p>
            <a className="footer-email" href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <nav aria-label="Company">
            <h2 className="footer-h">Company</h2>
            <ul className="footer-list">
              {navLinks.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}
            </ul>
          </nav>
          <nav aria-label="Solutions">
            <h2 className="footer-h">Solutions</h2>
            <ul className="footer-list">
              {solutions.map((s) => <li key={s.id}><Link to={`/solutions#${s.id}`}>{s.title}</Link></li>)}
            </ul>
          </nav>
          <nav aria-label="Get started">
            <h2 className="footer-h">Get started</h2>
            <ul className="footer-list">
              <li><SmartLink to={consultationHref}>Book a consultation</SmartLink></li>
              <li><Link to="/contact">Describe a workflow</Link></li>
              <li><Link to="/how-it-works">Engagement process</Link></li>
            </ul>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Forge AI. All rights reserved.</span>
          <div className="footer-legal">
            <Link to="/privacy">Privacy</Link>
            <span className="footer-tag">{site.tagline}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
