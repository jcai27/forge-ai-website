import { ArrowRight, Wrench, Eye, Handshake, Scale, Rocket, Utensils, Store, Building2, Briefcase, Network } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import CTABand from "../components/CTABand";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const principles = [
  { icon: Wrench, title: "Practical over impressive", body: "We choose the simplest approach that solves the problem reliably — sometimes AI, sometimes a well-built integration, sometimes a process change." },
  { icon: Eye, title: "Transparent by default", body: "Every system we build logs what it does and why. You should never have to guess what your automation did overnight." },
  { icon: Handshake, title: "Ownership of hard problems", body: "We take responsibility for the messy parts — edge cases, legacy systems, unreliable data — rather than handing them back to your team." },
  { icon: Scale, title: "People stay in charge", body: "Automation should support your team's judgment, not replace it. Consequential decisions stay with the people accountable for them." },
];

const audiences = [
  { icon: Rocket, title: "Early-stage startups", body: "Scale operations without scaling headcount at the same rate." },
  { icon: Building2, title: "Small & medium businesses", body: "Take on the administrative load that quietly consumes the week." },
  { icon: Utensils, title: "Restaurants, hospitality & food distribution", body: "Orders, inventory, suppliers, and scheduling with many moving parts." },
  { icon: Briefcase, title: "Service businesses", body: "Customer communication, scheduling, and back-office coordination." },
  { icon: Network, title: "Growing organizations", body: "Fragmented software and manual processes that no longer keep up." },
  { icon: Store, title: "And beyond", body: "If your team repeats the same operational work every week, we'd like to hear about it." },
];

export default function About() {
  useDocumentTitle("About", "Forge AI is a founder-led engineering company building practical AI and automation systems for business operations.");

  return (
    <>
      <PageHero
        eyebrow="About Forge AI"
        title={<>Engineers who understand <span className="gradient-text">operations.</span></>}
        lead="Forge AI is a founder-led engineering company. We help businesses identify, design, implement, and maintain the systems that take repetitive operational work off their teams' plates."
      />

      <section className="section">
        <div className="container story">
          <Reveal className="story-copy">
            <span className="eyebrow">Our story</span>
            <h2 className="h2">Built from inside real operations.</h2>
            <p className="lead">
              Forge AI grew out of hands-on work building software for businesses where operations are the business — food distributors managing orders, inventory, and suppliers every single day.
            </p>
            <p className="muted">
              That work spanned AI agents, ERP integrations, business process automation, demand forecasting, inventory workflows, and operational analytics. It made one thing clear: the biggest gains rarely come from flashy technology. They come from carefully connecting the systems a business already depends on and removing the manual work in between.
            </p>
            <p className="muted">
              Forge AI exists to bring that same engineering discipline to startups and growing businesses that don't have an internal team to build it — and that need a partner who will understand their business and take ownership of the difficult parts.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="about-preview-panel">
            {[
              ["Education", "Computer Science & Statistics, UC Berkeley"],
              ["", "Master of Business Analytics, MIT"],
              ["Background", "Software engineering · AI agents · ERP integrations"],
              ["", "Process automation · Forecasting · Inventory workflows · Operational analytics"],
              ["Model", "Founder-led — the person who scopes your project builds it"],
            ].map(([k, v], i) => (
              <div key={i} className={`kv-row ${k ? "" : "kv-cont"}`}>
                <span className="eyebrow-sm">{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeader eyebrow="Principles" title="How we work." />
          <div className="grid-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.08} className="card diff-card">
                <span className="icon-tile"><p.icon size={20} strokeWidth={1.75} /></span>
                <div>
                  <h3 className="h4">{p.title}</h3>
                  <p className="muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Who we help" title="Built for teams with more work than hands." lead="Our work spans industries. What our customers share is repetitive operational work and a desire to spend their time on something better." />
          <div className="grid-3">
            {audiences.map((a, i) => (
              <Reveal key={a.title} delay={(i % 3) * 0.06} className="card audience-card">
                <a.icon size={20} strokeWidth={1.75} className="accent-icon" aria-hidden="true" />
                <h3 className="h5">{a.title}</h3>
                <p className="muted small">{a.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="note-row">
            <p>Curious what we'd build for a business like yours?</p>
            <Link to="/solutions" className="text-link">Explore solutions <ArrowRight size={14} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
