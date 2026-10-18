import { Check, KeyRound, RefreshCw, ScrollText, FileCode2 } from "lucide-react";
import PageHero from "../components/PageHero";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import FinalCTA from "../components/FinalCTA";
import PlatformDiagram, { layers } from "../components/home/PlatformDiagram";
import WorkflowDemo from "../components/WorkflowDemo";
import MonitoringPreview from "../components/mockups/MonitoringPreview";
import { consultationHref } from "../config/site";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const layerDetail = [
  {
    does: "Detects the events that should start work — a new email, a form submission, a record change, a schedule.",
    practice: ["Inbox and webhook listeners", "Scheduled jobs", "Change detection on records"],
  },
  {
    does: "Handles steps that need reading or judgment, using only the tools and data each agent is granted.",
    practice: ["Document extraction and classification", "Drafting responses from context", "Confidence thresholds that route to people"],
  },
  {
    does: "Encodes how your business works: validation, routing, thresholds, and where a person must approve.",
    practice: ["Business rules and routing logic", "Approval gates with full context", "Escalation paths and SLAs"],
  },
  {
    does: "Records every run so you can see what happened, when, and why — and be alerted when something needs attention.",
    practice: ["Run history and audit trail", "Alerts on failures and anomalies", "Throughput and health monitoring"],
  },
];

const engineering = [
  { icon: KeyRound, title: "Least-privilege access", body: "Each workflow and agent gets only the permissions it needs. Credentials are managed in your environment or a secrets manager — never hard-coded." },
  { icon: RefreshCw, title: "Built to fail safely", body: "Retries, idempotent writes, validation, and dead-letter handling, so a timeout doesn't become duplicated or lost data." },
  { icon: ScrollText, title: "Auditable by design", body: "Inputs, decisions, tool calls, and outputs are logged for every run, giving you a reviewable record of automated work." },
  { icon: FileCode2, title: "Clear ownership", body: "Code, configuration, and data handling are documented and agreed up front, so your systems never become a black box." },
];

export default function Platform() {
  useDocumentTitle("Platform", "The Forge AI orchestration layer: triggers, agents, rules, and observability built into the systems your business already runs.");

  return (
    <>
      <PageHero
        label="Platform"
        title={<>The operating layer behind every Forge AI system.</>}
        lead="Forge AI isn't another tool for your team to adopt. It's a consistent architecture — events, agents, rules, and observability — that we build into your existing systems and operate alongside you."
      >
        <div className="btn-row">
          <Button to={consultationHref} arrow>Book a Consultation</Button>
          <Button to="#demo" variant="secondary">See a workflow run</Button>
        </div>
      </PageHero>

      <section className="section night platform-section">
        <div className="platform-glow" aria-hidden="true" />
        <div className="container wide">
          <SectionHeader index="01" label="Architecture" layout="split"
            title="Your systems in. Completed work out."
            lead="Existing tools stay where they are. The orchestration layer listens for events, does the work, and writes results back — with every step recorded." />
          <Reveal y={24}><PlatformDiagram /></Reveal>
          <p className="muted body-sm platform-disclaimer">Illustrative architecture. Integrations are designed, built, and tested against your systems during each engagement.</p>
        </div>
      </section>

      <section className="section">
        <div className="container wide">
          <SectionHeader index="02" label="Layers" layout="split" title="Four layers, one system."
            lead="Every workflow we build uses the same layers, so behavior is consistent, observable, and easy to extend." />
          <ol className="layer-rows">
            {layers.map((l, i) => (
              <Reveal as="li" key={l.label} className="layer-row" delay={i * 0.04}>
                <span className="layer-num mono">{String(i + 1).padStart(2, "0")}</span>
                <div className="layer-title">
                  <span className="layer-icon"><l.icon size={18} strokeWidth={1.7} /></span>
                  <h3 className="h3">{l.label}</h3>
                </div>
                <p className="layer-does">{layerDetail[i].does}</p>
                <ul className="dash-list">{layerDetail[i].practice.map((p) => <li key={p}>{p}</li>)}</ul>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section sunken" id="demo">
        <div className="container wide">
          <SectionHeader index="03" label="In motion" layout="split" title="See a workflow run, step by step."
            lead="Choose an example to watch events move through the layers — including the moments where a person stays in control." />
          <Reveal><WorkflowDemo /></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container wide split-feature">
          <Reveal className="split-feature-copy">
            <span className="label"><span className="label-index">04</span><span aria-hidden="true">—</span>Observability</span>
            <h2 className="h2">Know what ran, what didn't, and what needs you.</h2>
            <p className="lead">Every workflow reports its health, throughput, and exceptions in one place. Problems surface as alerts — not as a customer complaint a week later.</p>
            <ul className="ticks">
              {["Run history with inputs, decisions, and outputs", "Alerts on failures, retries, and unusual patterns", "A single queue for items awaiting human review"].map((t) => (
                <li key={t}><Check size={14} strokeWidth={2.2} aria-hidden="true" />{t}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}><MonitoringPreview /></Reveal>
        </div>
      </section>

      <section className="section sunken">
        <div className="container wide">
          <SectionHeader index="05" label="Engineering" title="Engineered like the systems it runs on." />
          <div className="eng-grid">
            {engineering.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.05} className="eng-item">
                <e.icon size={18} strokeWidth={1.7} className="eng-icon" aria-hidden="true" />
                <h3 className="h4">{e.title}</h3>
                <p className="muted">{e.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
