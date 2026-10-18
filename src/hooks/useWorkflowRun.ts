import { useEffect, useRef, useState } from "react";
import type { Flow } from "../data/flows";

export interface LogEntry {
  id: number;
  time: string;
  text: string;
  kind: "step" | "approval" | "run" | "done";
}

interface Options {
  stepMs?: number;
  approvalMs?: number;
  restartMs?: number;
  /** Pause the simulation (e.g. while off-screen). */
  paused?: boolean;
}

const clock = () =>
  new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });

/**
 * Drives an illustrative workflow run: advances through each step on a timer,
 * writes activity-log entries, and restarts with a fresh record when finished.
 * Remount (via `key`) to switch flows.
 */
export function useWorkflowRun(flow: Flow, { stepMs = 1300, approvalMs = 2400, restartMs = 2600, paused = false }: Options = {}) {
  const [cursor, setCursor] = useState(0);
  const [runs, setRuns] = useState(1);
  const [recordRef, setRecordRef] = useState(() => flow.record.ref());
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const nextId = useRef(0);
  const announced = useRef("");
  const total = flow.steps.length;

  const push = (text: string, kind: LogEntry["kind"]) =>
    setLogs((prev) => [{ id: nextId.current++, time: clock(), text, kind }, ...prev].slice(0, 6));

  useEffect(() => {
    if (paused) return;
    if (cursor >= total) {
      const t = window.setTimeout(() => {
        const ref = flow.record.ref();
        setRecordRef(ref);
        setRuns((r) => r + 1);
        setCursor(0);
        push(`New run started · ${ref}`, "run");
      }, restartMs);
      return () => window.clearTimeout(t);
    }
    const step = flow.steps[cursor];
    // Announce an approval step once per run, even if the effect re-runs (e.g. pause/resume).
    const key = `${runs}:${cursor}`;
    if (step.approval && announced.current !== key) {
      announced.current = key;
      push(`${step.label} · awaiting review`, "approval");
    }
    const t = window.setTimeout(() => {
      push(step.log, cursor === total - 1 ? "done" : "step");
      setCursor((c) => c + 1);
    }, step.approval ? approvalMs : stepMs);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor, paused, flow]);

  return { cursor, total, runs, recordRef, logs, done: cursor >= total };
}
