import {
  BookUser, Database, Mail, CalendarDays, Server, FolderKanban, Braces, Zap, Cpu, ShieldCheck, Activity,
  FilePen, ListTodo, BellRing, FileBarChart, UserCheck, type LucideIcon,
} from "lucide-react";
import { LogoMark } from "../Logo";

interface Item { icon: LucideIcon; label: string; sub: string }

export const sources: Item[] = [
  { icon: BookUser, label: "CRM", sub: "accounts · deals" },
  { icon: Database, label: "ERP", sub: "orders · inventory" },
  { icon: Mail, label: "Email", sub: "shared inboxes" },
  { icon: CalendarDays, label: "Calendars", sub: "schedules · bookings" },
  { icon: Server, label: "Databases", sub: "operational data" },
  { icon: FolderKanban, label: "Project management", sub: "tasks · issues" },
  { icon: Braces, label: "Internal APIs", sub: "custom services" },
];

export const layers: Item[] = [
  { icon: Zap, label: "Events & triggers", sub: "webhooks · schedules · inbox watchers" },
  { icon: Cpu, label: "Agents & reasoning", sub: "scoped tools · confidence thresholds" },
  { icon: ShieldCheck, label: "Rules & approvals", sub: "business logic · human review gates" },
  { icon: Activity, label: "Audit & observability", sub: "run history · alerts · metrics" },
];

export const outputs: Item[] = [
  { icon: FilePen, label: "Records updated", sub: "across every system" },
  { icon: ListTodo, label: "Tasks created", sub: "assigned and tracked" },
  { icon: BellRing, label: "Teams notified", sub: "with full context" },
  { icon: FileBarChart, label: "Reports delivered", sub: "on schedule" },
  { icon: UserCheck, label: "Approvals requested", sub: "when people should decide" },
];

/* Geometry (design units) */
const VW = 1120;
const VH = 560;
const NODE_W = 210;
const NODE_H = 50;
const CORE = { x: 405, y: 40, w: 310, h: 480 };
const srcY = (i: number) => 30 + i * 72;
const outY = (i: number) => 92 + i * 80;
const coreInY = (i: number) => CORE.y + 120 + i * (CORE.h - 160) / (sources.length - 1);
const coreOutY = (i: number) => CORE.y + 150 + i * (CORE.h - 220) / (outputs.length - 1);

