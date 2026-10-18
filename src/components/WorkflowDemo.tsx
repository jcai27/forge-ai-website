import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
      <div className="demo-head">
        <div className="seg" role="tablist" aria-label="Example workflows" onKeyDown={onKey}>
          {demoFlows.map((f, i) => (
            <button
              key={f.id}
              ref={(el) => { tabs.current[i] = el; }}
              role="tab"
              id={`demo-tab-${f.id}`}
              aria-selected={i === active}
              aria-controls="demo-panel"
              tabIndex={i === active ? 0 : -1}
              className={`seg-btn ${i === active ? "active" : ""}`}
              onClick={() => setActive(i)}
            >
              {i === active && <motion.span layoutId="demo-seg" className="seg-bg" transition={{ type: "spring", bounce: 0.15, duration: 0.45 }} />}
              <span className="seg-text">{f.tab}</span>
            </button>
          ))}
        </div>
        <p className="demo-summary muted">{flow.summary}</p>
      </div>
      <div id="demo-panel" role="tabpanel" aria-labelledby={`demo-tab-${flow.id}`}>
        <AnimatePresence mode="wait">
          <motion.div key={flow.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
            <WorkflowConsole key={flow.id} flow={flow} stepMs={1500} />
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="demo-note">Illustrative simulation — not a live integration or a real customer system.</p>
    </div>
  );
}
