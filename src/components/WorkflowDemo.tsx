import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info } from "lucide-react";
import { demoFlows } from "../data/flows";
import WorkflowConsole from "./WorkflowConsole";

export default function WorkflowDemo() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const flow = demoFlows[active];

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (active + (e.key === "ArrowRight" ? 1 : -1) + demoFlows.length) % demoFlows.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="demo">
      <div className="demo-tabs" role="tablist" aria-label="Example workflows" onKeyDown={onKey}>
        {demoFlows.map((f, i) => (
          <button
            key={f.id}
            ref={(el) => (tabs.current[i] = el)}
            role="tab"
            id={`demo-tab-${f.id}`}
            aria-selected={i === active}
            aria-controls="demo-panel"
            tabIndex={i === active ? 0 : -1}
            className={`demo-tab ${i === active ? "active" : ""}`}
            onClick={() => setActive(i)}
          >
            {i === active && <motion.span layoutId="demo-tab-bg" className="demo-tab-bg" transition={{ type: "spring", bounce: 0.18, duration: 0.5 }} />}
            <span className="demo-tab-label">{f.tab}</span>
          </button>
        ))}
      </div>

      <div id="demo-panel" role="tabpanel" aria-labelledby={`demo-tab-${flow.id}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={flow.id}
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="demo-summary">{flow.summary}</p>
            <WorkflowConsole key={flow.id} flow={flow} windowTitle="Example workflow" stepMs={1500} />
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="demo-disclaimer">
        <Info size={14} aria-hidden="true" />
        Illustrative example only — this is a simulation, not a live integration or a real customer system.
      </p>
    </div>
  );
}