const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = (x2 - x1) * 0.55;
  return `M${x1} ${y1} C${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
};

function Node({ item, x, y, align = "left" }: { item: Item; x: number; y: number; align?: "left" | "right" }) {
  return (
    <g transform={`translate(${x} ${y})`} className="pd-node">
      <rect width={NODE_W} height={NODE_H} rx="8" />
      <item.icon x={align === "left" ? 14 : NODE_W - 30} y={17} width={16} height={16} strokeWidth={1.8} className="pd-node-icon" />
      <text x={align === "left" ? 42 : NODE_W - 42} y={22} textAnchor={align === "left" ? "start" : "end"} className="pd-node-t">{item.label}</text>
      <text x={align === "left" ? 42 : NODE_W - 42} y={37} textAnchor={align === "left" ? "start" : "end"} className="pd-node-s">{item.sub}</text>
    </g>
  );
}

/** Signature visual: systems feeding a shared orchestration layer that produces automated outcomes. */
export default function PlatformDiagram() {
  return (
    <div className="pd">
      <svg viewBox={`0 0 ${VW} ${VH}`} className="pd-svg" role="img"
        aria-label={`Diagram: ${sources.map((s) => s.label).join(", ")} feed events into the Forge AI orchestration layer — ${layers.map((l) => l.label).join(", ")} — which produces outcomes: ${outputs.map((o) => o.label).join(", ")}.`}>
        <defs>
          <linearGradient id="pd-in" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.10)" />
            <stop offset="1" stopColor="rgba(255,154,92,0.45)" />
          </linearGradient>
          <linearGradient id="pd-out" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(255,154,92,0.45)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.12)" />
          </linearGradient>
          <pattern id="pd-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0H0V16" fill="none" stroke="rgba(255,255,255,0.035)" />
          </pattern>
        </defs>

        <text x={0} y={14} className="pd-col">SOURCES</text>
        <text x={CORE.x + CORE.w / 2} y={14} className="pd-col" textAnchor="middle">ORCHESTRATION</text>
        <text x={VW} y={14} className="pd-col" textAnchor="end">OUTCOMES</text>

        {sources.map((_, i) => {
          const d = curve(NODE_W, srcY(i) + NODE_H / 2, CORE.x, coreInY(i));
          return (
            <g key={`in-${i}`}>
              <path d={d} className="pd-link" stroke="url(#pd-in)" />
              <circle r="2.6" className="pd-pulse in motion-loop">
                <animateMotion dur="2.6s" begin={`${i * 0.37}s`} repeatCount="indefinite" path={d} />
              </circle>
            </g>
          );
        })}
        {outputs.map((_, i) => {
          const d = curve(CORE.x + CORE.w, coreOutY(i), VW - NODE_W, outY(i) + NODE_H / 2);
          return (
            <g key={`out-${i}`}>
              <path d={d} className="pd-link" stroke="url(#pd-out)" />
              <circle r="2.6" className="pd-pulse out motion-loop">
                <animateMotion dur="2.6s" begin={`${1.3 + i * 0.41}s`} repeatCount="indefinite" path={d} />
              </circle>
            </g>
          );
        })}

        {/* core */}
        <g transform={`translate(${CORE.x} ${CORE.y})`}>
          <rect width={CORE.w} height={CORE.h} rx="14" className="pd-core" />
          <rect width={CORE.w} height={CORE.h} rx="14" fill="url(#pd-grid)" />
          <rect x="-1" y="-1" width={CORE.w + 2} height={CORE.h + 2} rx="15" className="pd-core-ring" />
          <foreignObject x="20" y="20" width="24" height="24"><LogoMark size={24} inverse /></foreignObject>
          <text x="54" y="31" className="pd-core-t">Forge AI</text>
          <text x="54" y="47" className="pd-core-s">orchestration layer</text>
          <circle cx={CORE.w - 26} cy="33" r="3.5" className="pd-live motion-loop" />
          <text x={CORE.w - 36} y="37" textAnchor="end" className="pd-core-s">running</text>
          {layers.map((l, i) => (
            <g key={l.label} transform={`translate(16 ${84 + i * 94})`} className="pd-layer">
              <rect width={CORE.w - 32} height="80" rx="9" />
              <rect x="14" y="16" width="30" height="30" rx="7" className="pd-layer-iconbg" />
              <l.icon x={21} y={23} width={16} height={16} strokeWidth={1.8} className="pd-layer-icon" />
              <text x="56" y="30" className="pd-layer-t">{l.label}</text>
              <text x="56" y="48" className="pd-layer-s">{l.sub}</text>
              <rect x="56" y="58" width={CORE.w - 104} height="3" rx="1.5" className="pd-layer-track" />
              <rect x="56" y="58" width={(CORE.w - 104) * [0.72, 0.55, 0.38, 0.86][i]} height="3" rx="1.5" className="pd-layer-bar" />
            </g>
          ))}
        </g>

        {sources.map((s, i) => <Node key={s.label} item={s} x={0} y={srcY(i)} />)}
        {outputs.map((o, i) => <Node key={o.label} item={o} x={VW - NODE_W} y={outY(i)} align="right" />)}
      </svg>

      {/* Stacked layout for small screens */}
      <div className="pd-stack">
        <span className="pd-stack-h">Sources</span>
        <ul className="pd-chips">{sources.map((s) => <li key={s.label}><s.icon size={14} strokeWidth={1.8} />{s.label}</li>)}</ul>
        <span className="pd-stack-arrow" aria-hidden="true" />
        <div className="pd-stack-core">
          <div className="pd-stack-core-head"><LogoMark size={22} inverse /><span><b>Forge AI</b><small>orchestration layer</small></span></div>
          {layers.map((l) => (
            <div key={l.label} className="pd-stack-layer"><l.icon size={15} strokeWidth={1.8} /><span><b>{l.label}</b><small>{l.sub}</small></span></div>
          ))}
        </div>
        <span className="pd-stack-arrow" aria-hidden="true" />
        <span className="pd-stack-h">Outcomes</span>
        <ul className="pd-chips">{outputs.map((o) => <li key={o.label}><o.icon size={14} strokeWidth={1.8} />{o.label}</li>)}</ul>
      </div>
    </div>
  );
}
