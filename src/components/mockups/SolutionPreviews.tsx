import { useEffect, useRef, useState, type ComponentType } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail, Sparkles, Search, Split, BookCheck, Hand, ScrollText, ArrowLeftRight, ArrowRight, ArrowLeft, Check, Lock,
  MessageSquare, PenTool, ShieldCheck, GitPullRequest, FolderGit2, ListChecks, FlaskConical, EyeOff, TrendingUp, TrendingDown,
} from "lucide-react";
import type { PreviewKey } from "../../data/solutions";
import { AppFrame, IllustrativeTag, MockButton, Pill } from "./Primitives";
import AnalyticsChart from "./AnalyticsChart";

const ease = [0.16, 1, 0.3, 1] as const;
const stagger = (i: number, base = 0.08) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.1 + i * base, duration: 0.45, ease },
});

/** Ticks while the element is on screen; used for small "live" details. */
function useTicker(ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => setT((v) => v + 1), ms);
    return () => window.clearInterval(id);
  }, [inView, ms]);
  return { ref, t };
}

/* -------------------------------------------------------------------------- */
/* Workflow builder                                                           */
/* -------------------------------------------------------------------------- */
function BuilderPreview() {
  const { ref, t } = useTicker(1400);
  const active = t % 5;
  const steps = [
    { icon: Mail, kind: "Trigger", title: "When an email arrives", detail: <><code>to: ap@</code> · <code>has: pdf</code></> },
    { icon: Sparkles, kind: "Agent", title: "Extract invoice fields", chips: ["vendor", "invoice_no", "total", "po_number", "due_date"] },
    { icon: Search, kind: "Lookup", title: "Match to purchase order", detail: <>accounting · <code>open_pos</code></> },
  ];
  return (
    <div ref={ref}>
      <AppFrame
        crumbs={["Workflows", "Invoice intake"]}
        right={<Pill tone="ok">Active</Pill>}
        description="Illustration of a workflow builder: when an invoice email arrives, an agent extracts its fields, matches it to a purchase order, and either posts it to accounting or routes it to accounts payable for review, with every run logged."
      >
        <div className="pv-builder">
          <div className="pv-flow">
            {steps.map((s, i) => (
              <motion.div key={s.title} className={`pv-step ${active === i ? "is-active" : ""}`} {...stagger(i)}>
                <span className="pv-step-icon"><s.icon size={14} strokeWidth={1.9} /></span>
                <div className="pv-step-body">
                  <span className="pv-kind">{s.kind}</span>
                  <span className="pv-step-title">{s.title}</span>
                  {s.detail && <span className="pv-step-detail">{s.detail}</span>}
                  {s.chips && <span className="pv-chips">{s.chips.map((c) => <code key={c}>{c}</code>)}</span>}
                </div>
              </motion.div>
            ))}
            <motion.div className={`pv-step pv-cond ${active === 3 ? "is-active" : ""}`} {...stagger(3)}>
              <span className="pv-step-icon"><Split size={14} strokeWidth={1.9} /></span>
              <div className="pv-step-body">
                <span className="pv-kind">Condition</span>
                <span className="pv-step-title">If match confidence <code>≥ 0.95</code></span>
              </div>
            </motion.div>
            <motion.div className="pv-branches" {...stagger(4)}>
              <div className={`pv-branch ${active === 4 ? "is-active" : ""}`}>
                <span className="pv-branch-label yes">Yes</span>
                <span className="pv-branch-title"><BookCheck size={13} /> Post to accounting</span>
              </div>
              <div className="pv-branch">
                <span className="pv-branch-label no">No</span>
                <span className="pv-branch-title"><Hand size={13} /> Route to AP review</span>
              </div>
            </motion.div>
            <motion.div className="pv-foot" {...stagger(5)}>
              <ScrollText size={12} /> Every run recorded to the audit trail
            </motion.div>
          </div>
          <div className="pv-side">
            <span className="pv-side-h">Recent runs</span>
            <ul className="pv-runs">
              {[
                ["INV-3381", "Posted", "ok"],
                ["INV-3380", "Posted", "ok"],
                ["INV-3379", "In review", "warn"],
                ["INV-3378", "Posted", "ok"],
                ["INV-3377", "Posted", "ok"],
              ].map(([id, s, tone], i) => (
                <motion.li key={id} {...stagger(i, 0.05)}>
                  <span className="mono">{id}</span>
                  <Pill tone={tone as "ok" | "warn"}>{s}</Pill>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </AppFrame>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Integrations                                                               */
/* -------------------------------------------------------------------------- */
function IntegrationsPreview() {
  const { ref, t } = useTicker(1000);
  const ago = (base: number, period: number) => {
    const s = (base + t) % period;
    return s < 60 ? `${s}s ago` : `${Math.floor(s / 60)}m ago`;
  };
  const rows = [
    { sys: "CRM", objects: "Accounts, deals", dir: ArrowLeftRight, last: ago(4, 30), tone: "ok" as const, status: "Healthy" },
    { sys: "ERP", objects: "Orders, inventory", dir: ArrowLeftRight, last: t % 6 < 2 ? "now" : ago(1, 6), tone: t % 6 < 2 ? ("run" as const) : ("ok" as const), status: t % 6 < 2 ? "Syncing" : "Healthy" },
    { sys: "Accounting", objects: "Invoices, payments", dir: ArrowRight, last: ago(90, 200), tone: "ok" as const, status: "Healthy" },
    { sys: "Email", objects: "orders@, ap@", dir: ArrowLeft, last: "streaming", tone: "ok" as const, status: "Listening" },
    { sys: "Warehouse", objects: "Nightly export", dir: ArrowRight, last: "03:00", tone: "idle" as const, status: "Scheduled" },
  ];
  return (
    <div ref={ref}>
      <AppFrame
        crumbs={["Integrations", "Connections"]}
        right={<span className="pv-meta mono">5 connections</span>}
        description="Illustration of an integrations dashboard listing connections between CRM, ERP, accounting, email, and a data warehouse, each with sync direction, last sync time, and health status, plus a field mapping between CRM accounts and accounting customers."
      >
        <div className="pv-int">
          <div className="pv-table" role="presentation">
            <div className="pv-tr pv-th"><span>System</span><span>Direction</span><span>Last sync</span><span>Status</span></div>
            {rows.map((r, i) => (
              <motion.div key={r.sys} className="pv-tr" {...stagger(i, 0.05)}>
                <span className="pv-sys"><span className="pv-sys-mark">{r.sys[0]}</span><span><b>{r.sys}</b><small>{r.objects}</small></span></span>
                <span className="pv-dir"><r.dir size={13} /></span>
                <span className="mono pv-last">{r.last}</span>
                <span><Pill tone={r.tone}>{r.status}</Pill></span>
              </motion.div>
            ))}
          </div>
          <motion.div className="pv-map" {...stagger(5)}>
            <div className="pv-map-head">
              <span>Field mapping</span>
              <span className="mono">CRM.account → Accounting.customer</span>
            </div>
            {[
              ["account.name", "customer.display_name"],
              ["account.billing_address", "customer.address"],
              ["account.payment_terms", "customer.terms"],
            ].map(([a, b]) => (
              <div key={a} className="pv-map-row">
                <code>{a}</code><ArrowRight size={12} /><code>{b}</code><Check size={12} className="ok" />
              </div>
            ))}
            <div className="pv-event"><Pill tone="ok">Recovered</Pill><span>ERP timeout · retried once · no data lost</span></div>
          </motion.div>
        </div>
      </AppFrame>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Agent execution log                                                        */
/* -------------------------------------------------------------------------- */
function AgentPreview() {
  const trace = [
    { icon: MessageSquare, title: "Message received", body: <q>Can we move Thursday's delivery to Friday morning?</q> },
    { icon: Sparkles, title: "Classified intent", call: "classify(message)", result: "delivery_change · 0.94" },
    { icon: Search, title: "Retrieved account", call: "crm.accounts.get(sender)", result: "2 open orders" },
    { icon: Search, title: "Checked delivery windows", call: "orders.windows(SO-5521)", result: "Fri 8–11am available" },
    { icon: PenTool, title: "Drafted reply", body: <span className="pv-draft">Happy to help — we can move order SO-5521 to Friday between 8 and 11am. Shall I confirm?</span> },
  ];
  return (
    <AppFrame
      crumbs={["Agents", "Inquiry triage", "Run 2,318"]}
      right={<Pill tone="warn">Awaiting approval</Pill>}
      description="Illustration of an AI agent execution trace: the agent classifies a customer message, retrieves the account and delivery options using permitted tools, drafts a reply, and pauses for a person to approve before anything is sent."
    >
      <div className="pv-agent">
        <div className="pv-perms">
          <span className="pv-perms-h">Permissions</span>
          <span className="pv-perm">Read · CRM</span>
          <span className="pv-perm">Read · Orders</span>
          <span className="pv-perm">Draft · Email</span>
          <span className="pv-perm locked"><Lock size={10} /> Send · requires approval</span>
        </div>
        <ol className="pv-trace">
          {trace.map((s, i) => (
            <motion.li key={s.title} {...stagger(i, 0.12)}>
              <span className="pv-trace-icon"><s.icon size={12} strokeWidth={2} /></span>
              <div className="pv-trace-body">
                <span className="pv-trace-title">{s.title}<span className="mono faint">09:41:0{i + 2}</span></span>
                {s.call && <span className="pv-call"><code>{s.call}</code><span>→ {s.result}</span></span>}
                {s.body}
              </div>
            </motion.li>
          ))}
          <motion.li className="pv-gate" {...stagger(5, 0.12)}>
            <span className="pv-trace-icon warn"><ShieldCheck size={12} strokeWidth={2} /></span>
            <div className="pv-trace-body">
              <span className="pv-trace-title">Approval required before sending</span>
              <span className="pv-gate-actions"><MockButton primary>Approve &amp; send</MockButton><MockButton>Edit draft</MockButton></span>
            </div>
          </motion.li>
        </ol>
      </div>
    </AppFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* Operational analytics                                                      */
/* -------------------------------------------------------------------------- */
function AnalyticsPreview() {
  const kpis = [
    { k: "Orders processed", v: "1,284", d: "+6% wk/wk", up: true },
    { k: "Manual touches", v: "96", d: "−18% wk/wk", up: false },
    { k: "On-time fulfillment", v: "97.2%", d: "+0.8 pts", up: true },
  ];
  return (
    <AppFrame
      crumbs={["Analytics", "Weekly operations"]}
      right={<IllustrativeTag>Sample data</IllustrativeTag>}
      description="Illustration of an operational analytics dashboard with sample data: three KPI tiles and a line chart of daily orders with a seven-day forecast band and a flagged unusual dip."
    >
      <div className="pv-analytics">
        <div className="pv-kpis">
          {kpis.map((k, i) => (
            <motion.div key={k.k} className="pv-kpi" {...stagger(i, 0.06)}>
              <span className="pv-kpi-k">{k.k}</span>
              <span className="pv-kpi-v">{k.v}</span>
              <span className="pv-kpi-d">{k.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}{k.d}</span>
            </motion.div>
          ))}
        </div>
        <motion.div {...stagger(3)}><AnalyticsChart /></motion.div>
      </div>
    </AppFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* Hiring work trial                                                          */
/* -------------------------------------------------------------------------- */
function HiringPreview() {
  const stages = ["Applied", "Screen", "Work trial", "Review", "Decision"];
  const current = 3;
  const checks = [
    { icon: FolderGit2, t: "Repository provisioned", d: "isolated · 72h access" },
    { icon: ListChecks, t: "3 scoped issues assigned", d: "migration, API, tests" },
    { icon: GitPullRequest, t: "Pull request submitted", d: "#14 · 9 files" },
    { icon: FlaskConical, t: "Test suite", d: "42 / 42 passing" },
  ];
  const rubric = [
    ["Problem decomposition", "Split the migration into three reviewable commits"],
    ["Code quality", "Typed interfaces; consistent error handling"],
    ["Testing", "Six new tests, including edge cases"],
    ["Communication", "Clear PR description with trade-offs"],
  ];
  return (
    <AppFrame
      crumbs={["Hiring", "Backend Engineer", "Work trial"]}
      right={<Pill tone="info">In review</Pill>}
      description="Illustration of a hiring work-trial review: an anonymized candidate's scoped trial shows a provisioned repository, assigned issues, a submitted pull request and passing tests, alongside an evidence-based rubric summary awaiting scores from human reviewers."
    >
      <div className="pv-hiring">
        <div className="pv-cand">
          <span className="pv-cand-id"><span className="pv-avatar">A</span><span><b>Candidate A-217</b><small><EyeOff size={10} /> Identity hidden during review</small></span></span>
          <ol className="pv-stages">
            {stages.map((s, i) => (
              <li key={s} className={i < current ? "done" : i === current ? "current" : ""}>
                <span className="pv-stage-dot">{i < current && <Check size={9} strokeWidth={3} />}</span>{s}
              </li>
            ))}
          </ol>
        </div>
        <div className="pv-hiring-grid">
          <div className="pv-checks">
            <span className="pv-side-h">Work trial</span>
            {checks.map((c, i) => (
              <motion.div key={c.t} className="pv-check" {...stagger(i, 0.06)}>
                <c.icon size={13} strokeWidth={1.9} />
                <span><b>{c.t}</b><small>{c.d}</small></span>
                <Check size={12} strokeWidth={2.6} className="ok" />
              </motion.div>
            ))}
          </div>
          <div className="pv-rubric">
            <span className="pv-side-h">Evidence summary</span>
            {rubric.map(([k, v], i) => (
              <motion.div key={k} className="pv-rubric-row" {...stagger(i + 2, 0.06)}>
                <span className="pv-rubric-k">{k}</span>
                <span className="pv-rubric-v">{v}</span>
                <span className="pv-score mono">score —</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="pv-note"><ShieldCheck size={13} /> Summaries organize evidence. Hiring decisions are made by people.</div>
      </div>
    </AppFrame>
  );
}

export const previews: Record<PreviewKey, ComponentType> = {
  builder: BuilderPreview,
  integrations: IntegrationsPreview,
  agent: AgentPreview,
  analytics: AnalyticsPreview,
  hiring: HiringPreview,
};
