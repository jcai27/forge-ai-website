import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Inbox, Sheet, Contact, Database, Receipt, MessagesSquare, Clock3, TriangleAlert, Layers, User, type LucideIcon } from "lucide-react";
import Reveal from "../Reveal";
import { useMediaQuery } from "../../hooks/useMediaQuery";

type Mode = "today" | "forge";

interface Layout {
  view: string;
  cx: number;
  cy: number;
  pos: [number, number][];
  /** Spokes that carry an annotation, in label order. */
  tagged: number[];
  /** Where along each tagged spoke (0 = center, 1 = tool) its label sits; staggered so labels never collide. */
  tagAt: number[];
}

/* Desktop: tools in a ring. Phone: a taller two-column arrangement so text stays legible. */
const layouts: Record<"wide" | "narrow", Layout> = {
  wide: {
    view: "0 0 600 440", cx: 300, cy: 220,
    pos: [[92, 92], [300, 50], [508, 92], [508, 348], [300, 390], [92, 348]],
    tagged: [0, 2, 3, 5],
    tagAt: [0.5, 0.5, 0.5, 0.5],
  },
  narrow: {
    view: "0 0 360 520", cx: 180, cy: 260,
    pos: [[75, 50], [285, 50], [285, 260], [285, 470], [75, 470], [75, 260]],
    tagged: [0, 1, 3, 4],
    tagAt: [0.45, 0.7, 0.45, 0.7],
  },
};

const tools: { label: string; icon: LucideIcon }[] = [
  { label: "Inbox", icon: Inbox },
  { label: "Spreadsheets", icon: Sheet },
  { label: "CRM", icon: Contact },
  { label: "ERP", icon: Database },
  { label: "Accounting", icon: Receipt },
  { label: "Team chat", icon: MessagesSquare },
];
/* Tool-to-tool copy/paste paths that only exist in the "today" state. */
const crossLinks: [number, number][] = [[0, 1], [1, 2], [1, 3], [3, 4], [0, 5], [2, 4]];
const friction = ["Re-keyed by hand", "Waiting on a reply", "Version conflict", "Missed update"];
const resolved = ["Extracted", "Synced", "Validated", "Routed"];

const consequences = [
  { icon: Clock3, today: ["Delays", "Work waits in inboxes until someone moves it to the next system."], forge: ["Immediate hand-offs", "Events trigger the next step the moment they happen."] },
  { icon: TriangleAlert, today: ["Errors", "Every manual re-entry is a chance for a typo, a missed field, or a stale number."], forge: ["Consistent data", "Information is validated once and synchronized everywhere it is needed."] },
  { icon: Layers, today: ["Overhead", "Skilled people spend their week coordinating software instead of the business."], forge: ["Focused people", "Your team handles exceptions and decisions — not transfers."] },
];

