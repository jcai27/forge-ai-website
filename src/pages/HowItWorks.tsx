import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Layers, Gauge, Target } from "lucide-react";
import PageHero from "../components/PageHero";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import CTABand from "../components/CTABand";
import { phases, processSteps } from "../data/process";
import { discoveryCallHref } from "../config/site";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const principles = [
  { icon: Target, title: "Start with one well-scoped workflow", body: "We pick a single, high-value workflow, prove it works in your business, and expand from there. No sprawling transformation projects." },
  { icon: Gauge, title: "Measurable success criteria", body: "Before we build, we agree on what success looks like — time saved, errors reduced, turnaround improved — and measure against it." },
  { icon: Layers, title: "Incremental implementation", body: "Small, testable releases mean you see value early, risk stays low, and every step is shaped by real feedback." },
];

const faqs = [
  { q: "Do we need technical expertise to work with you?", a: "No. You bring knowledge of how your business runs; we handle the technical design, integration, and maintenance. We explain everything in plain language and make sure your team is comfortable with what we build." },
  { q: "What tools and systems can you integrate with?", a: "Most modern business software exposes an API, webhook, or export we can work with — CRMs, ERPs, accounting, help desks, spreadsheets, email, chat, and databases. During the feasibility assessment we confirm exactly what's possible with your stack before anything is scoped." },
  { q: "How long does a project take?", a: "It depends on the workflow and the systems involved. Because we start with one well-scoped workflow, first phases are intentionally small. You'll get a scoped timeline in the proposal before any build work begins." },
  { q: "Will AI make decisions without our team's input?", a: "Only where you want it to, and only within limits you set. We design human approval steps for consequential actions, log every automated action, and route uncertain cases to people." },
  { q: "How do you handle our data and security?", a: "We follow least-privilege access, work within your existing systems where possible, and agree on data handling, retention, and access requirements up front. Security and privacy needs are part of the feasibility assessment, not an afterthought." },
  { q: "What happens after launch?", a: "We monitor performance, fix issues, and refine the workflow as your business changes. When you're ready, we extend what's working to the next opportunity." },
];

function FaqItem({ q, a, open, onToggle, id }: { q: string; a: string; open: boolean; onToggle: () => void; id: string }) {
  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <h3>
        <button className="faq-q" aria-expanded={open} aria-controls={`${id}-a`} id={`${id}-q`} onClick={onToggle}>
          <span>{q}</span>
          <ChevronDown size={18} className="faq-chevron" aria-hidden="true" />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-a`}
            role="region"
            aria-labelledby={`${id}-q`}
            className="faq-a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HowItWorks() {
  useDocumentTitle("How It Works", "Forge AI's engagement process: discovery, design, build, and continuous improvement — starting with one well-scoped workflow.");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={<>From bottleneck <span className="gradient-text">to breakthrough.</span></>}
        lead="A clear, incremental engagement designed to deliver working automation quickly — without disrupting how your business runs today. No technical expertise required."
      >
        <div className="stage-strip">
          {processSteps.map((s) => (
            <div key={s.num} className="stage-chip"><span className="mono">{s.num}</span>{s.title}</div>
          ))}
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="The engagement" title="Seven steps, one at a time." lead="Every engagement follows the same path, scaled to the size of the problem. Each step ends with something concrete you can review." />
          <ol className="timeline">
            {phases.map((p, i) => (
              <Reveal key={p.title} as="li" className="timeline-item">
                <div className="timeline-marker">
                  <span className="icon-tile"><p.icon size={20} strokeWidth={1.75} /></span>
                  {i < phases.length - 1 && <span className="timeline-line" aria-hidden="true" />}
                </div>
                <div className="timeline-content card">
                  <div className="timeline-meta">
                    <span className="mono muted">Step {String(i + 1).padStart(2, "0")}</span>
                    <span className="stage-tag">{p.stage}</span>
                  </div>
                  <h3 className="h3">{p.title}</h3>
                  <p className="muted">{p.body}</p>
                  <ul className="check-list">
                    {p.activities.map((a) => <li key={a}><Check size={14} strokeWidth={2.5} aria-hidden="true" />{a}</li>)}
                  </ul>
                  <div className="deliverable"><span className="eyebrow-sm">You get</span>{p.youGet}</div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeader eyebrow="Our approach" title="Small steps. Clear results." />
          <div className="grid-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="card">
                <span className="icon-tile"><p.icon size={20} strokeWidth={1.75} /></span>
                <h3 className="h4">{p.title}</h3>
                <p className="muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container faq-layout">
          <Reveal className="faq-intro">
            <span className="eyebrow">FAQ</span>
            <h2 className="h2">Questions we hear often.</h2>
            <p className="muted">Something else on your mind? Ask us directly — a first conversation is a good place to figure out whether we're the right fit.</p>
            <Button to={discoveryCallHref} arrow className="btn-sm">Book a Discovery Call</Button>
          </Reveal>
          <Reveal delay={0.1} className="faq-list">
            {faqs.map((f, i) => (
              <FaqItem key={f.q} id={`faq-${i}`} q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
