import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import FinalCTA from "../components/FinalCTA";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const principles = [
  { title: "Practical over impressive", body: "We choose the simplest approach that solves the problem reliably — sometimes AI, sometimes a well-built integration, sometimes a process change." },
  { title: "Transparent by default", body: "Every system we build records what it does and why. You should never have to guess what your automation did overnight." },
  { title: "Ownership of hard problems", body: "We take responsibility for the messy parts — edge cases, legacy systems, unreliable data — rather than handing them back to your team." },
  { title: "People stay in charge", body: "Automation should support your team's judgment, not replace it. Consequential decisions stay with the people accountable for them." },
];

const audiences = [
  ["Growing startups", "Scale operations without scaling headcount at the same rate."],
  ["Small and mid-sized businesses", "Take on the administrative load that quietly consumes the week."],
  ["Restaurants, hospitality, and food distribution", "Orders, inventory, suppliers, and scheduling with many moving parts."],
  ["Service businesses", "Customer communication, scheduling, and back-office coordination."],
  ["Established organizations", "Fragmented software and manual processes that no longer keep up."],
];

const facts = [
  ["Model", "Founder-led engineering company"],
  ["Education", "Computer science & statistics, UC Berkeley"],
  ["", "Master of Business Analytics, MIT"],
  ["Experience", "Software engineering, AI agents, ERP integrations, process automation"],
  ["", "Forecasting, inventory workflows, operational analytics"],
];

export default function About() {
  useDocumentTitle("About", "Forge AI is a founder-led engineering company building AI-powered operational infrastructure for modern businesses.");

  return (
    <>
      <PageHero
        label="About"
        title="Engineers who understand operations."
        lead="Forge AI helps businesses identify, design, implement, and maintain the systems that take repetitive operational work off their teams — built with the rigor of production software."
      />

      <section className="section">
        <div className="container wide story">
          <Reveal className="story-copy">
            <span className="label"><span className="label-index">01</span><span aria-hidden="true">—</span>Our story</span>
            <h2 className="h2">Built from inside real operations.</h2>
            <p className="lead">
              Forge AI grew out of hands-on work building software for businesses where operations are the business — food distributors managing orders, inventory, and suppliers every day.
            </p>
            <p>
              That work spanned AI agents, ERP integrations, business process automation, demand forecasting, inventory workflows, and operational analytics. It made one thing clear: the biggest gains rarely come from flashy technology. They come from carefully connecting the systems a business already depends on and removing the manual work in between.
            </p>
            <p>
              Forge AI brings that engineering discipline to businesses that need a partner who will understand how they operate — and take ownership of the difficult parts.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="facts">
            {facts.map(([k, v], i) => (
              <div key={i} className={`fact ${k ? "" : "cont"}`}>
                <span className="label">{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section sunken">
        <div className="container wide">
          <SectionHeader index="02" label="Principles" title="How we work." />
          <div className="principle-grid">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.06} className="principle-light">
                <span className="mono principle-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h4">{p.title}</h3>
                <p className="muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container wide">
          <SectionHeader index="03" label="Who we help" layout="split" title="Built for teams with more work than hands."
            lead="Our work spans industries. What our customers share is repetitive operational work — and the ambition to spend their time on something better." />
          <ul className="audience-list">
            {audiences.map(([t, b], i) => (
              <Reveal as="li" key={t} delay={i * 0.04} className="audience-row">
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h4">{t}</h3>
                <p className="muted">{b}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal className="inline-link-row">
            <Link to="/solutions" className="text-link">Explore solutions <ArrowRight size={14} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