function Diagram({ mode, narrow }: { mode: Mode; narrow: boolean }) {
  const forge = mode === "forge";
  const L = layouts[narrow ? "narrow" : "wide"];
  const CX = L.cx;
  const CY = L.cy;
  const at = (i: number) => ({ x: L.pos[i][0], y: L.pos[i][1] });
  const labels = L.tagged.map((i, k) => ({ i, f: L.tagAt[k], text: (forge ? resolved : friction)[k] }));
  return (
    <svg viewBox={L.view} className={`frag-svg ${mode}`} role="img" aria-label={forge
      ? "With Forge AI: six business tools connect through a single orchestration layer, and data is extracted, synced, validated, and routed automatically."
      : "Today: six business tools are connected only through people, with manual re-keying, waiting, version conflicts, and missed updates."}>
      {/* tool-to-tool manual paths */}
      {crossLinks.map(([a, b]) => (
        <motion.line key={`${a}-${b}`} x1={at(a).x} y1={at(a).y} x2={at(b).x} y2={at(b).y}
          className="frag-cross" animate={{ opacity: forge ? 0 : 1 }} transition={{ duration: 0.5 }} />
      ))}
      {/* spokes */}
      {tools.map((tool, i) => {
        const t = { ...tool, ...at(i) };
        const d = `M${CX} ${CY} L${t.x} ${t.y}`;
        return (
          <g key={t.label}>
            <path d={d} className={`frag-spoke ${forge ? "on" : ""}`} />
            {forge && (
              <circle r="3" className="frag-dot motion-loop">
                <animateMotion dur="2.2s" repeatCount="indefinite" path={`M${t.x} ${t.y} L${CX} ${CY}`} begin={`${(t.x + t.y) % 7 / 5}s`} />
              </circle>
            )}
          </g>
        );
      })}
      {/* tools */}
      {tools.map((tool, i) => ({ ...tool, ...at(i) })).map((t) => (
        <g key={t.label} transform={`translate(${t.x - 64} ${t.y - 20})`}>
          <rect width="128" height="40" rx="8" className="frag-tool" />
          <t.icon x={12} y={12} width={16} height={16} className="frag-tool-icon" strokeWidth={1.8} />
          <text x="36" y="25" className="frag-tool-text">{t.label}</text>
        </g>
      ))}
      {/* center */}
      <AnimatePresence mode="wait">
        {forge ? (
          <motion.g key="forge" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} style={{ transformOrigin: `${CX}px ${CY}px` }}>
            <rect x={CX - 78} y={CY - 30} width="156" height="60" rx="10" className="frag-core" />
            <rect x={CX - 64} y={CY - 12} width="24" height="24" rx="5" fill="#fff" />
            <path d={`M${CX - 57} ${CY - 6}h10v3h-7v2.2h6v3h-6V${CY + 6}h-3z`} fill="#0e0f12" />
            <text x={CX - 32} y={CY - 2} className="frag-core-t">Forge AI</text>
            <text x={CX - 32} y={CY + 13} className="frag-core-s">orchestration layer</text>
          </motion.g>
        ) : (
          <motion.g key="today" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} style={{ transformOrigin: `${CX}px ${CY}px` }}>
            <circle cx={CX} cy={CY} r="34" className="frag-person" />
            <User x={CX - 10} y={CY - 18} width={20} height={20} className="frag-person-icon" strokeWidth={1.8} />
            <text x={CX} y={CY + 18} textAnchor="middle" className="frag-person-t">Your team</text>
          </motion.g>
        )}
      </AnimatePresence>
      {/* annotations */}
      {labels.map(({ i, f, text }) => {
        const t = at(i);
        const mx = CX + (t.x - CX) * f;
        const my = CY + (t.y - CY) * f;
        const w = text.length * 6.4 + 22;
        return (
          <motion.g key={`${mode}-${i}`} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}>
            <rect x={mx - w / 2} y={my - 11} width={w} height="22" rx="11" className={`frag-tag ${forge ? "ok" : "bad"}`} />
            <circle cx={mx - w / 2 + 11} cy={my} r="3" className={`frag-tag-dot ${forge ? "ok" : "bad"}`} />
            <text x={mx - w / 2 + 19} y={my + 4} className={`frag-tag-t ${forge ? "ok" : "bad"}`}>{text}</text>
          </motion.g>
        );
      })}
    </svg>
  );
}

export default function FragmentationStory() {
  const [mode, setMode] = useState<Mode>("today");
  const [touched, setTouched] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const narrow = useMediaQuery("(max-width: 640px)");

  // Gently alternate between states until the visitor takes control.
  useEffect(() => {
    if (touched || !inView) return;
    const id = window.setTimeout(() => setMode((m) => (m === "today" ? "forge" : "today")), mode === "today" ? 4200 : 5200);
    return () => window.clearTimeout(id);
  }, [mode, touched, inView]);

  const choose = (m: Mode) => { setTouched(true); setMode(m); };

  return (
    <div className="frag" ref={ref}>
      <Reveal className="frag-copy">
        <span className="label"><span className="label-index">01</span><span aria-hidden="true">—</span>The problem</span>
        <h2 className="h2">Operations shouldn't run on copy and paste.</h2>
        <p className="lead">
          Most businesses run on a patchwork of tools held together by people — re-typing orders, reconciling spreadsheets, and forwarding messages between systems that should already be connected.
        </p>
        <div className="seg" role="radiogroup" aria-label="Compare operations">
          {(["today", "forge"] as const).map((m) => (
            <button key={m} role="radio" aria-checked={mode === m} className={`seg-btn ${mode === m ? "active" : ""}`} onClick={() => choose(m)}>
              {mode === m && <motion.span layoutId="frag-seg" className="seg-bg" transition={{ type: "spring", bounce: 0.15, duration: 0.45 }} />}
              <span className="seg-text">{m === "today" ? "Today" : "With Forge AI"}</span>
            </button>
          ))}
        </div>
        <ul className="frag-list" aria-live="polite">
          {consequences.map((c) => {
            const [title, body] = c[mode];
            return (
              <li key={c.today[0]} className={mode}>
                <span className="frag-list-icon"><c.icon size={15} strokeWidth={1.9} /></span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={mode} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                    <strong>{title}</strong>
                    <p>{body}</p>
                  </motion.div>
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Reveal>
      <Reveal delay={0.1} className="frag-visual">
        <Diagram mode={mode} narrow={narrow} />
      </Reveal>
    </div>
  );
}
