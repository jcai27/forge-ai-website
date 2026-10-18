import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { processSteps } from "../../data/process";

/** Four-stage engagement timeline; the rail fills as the section scrolls through view. */
export default function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [reached, setReached] = useState(-1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setReached(Math.min(processSteps.length - 1, Math.floor(v * processSteps.length + 0.15)));
  });

  return (
    <div className="timeline4" ref={ref}>
      <span className="timeline4-rail" aria-hidden="true">
        <motion.span className="timeline4-fill h" style={{ scaleX: progress }} />
        <motion.span className="timeline4-fill v" style={{ scaleY: progress }} />
      </span>
      <ol className="timeline4-list">
      {processSteps.map((s, i) => (
        <li key={s.num} className={`timeline4-step ${i <= reached ? "reached" : ""}`}>
          <span className="timeline4-marker" aria-hidden="true"><span /></span>
          <span className="timeline4-num mono">{s.num}</span>
          <h3 className="h3">{s.title}</h3>
          <p className="muted">{s.body}</p>
          <div className="timeline4-outputs">
            <span className="label">Outputs</span>
            <ul>
              {s.outputs.map((o) => <li key={o}>{o}</li>)}
            </ul>
          </div>
        </li>
      ))}
      </ol>
    </div>
  );
}
