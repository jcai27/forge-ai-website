import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { AppFrame, IllustrativeTag, Pill, type Tone } from "./Primitives";

const rows: { name: string; trigger: string; runs: number; ok: string; p50: string; tone: Tone; status: string }[] = [
  { name: "Order intake", trigger: "email · orders@", runs: 312, ok: "99.4%", p50: "4.1s", tone: "ok", status: "Healthy" },
  { name: "Invoice matching", trigger: "email · ap@", runs: 148, ok: "97.9%", p50: "6.8s", tone: "ok", status: "Healthy" },
  { name: "Inquiry triage", trigger: "help desk webhook", runs: 96, ok: "—", p50: "3.2s", tone: "warn", status: "2 awaiting review" },
  { name: "CRM ↔ accounting sync", trigger: "every 5 min", runs: 288, ok: "100%", p50: "1.9s", tone: "ok", status: "Healthy" },
  { name: "ERP inventory sync", trigger: "webhook", runs: 205, ok: "98.5%", p50: "2.4s", tone: "run", status: "Retrying (1/3)" },
  { name: "Weekly ops summary", trigger: "Mon 07:00", runs: 1, ok: "100%", p50: "38s", tone: "idle", status: "Scheduled" },
];

/** Illustrative monitoring view: workflow health, throughput, and items needing attention. */
export default function MonitoringPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 1800);
    return () => window.clearInterval(id);
  }, [inView]);

  return (
    <div ref={ref}>
      <AppFrame
        crumbs={["Demo workspace", "Monitoring"]}
        right={<><IllustrativeTag>Sample data</IllustrativeTag><span className="pv-meta mono">last 24h</span></>}
        description="Illustration of a monitoring dashboard with sample data: six workflows listed with trigger, runs in the last 24 hours, success rate, median duration, and status, including items awaiting human review and a sync that is retrying."
      >
        <div className="mon">
          <div className="mon-stats">
            <div><span>Runs (24h)</span><b className="mono">{(1050 + tick).toLocaleString()}</b></div>
            <div><span>Needs attention</span><b className="mono">3</b></div>
            <div><span>Open approvals</span><b className="mono">2</b></div>
            <div><span>Active alerts</span><b className="mono">1</b></div>
          </div>
          <div className="pv-table mon-table">
            <div className="pv-tr pv-th mon-tr"><span>Workflow</span><span>Runs</span><span>Success</span><span>p50</span><span>Status</span></div>
            {rows.map((r, i) => (
              <div key={r.name} className="pv-tr mon-tr">
                <span className="pv-sys"><span><b>{r.name}</b><small>{r.trigger}</small></span></span>
                <span className="mono">{r.runs + (i === 0 ? tick : 0)}</span>
                <span className="mono">{r.ok}</span>
                <span className="mono">{r.p50}</span>
                <span><Pill tone={r.tone}>{r.status}</Pill></span>
              </div>
            ))}
          </div>
        </div>
      </AppFrame>
    </div>
  );
}
