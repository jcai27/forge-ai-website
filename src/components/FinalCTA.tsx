import { Check } from "lucide-react";
import Button from "./Button";
import Reveal from "./Reveal";
import { consultationHref, site } from "../config/site";

interface Props {
  title?: string;
  copy?: string;
}

export default function FinalCTA({
  title = "Build a business that runs smarter.",
  copy = "Tell us where your operations are slowing down. We'll explore what can be automated and what meaningful improvements could look like.",
}: Props) {
  return (
    <section className="final-cta night">
      <div className="final-cta-art" aria-hidden="true">
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 9 }, (_, i) => (
            <circle key={i} cx="600" cy="640" r={140 + i * 70} className="fca-ring" style={{ opacity: 0.9 - i * 0.09 }} />
          ))}
          <line x1="0" y1="640" x2="1200" y2="640" className="fca-horizon" />
        </svg>
      </div>
      <div className="container final-cta-inner">
        <Reveal>
          <span className="label">Start a conversation</span>
          <h2 className="final-cta-title">{title}</h2>
          <p className="lead">{copy}</p>
          <div className="btn-row center">
            <Button to="/contact" variant="inverse" arrow>Talk to Forge AI</Button>
            <Button to={consultationHref} variant="inverse-secondary">Book a Consultation</Button>
          </div>
          <ul className="final-cta-points">
            <li><Check size={14} aria-hidden="true" /> A focused conversation about your workflows</li>
            <li><Check size={14} aria-hidden="true" /> An honest view of what's worth automating</li>
            <li><Check size={14} aria-hidden="true" /> No obligation</li>
          </ul>
          <a className="final-cta-mail mono" href={`mailto:${site.email}`}>{site.email}</a>
        </Reveal>
      </div>
    </section>
  );
}
