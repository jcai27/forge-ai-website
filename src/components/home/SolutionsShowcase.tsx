import { useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Plus } from "lucide-react";
import { solutions } from "../../data/solutions";
import { previews } from "../mockups/SolutionPreviews";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const ease = [0.16, 1, 0.3, 1] as const;

function Preview({ index }: { index: number }) {
  const P = previews[solutions[index].preview];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 12, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.99 }}
        transition={{ duration: 0.35, ease }}
      >
        <P />
      </motion.div>
    </AnimatePresence>
  );
}

/** Solutions as a vertical tab list with a live product preview (accordion on small screens). */
export default function SolutionsShowcase() {
  const [active, setActive] = useState(0);
  const desktop = useMediaQuery("(min-width: 1000px)");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent) => {
    if (!desktop || (e.key !== "ArrowDown" && e.key !== "ArrowUp")) return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowDown" ? 1 : -1) + solutions.length) % solutions.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="showcase">
      <div
        className="showcase-list"
        role={desktop ? "tablist" : undefined}
        aria-orientation={desktop ? "vertical" : undefined}
        aria-label="Solutions"
        onKeyDown={onKey}
      >
        {solutions.map((s, i) => {
          const on = i === active;
          return (
            <div key={s.id} className={`showcase-item ${on ? "active" : ""}`}>
              <button
                ref={(el) => { tabs.current[i] = el; }}
                className="showcase-trigger"
                id={`sol-tab-${s.id}`}
                onClick={() => setActive(desktop ? i : on ? -1 : i)}
                {...(desktop
                  ? { role: "tab", "aria-selected": on, "aria-controls": "sol-panel", tabIndex: on ? 0 : -1 }
                  : { "aria-expanded": on, "aria-controls": `sol-body-${s.id}` })}
              >
                <span className="showcase-index mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="showcase-title">{s.title}</span>
                <span className="showcase-icon"><s.icon size={16} strokeWidth={1.8} /></span>
                {!desktop && <Plus size={16} className="showcase-plus" aria-hidden="true" />}
              </button>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    id={`sol-body-${s.id}`}
                    className="showcase-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                  >
                    <div className="showcase-body-inner">
                      <p className="showcase-short">{s.short}</p>
                      <ul className="ticks">
                        {s.highlights.map((h) => <li key={h}><Check size={14} strokeWidth={2.2} aria-hidden="true" />{h}</li>)}
                      </ul>
                      <Link to={`/solutions#${s.id}`} className="text-link">Explore {s.title} <ArrowRight size={14} aria-hidden="true" /></Link>
                      {!desktop && <div className="showcase-inline-preview"><Preview index={i} /></div>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {on && desktop && <motion.span layoutId="showcase-rail" className="showcase-rail" transition={{ duration: 0.35, ease }} />}
            </div>
          );
        })}
      </div>
      {desktop && (
        <div className="showcase-stage" id="sol-panel" role="tabpanel" aria-labelledby={`sol-tab-${solutions[Math.max(active, 0)].id}`}>
          <div className="showcase-stage-inner">
            <Preview index={Math.max(active, 0)} />
          </div>
          <p className="showcase-caption">Illustrative interface. Every system we deliver is designed around your workflows.</p>
        </div>
      )}
    </div>
  );
}
