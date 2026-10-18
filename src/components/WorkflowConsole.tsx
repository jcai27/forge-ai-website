import { useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Check, Loader2, Hourglass } from "lucide-react";
import type { Flow } from "../data/flows";
import { useWorkflowRun } from "../hooks/useWorkflowRun";

type NodeState = "done" | "active" | "awaiting" | "pending";

interface Props {
  flow: Flow;
  /** Label shown in the window chrome. */
  windowTitle?: string;
  stepMs?: number;
}

/**
 * An illustrative, self-running automation console: a pipeline of nodes,
 * the record being processed, and a live activity log.
 */
export default function WorkflowConsole({ flow, windowTitle = "Forge Ops", stepMs }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const { cursor, total, runs, recordRef, logs, done } = useWorkflowRun(flow, { paused: !inView, stepMs });

  const stateOf = (i: number): NodeState =>
    i < cursor ? "done" : i === cursor ? (flow.steps[i].approval ? "awaiting" : "active") : "pending";

  const current = flow.steps[Math.min(cursor, total - 1)];
  const status = done
    ? "Completed"
    : current.approval
      ? `Awaiting ${current.system.toLowerCase()}`
      : cursor === total - 1
        ? "Finalizing run"
        : `Running · ${current.label}`;

  return (
    <div ref={ref} className="console" role="img" aria-label={`Illustrative animation of an automated workflow: ${flow.steps.map((s) => s.label).join(", then ")}.`}>
      <div className="console-bar" aria-hidden="true">
        <span className="console-dots"><i /><i /><i /></span>
        <span className="console-title">{windowTitle} <span className="muted">/ {flow.title}</span></span>
        <span className="console-chip"><span className="pulse-dot" /> Simulation</span>
      </div>

      <div className="console-body" aria-hidden="true">
        <ol className="pipeline" style={{ ["--n" as string]: total }}>
          {flow.steps.map((step, i) => {
            const state = stateOf(i);
            const Icon = step.icon;
            return (
              <li key={step.label} className={`pipe-item ${state}`}>
                <motion.div
                  className="node"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="node-icon">
                    <Icon size={18} strokeWidth={1.75} />
                    {(state === "active" || state === "awaiting") && (
                      <motion.span
                        className="node-ring"
                        initial={{ opacity: 0.7, scale: 1 }}
                        animate={{ opacity: 0, scale: 1.7 }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                  </span>
                  <span className="node-text">
                    <span className="node-label">{step.label}</span>
                    <span className="node-system">{step.system}</span>
                  </span>
                  <span className="node-status">
                    {state === "done" && <Check size={12} strokeWidth={3} />}
                    {state === "active" && <Loader2 size={12} className="spin" />}
                    {state === "awaiting" && <Hourglass size={12} />}
                  </span>
                </motion.div>
                {i < total - 1 && (
                  <span className={`connector ${i < cursor ? "filled" : ""} ${i === cursor - 1 && !done ? "flowing" : ""}`}>
                    <span className="connector-fill" />
                  </span>
                )}
              </li>
            );
          })}
        </ol>

        <div className="console-lower">
          <div className="record-card">
            <div className="record-head">
              <span className="eyebrow-sm">{flow.record.label}</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={recordRef}
                  className="mono record-ref"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                >
                  {recordRef}
                </motion.span>
              </AnimatePresence>
            </div>
            <dl className="record-fields">
              {flow.record.fields.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
            <div className="record-progress">
              <div className="record-progress-row">
                <span className={`status-text ${done ? "ok" : current.approval ? "warn" : ""}`}>{status}</span>
                <span className="mono muted">{Math.min(cursor, total)}/{total}</span>
              </div>
              <div className="bar"><motion.span className="bar-fill" animate={{ width: `${(cursor / total) * 100}%` }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} /></div>
              <span className="mono muted tiny">Run #{runs} · all actions logged</span>
            </div>
          </div>

          <div className="activity">
            <div className="activity-head">
              <span className="eyebrow-sm">Activity</span>
              <span className="mono muted tiny">live log</span>
            </div>
            <ul className="activity-list">
              <AnimatePresence initial={false}>
                {logs.length === 0 && (
                  <motion.li key="empty" className="activity-empty" exit={{ opacity: 0 }}>Waiting for events…</motion.li>
                )}
                {logs.map((l) => (
                  <motion.li
                    key={l.id}
                    layout
                    className={`activity-item ${l.kind}`}
                    initial={{ opacity: 0, x: -10, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="activity-dot" />
                    <span className="activity-text">{l.text}</span>
                    <span className="mono activity-time">{l.time}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
