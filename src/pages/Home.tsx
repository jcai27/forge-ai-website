import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Clock, Unplug, TrendingUp, Code2, Puzzle, Plug, ShieldCheck } from "lucide-react";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import WorkflowConsole from "../components/WorkflowConsole";
import WorkflowDemo from "../components/WorkflowDemo";
import CTABand from "../components/CTABand";
import { heroFlow } from "../data/flows";
import { solutions } from "../data/solutions";
import { processSteps } from "../data/process";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const ease = [0.22, 1, 0.36, 1] as const;

const problems = [
  { icon: Clock, title: "Too much manual work", body: "Hours disappear into data entry, copy-and-paste, inbox triage, and chasing approvals." },
  { icon: Unplug, title: "Too many disconnected tools", body: "Your CRM, spreadsheets, accounting, and inbox each hold part of the picture — and none of them talk." },
  { icon: TrendingUp, title: "Not enough time to grow", body: "When the team is buried in busywork, the work that actually moves the business keeps getting pushed." },
];

const differentiators = [
  { icon: Code2, title: "Engineering-first execution", body: "We are engineers, not slide-deck consultants. We design, build, test, and own the systems we deliver." },
  { icon: Puzzle, title: "Tailored to existing workflows", body: "We learn how your business actually operates and fit the automation to it — not the other way around." },
  { icon: Plug, title: "Integrations with existing tools", body: "We connect the software you already pay for instead of asking your team to adopt yet another platform." },
  { icon: ShieldCheck, title: "Human oversight and reliability", body: "Approval steps, audit trails, monitoring, and graceful fallbacks are built in from the first version." },
];

const systems = ["Email", "Spreadsheets", "CRM", "ERP", "Accounting", "Slack & Teams", "Help desk", "Databases"];

export default function Home() {
  useDocumentTitle();

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="container">
          <div className="hero-copy">
            <motion.span className="eyebrow pill" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
              <span className="pulse-dot" /> AI-Powered Business Operations
            </motion.span>
            <motion.h1 className="display" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.08, ease }}>
              Your operations.<br />
              <span className="gradient-text">On autopilot.</span>
            </motion.h1>
            <motion.p className="lead lg" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.18, ease }}>
              From everyday busywork to complex workflows, Forge AI builds intelligent systems that help your business run faster, leaner, and smarter.
            </motion.p>
            <motion.div className="btn-row center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.28, ease }}>
              <Button to="/contact" arrow>Let's Talk</Button>
              <Button to="/solutions" variant="secondary">Explore Solutions</Button>
            </motion.div>
          </div>

          <motion.div className="hero-visual" initial={{ opacity: 0, y: 40, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.1, delay: 0.35, ease }}>
            <div className="hero-visual-glow" aria-hidden="true" />
            <WorkflowConsole flow={heroFlow} windowTitle="Forge Ops" />
          </motion.div>

          <Reveal className="systems-row">
            <span className="muted small">Built to connect the systems you already run on</span>
            <ul>{systems.map((s) => <li key={s}>{s}</li>)}</ul>
          </Reveal>
        </div>
      </section>

      {/* Problem */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="The problem"
            title="Your team wasn't hired to do busywork."
            lead="Most businesses run on a patchwork of software held together by people — re-typing orders, reconciling spreadsheets, and forwarding emails between systems that should already be connected. It works, until it doesn't scale."
          />
          <div className="grid-3">
            {problems.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="card problem-card">
                <span className="icon-tile muted-tile"><p.icon size={20} strokeWidth={1.75} /></span>
                <h3 className="h4">{p.title}</h3>
                <p className="muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="transition-line">
            <span className="transition-rule" aria-hidden="true" />
            <p>
              Forge AI replaces those manual hand-offs with <strong>reliable, connected systems</strong> — so routine work runs on its own and your team gets its time back.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Solutions */}
      <section className="section" id="solutions">
        <div className="container">
          <SectionHeader
            eyebrow="Solutions"
            title="What can we take off your plate?"
            lead="Six ways we help businesses replace repetitive operational work with systems that run reliably in the background."
          />
          <div className="grid-3 solutions-grid">
            {solutions.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 0.08} className="card solution-card" as="article">
                <span className="icon-tile"><s.icon size={20} strokeWidth={1.75} /></span>
                <h3 className="h4">{s.title}</h3>
                <p className="muted">{s.short}</p>
                <ul className="check-list">
                  {s.examples.map((e) => <li key={e}><Check size={14} strokeWidth={2.5} aria-hidden="true" />{e}</li>)}
                </ul>
                <div className="card-links">
                  <Link to={`/solutions#${s.id}`} className="text-link">Learn more <ArrowRight size={14} aria-hidden="true" /></Link>
                  <Link to={`/contact?solution=${s.id}`} className="text-link subtle">Discuss <ArrowUpRight size={14} aria-hidden="true" /></Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Demo */}
      <section className="section section-alt" id="demo">
        <div className="container">
          <SectionHeader
            align="center"
            eyebrow="Interactive demo"
            title="See what automation actually looks like."
            lead="Pick a use case to watch an example workflow run step by step — including the points where a person stays in control."
          />
          <Reveal><WorkflowDemo /></Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="How it works"
            title="From bottleneck to breakthrough."
            lead="A clear, incremental process. You bring the knowledge of your business — we handle the technical side."
          />
          <ol className="process-grid">
            {processSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} as="li" className="process-step">
                <span className="process-num mono">{s.num}</span>
                <span className="process-bar" aria-hidden="true" />
                <h3 className="h4">{s.title}</h3>
                <p className="muted">{s.body}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="note-row">
            <span className="note-badge"><Check size={14} strokeWidth={2.5} /></span>
            <p><strong>No technical expertise needed to get started.</strong> If you can describe what your team does each day, we can take it from there.</p>
            <Link to="/how-it-works" className="text-link">See the full process <ArrowRight size={14} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>

      {/* Why Forge */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeader
            eyebrow="Why Forge AI"
            title={<>Built around your business.<br className="br-lg" /> Not the other way around.</>}
          />
          <div className="grid-2">
            {differentiators.map((d, i) => (
              <Reveal key={d.title} delay={(i % 2) * 0.08} className="card diff-card">
                <span className="icon-tile"><d.icon size={20} strokeWidth={1.75} /></span>
                <div>
                  <h3 className="h4">{d.title}</h3>
                  <p className="muted">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="section">
        <div className="container about-preview">
          <Reveal className="about-preview-copy">
            <span className="eyebrow">About</span>
            <h2 className="h2">A founder-led engineering company.</h2>
            <p className="lead">
              Forge AI is built on hands-on experience in machine learning, software development, and the operational systems businesses depend on — from AI agents and ERP integrations to forecasting and inventory workflows.
            </p>
            <p className="muted">
              We work directly with the people who run your operations, and the person who scopes your project is the person who builds it.
            </p>
            <Link to="/about" className="text-link">Meet Forge AI <ArrowRight size={14} aria-hidden="true" /></Link>
          </Reveal>
          <Reveal delay={0.1} className="about-preview-panel">
            {[
              ["Foundation", "Computer science & statistics, UC Berkeley · Business analytics, MIT"],
              ["Experience", "AI agents, ERP integrations, and process automation for food distribution"],
              ["Focus", "Practical, reliable systems for startups and growing businesses"],
            ].map(([k, v]) => (
              <div key={k} className="kv-row">
                <span className="eyebrow-sm">{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
