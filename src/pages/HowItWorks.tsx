import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import PageHero from "../components/PageHero";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import FinalCTA from "../components/FinalCTA";
import ProcessTimeline from "../components/home/ProcessTimeline";
import { phases } from "../data/process";
import { consultationHref } from "../config/site";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const principles = [
  { title: "Start with one well-scoped workflow", body: "We pick a single high-value workflow, prove it works in your business, and expand from there. No sprawling transformation programs." },
  { title: "Measurable success criteria", body: "Before we build, we agree on what success looks like and how it will be measured — then we report against it." },
  { title: "Incremental implementation", body: "Small, testable releases mean you see value early, risk stays low, and every step is shaped by real feedback." },
];

const faqs = [
  { q: "Do we need technical expertise to work with you?", a: "No. You bring knowledge of how your business runs; we handle technical design, integration, and maintenance. We explain everything in plain language and make sure your team is comfortable with what we build." },
  { q: "Which tools and systems can you integrate with?", a: "Most modern business software exposes an API, webhook, or export we can work with — CRMs, ERPs, accounting, help desks, spreadsheets, email, chat, and databases. During the feasibility assessment we confirm exactly what's possible with your stack before anything is scoped." },
  { q: "How long does a project take?", a: "It depends on the workflow and the systems involved. Because we start with one well-scoped workflow, first phases are intentionally small. You'll receive a scoped timeline in the proposal before any build work begins." },
  { q: "Will AI make decisions without our team's input?", a: "Only where you want it to, and only within limits you set. We design approval steps for consequential actions, log every automated action, and route uncertain cases to people." },
  { q: "How do you handle our data and security?", a: "We follow least-privilege access, work within your existing systems where possible, and agree on data handling, retention, and access requirements up front. Security and privacy are part of the feasibility assessment, not an afterthought." },
  { q: "What happens after launch?", a: "We monitor performance against the agreed criteria, fix issues, and refine the workflow as your business changes. When you're ready, we extend what's working to the next opportunity." },
];

function FaqItem({ q, a, open, onToggle, id }: { q: string; a: string; open: boolean; onToggle: () => void; id: string }) {
  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <h3>
        <button className="faq-q" aria-expanded={open} aria-controls={`${id}-a`} id={`${id}-q`} onClick={onToggle}>
          <span>{q}</span>
          <Plus size={18} className="faq-chevron" aria-hidden="true" />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} className="faq-a"
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            <p>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HowItWorks() {
  useDocumentTitle("How It Works", "Forge AI's engagement process — discover, design, deploy, improve — starting with one well-scoped workflow and measurable success criteria.");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <PageHero
        label="How it works"
        title="From first conversation to production workflows."
        lead="A clear, incremental engagement designed to deliver working automation without disrupting how your business runs today. No technical expertise required."
      >
        <div className="btn-row">
          <Button to={consultationHref} arrow>Book a Consultation</Button>
        </div>
      </PageHero>

      <section className="section">
        <div className="container wide">
          <SectionHeader index="01" label="Overview" layout="split" title="Four stages. Each ends with something you can review."
            lead="The same path for every engagement, scaled to the size of the problem." />
          <ProcessTimeline />
        </div>
      </section>

      <section className="section sunken">
        <div className="container wide">
          <SectionHeader index="02" label="In detail" layout="split" title="What happens at every step."
            lead="Seven concrete steps sit inside the four stages. You'll always know where we are, what we're doing, and what you'll receive." />
          <ol className="phase-list">
            {phases.map((p, i) => (
              <Reveal as="li" key={p.title} className="phase-row">
                <div className="phase-meta">
                  <span className="mono phase-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="phase-stage">{p.stage}</span>
                </div>
                <div className="phase-main">
                  <h3 className="h3"><p.icon size={18} strokeWidth={1.7} aria-hidden="true" />{p.title}</h3>
                  <p className="muted">{p.body}</p>
                </div>
                <div className="phase-side">
                  <ul className="dash-list">{p.activities.map((a) => <li key={a}>{a}</li>)}</ul>
                  <div className="phase-get"><span className="label">You get</span><span>{p.youGet}</span></div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container wide">
          <SectionHeader index="03" label="Principles" title="Small steps. Clear results." />
          <div className="principle-row">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06} className="principle-light">
                <span className="mono principle-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h4">{p.title}</h3>
                <p className="muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section sunken">
        <div className="container wide faq-layout">
          <Reveal className="faq-intro">
            <span className="label"><span className="label-index">04</span><span aria-hidden="true">—</span>FAQ</span>
            <h2 className="h2">Questions we hear often.</h2>
            <p className="muted">Something else on your mind? A first conversation is a good place to find out whether we're the right fit.</p>
            <Button to={consultationHref} size="sm" arrow>Book a Consultation</Button>
          </Reveal>
          <Reveal delay={0.1} className="faq-list">
            {faqs.map((f, i) => (
              <FaqItem key={f.q} id={`faq-${i}`} q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
