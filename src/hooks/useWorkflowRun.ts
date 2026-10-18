import { useEffect, useRef, useState } from "react";
import type { Flow } from "../data/flows";

export interface LogEntry {
  id: number;
  time: string;
  text: string;
  kind: "step" | "approval" | "run" | "done";
}

export type StepState = "done" | "active" | "awaiting" | "pending";

interface Options {
  stepMs?: number;
  approvalMs?: number;
  restartMs?: number;
  /** Pause the simulation (e.g. while off-screen). */
  paused?: boolean;
  maxLogs?: number;
}

const clock = () =>
  new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });

/**
 * Drives an illustrative workflow run. Steps sharing a `stage` run together;
 * steps without one run in sequence. Writes activity-log entries and restarts
 * with a fresh record when finished. Remount (via `key`) to switch flows.
 */
export function useWorkflowRun(
  flow: Flow,
  { stepMs = 1300, approvalMs = 2400, restartMs = 2600, paused = false, maxLogs = 6 }: Options = {},
) {
  const stageOf = (i: number) => flow.steps[i].stage ?? i;
  const stages = Array.from(new Set(flow.steps.map((_, i) => stageOf(i)))).sort((a, b) => a - b);
  const total = stages.length;

  const [cursor, setCursor] = useState(0);
  const [runs, setRuns] = useState(1);
  const [recordRef, setRecordRef] = useState(() => flow.record.ref());
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const nextId = useRef(0);
  const announced = useRef("");

  const push = (entries: { text: string; kind: LogEntry["kind"] }[]) =>
    setLogs((prev) =>
      [...entries.map((e) => ({ id: nextId.current++, time: clock(), ...e })).reverse(), ...prev].slice(0, maxLogs),
    );

  const stepsIn = (stage: number) => flow.steps.filter((_, i) => stageOf(i) === stage);

  useEffect(() => {
    if (paused) return;
    if (cursor >= total) {
      const t = window.setTimeout(() => {
        const ref = flow.record.ref();
        setRecordRef(ref);
        setRuns((r) => r + 1);
        setCursor(0);
        push([{ text: `New run started · ${ref}`, kind: "run" }]);
      }, restartMs);
      return () => window.clearTimeout(t);
    }
    const current = stepsIn(stages[cursor]);
    const approval = current.some((s) => s.approval);
    // Announce an approval step once per run, even if the effect re-runs (e.g. pause/resume).
    const key = `${runs}:${cursor}`;
    if (approval && announced.current !== key) {
      announced.current = key;
      push(current.filter((s) => s.approval).map((s) => ({ text: `${s.label} · awaiting review`, kind: "approval" as const })));
    }
    const t = window.setTimeout(() => {
      push(current.map((s) => ({ text: s.log, kind: cursor === total - 1 ? ("done" as const) : ("step" as const) })));
      setCursor((c) => c + 1);
    }, approval ? approvalMs : stepMs);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor, paused, flow]);

  const stateOf = (i: number): StepState => {
    const s = stages.indexOf(stageOf(i));
    if (s < cursor) return "done";
    if (s === cursor) return flow.steps[i].approval ? "awaiting" : "active";
    return "pending";
  };

  return { cursor, total, runs, recordRef, logs, done: cursor >= total, stateOf };
}
