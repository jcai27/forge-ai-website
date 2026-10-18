import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  LayoutDashboard, Workflow, Cpu, Plug, Activity, ListChecks, LineChart, Check, Hourglass, Play, GitBranch, Search,
} from "lucide-react";
import { commandFlow } from "../../data/flows";
import { useWorkflowRun, type StepState } from "../../hooks/useWorkflowRun";
import { AppFrame, IllustrativeTag, Pill } from "./Primitives";

/* Graph geometry in design units; the canvas scales to fit its container. */
const W = 760;
const H = 400;
const NW = 128;
const NH = 76;
const pos: [number, number][] = [
  [0, 162], [158, 162], [316, 62], [316, 262], [474, 162], [632, 62], [632, 262],
];
const kinds = ["Trigger", "Agent", "Action", "Action", "Rule", "Action", "Action"];
const edges: [number, number][] = [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4], [4, 5], [4, 6]];

const edgePath = ([a, b]: [number, number]) => {
  const [x1, y1] = [pos[a][0] + NW, pos[a][1] + NH / 2];
  const [x2, y2] = [pos[b][0], pos[b][1] + NH / 2];
  const dx = (x2 - x1) / 2;
  return `M${x1} ${y1} C${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
};

const sideNav = [
  { icon: LayoutDashboard, label: "Overview" },
  { icon: Workflow, label: "Workflows", active: true, count: "12" },
  { icon: Cpu, label: "Agents", count: "4" },
  { icon: Plug, label: "Integrations" },
  { icon: Activity, label: "Runs" },
  { icon: ListChecks, label: "Approvals", badge: "2" },
  { icon: LineChart, label: "Analytics" },
];

function StatusGlyph({ state }: { state: StepState }) {
  if (state === "done") return <span className="g-status done"><Check size={10} strokeWidth={3} /></span>;
  if (state === "active") return <span className="g-status active"><span className="g-pulse" /></span>;
  if (state === "awaiting") return <span className="g-status awaiting"><Hourglass size={9} strokeWidth={2.5} /></span>;
  return <span className="g-status pending" />;
}

export default function HeroCommandCenter() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const inView = useInView(root, { margin: "-5% 0px" });
  const run = useWorkflowRun(commandFlow, { paused: !inView, stepMs: 1150, restartMs: 2400, maxLogs: 7 });

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1.08, (e.contentRect.width - 48) / W)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const steps = commandFlow.steps;
  const edgeState = ([a, b]: [number, number]) => {
    const sa = run.stateOf(a);
    const sb = run.stateOf(b);
    if (sa === "done" && sb === "done") return "done";
    if (sa === "done" && (sb === "active" || sb === "awaiting")) return "flowing";
    return "pending";
  };
  const progress = Math.round((run.cursor / run.total) * 100);

  return (
    <div ref={root}>
      <AppFrame
        className="cc-frame"
        crumbs={["Demo workspace", "Workflows", "Order intake"]}
        right={<><IllustrativeTag /><Pill tone={run.done ? "ok" : "run"}>{run.done ? "Completed" : "Running"}</Pill></>}
        description="Illustration of the Forge AI operations console running an order-intake workflow: an emailed purchase order is extracted by an agent, checked against inventory and the CRM, passed through a review rule, entered into the ERP, and the warehouse is notified. An execution log streams each step."
      >
        <div className="cc">
          <aside className="cc-side">
            <div className="cc-workspace">
              <span className="cc-ws-mark">D</span>
              <span>Demo workspace</span>
            </div>
            <div className="cc-search"><Search size={12} /> Search <kbd>⌘K</kbd></div>
            <ul>
              {sideNav.map((n) => (
                <li key={n.label} className={n.active ? "active" : ""}>
                  <n.icon size={14} strokeWidth={1.8} />
                  <span>{n.label}</span>
                  {n.count && <span className="cc-count">{n.count}</span>}
                  {n.badge && <span className="cc-badge">{n.badge}</span>}
                </li>
              ))}
            </ul>
          </aside>

          <div className="cc-main">
            <div className="cc-toolbar">
              <div className="cc-tabs">
                <span className="active">Canvas</span><span>Runs</span><span>Versions</span><span>Settings</span>
              </div>
              <div className="cc-toolbar-meta">
                <span className="mono"><GitBranch size={11} /> v12 · published</span>
                <span className="mock-run"><Play size={10} fill="currentColor" /> Test run</span>
              </div>
            </div>

            <div className="cc-canvas" ref={canvas}>
              <div className="cc-graph-wrap" style={{ width: W * scale, height: H * scale }}>
              <div className="cc-graph" style={{ width: W, height: H, transform: `scale(${scale})` }}>
                <svg className="cc-edges" width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
                  {edges.map((e) => {
                    const st = edgeState(e);
                    return (
                      <g key={e.join("-")} className={`edge ${st}`}>
                        <path d={edgePath(e)} className="edge-base" />
                        {st !== "pending" && <path d={edgePath(e)} className="edge-fill" />}
                        {st === "flowing" && (
                          <circle r="3.5" className="edge-dot motion-loop">
                            <animateMotion dur="1.1s" repeatCount="indefinite" path={edgePath(e)} />
                          </circle>
                        )}
                      </g>
                    );
                  })}
                </svg>
                {steps.map((s, i) => {
                  const st = run.stateOf(i);
                  return (
                    <div key={s.label} className={`g-node ${st} kind-${kinds[i].toLowerCase()}`} style={{ left: pos[i][0], top: pos[i][1], width: NW, height: NH }}>
                      <div className="g-node-top">
                        <span className="g-kind">{kinds[i]}</span>
                        <StatusGlyph state={st} />
                      </div>
                      <div className="g-node-main">
                        <span className="g-icon"><s.icon size={13} strokeWidth={1.9} /></span>
                        <span className="g-label">{s.label}</span>
                      </div>
                      <span className="g-system">{s.system}</span>
                    </div>
                  );
                })}
              </div>
              </div>
            </div>
          </div>

          <aside className="cc-inspector">
            <div className="cc-insp-head">
              <div>
                <span className="cc-insp-title">Run <span className="mono">#{(4180 + run.runs).toLocaleString()}</span></span>
                <AnimatePresence mode="wait">
                  <motion.span key={run.recordRef} className="cc-insp-ref mono" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
                    {run.recordRef}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="cc-insp-progress mono">{progress}%</span>
            </div>
            <div className="cc-bar"><motion.span animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} /></div>
            <dl className="cc-fields">
              {commandFlow.record.fields.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
            <div className="cc-log-head"><span>Execution log</span><span className="mono">live</span></div>
            <ul className="cc-log">
              <AnimatePresence initial={false}>
                {run.logs.map((l) => {
                  const step = steps.find((s) => s.log === l.text);
                  return (
                    <motion.li
                      key={l.id}
                      layout
                      className={`cc-log-item ${l.kind}`}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="cc-log-time mono">{l.time}</span>
                      <span className="cc-log-body">
                        <span className="cc-log-text">{l.text}</span>
                        {step?.call && <span className="cc-log-call mono">{step.call}</span>}
                      </span>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
              {run.logs.length === 0 && <li className="cc-log-empty mono">Waiting for trigger…</li>}
            </ul>
          </aside>
        </div>

        {/* Compact layout for small screens: the same run as a vertical step list. */}
        <ol className="cc-compact">
          {steps.map((s, i) => {
            const st = run.stateOf(i);
            return (
              <li key={s.label} className={`cc-c-step ${st}`}>
                <span className="g-icon"><s.icon size={13} strokeWidth={1.9} /></span>
                <span className="cc-c-text"><span className="g-label">{s.label}</span><span className="g-system">{s.system}</span></span>
                <StatusGlyph state={st} />
              </li>
            );
          })}
        </ol>
      </AppFrame>
    </div>
  );
}
