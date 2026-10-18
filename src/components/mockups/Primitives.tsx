import type { ReactNode } from "react";
import { CircleCheck, CircleDashed, Hourglass, Loader2, TriangleAlert, Circle } from "lucide-react";

export type Tone = "ok" | "run" | "warn" | "idle" | "info" | "err";

const toneIcon = {
  ok: CircleCheck,
  run: Loader2,
  warn: Hourglass,
  idle: CircleDashed,
  info: Circle,
  err: TriangleAlert,
};

/** Status pill: color is always paired with an icon and a text label. */
export function Pill({ tone, children, className = "" }: { tone: Tone; children: ReactNode; className?: string }) {
  const Icon = toneIcon[tone];
  return (
    <span className={`pill pill-${tone} ${className}`}>
      <Icon size={11} strokeWidth={2.4} className={tone === "run" ? "spin" : undefined} aria-hidden="true" />
      {children}
    </span>
  );
}

/** Non-interactive control rendered inside illustrative product UI. */
export function MockButton({ children, primary }: { children: ReactNode; primary?: boolean }) {
  return <span className={`mock-btn ${primary ? "primary" : ""}`}>{children}</span>;
}

interface FrameProps {
  crumbs: string[];
  right?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Plain-language description of what the illustration shows, for assistive tech. */
  description: string;
}

/**
 * Window chrome shared by every product illustration. Marked as a single image
 * for assistive tech; the inner UI is decorative and non-interactive.
 */
export function AppFrame({ crumbs, right, children, className = "", description }: FrameProps) {
  return (
    <figure className={`app-frame ${className}`} role="img" aria-label={description}>
      <div className="app-bar" aria-hidden="true">
        <span className="app-dots"><i /><i /><i /></span>
        <span className="app-crumbs">
          {crumbs.map((c, i) => (
            <span key={c} className={i === crumbs.length - 1 ? "current" : ""}>
              {c}
              {i < crumbs.length - 1 && <span className="sep">/</span>}
            </span>
          ))}
        </span>
        <span className="app-bar-right">{right}</span>
      </div>
      <div className="app-body" aria-hidden="true">{children}</div>
    </figure>
  );
}

export function IllustrativeTag({ children = "Illustrative" }: { children?: ReactNode }) {
  return <span className="illus-tag">{children}</span>;
}
