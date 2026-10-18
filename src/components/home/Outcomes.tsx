import { Hand, Gauge, ShieldCheck, Eye, Sparkles } from "lucide-react";
import Reveal from "../Reveal";

export const outcomes = [
  {
    icon: Hand,
    title: "Less manual work",
    body: "Routine transfers, re-entry, and follow-ups move into automated workflows.",
    measure: "Manual touches per transaction",
  },
  {
    icon: Gauge,
    title: "Faster operational execution",
    body: "Work advances the moment an event happens — not when someone next checks an inbox.",
    measure: "Cycle time, request to completion",
  },
  {
    icon: ShieldCheck,
    title: "Fewer repetitive errors",
    body: "Data is validated once and synchronized everywhere, instead of retyped by hand.",
    measure: "Exceptions and corrections per week",
  },
  {
    icon: Eye,
    title: "Better visibility across systems",
    body: "Every run is logged, so status becomes something you look up rather than chase.",
    measure: "Time to answer “where is this?”",
  },
  {
    icon: Sparkles,
    title: "More time for high-value work",
    body: "Your team's attention shifts to customers, exceptions, and decisions.",
    measure: "Hours redirected from routine handling",
  },
];

export default function Outcomes() {
  return (
    <div className="outcomes">
      <Reveal className="outcomes-head">
        <span className="label"><span className="label-index">05</span><span aria-hidden="true">—</span>Outcomes</span>
        <h2 className="h2">What changes when operations run on intelligent workflows.</h2>
        <p className="lead">
          We don't quote numbers before we've seen your operations. During discovery we agree on how each outcome will be measured — then we report against it.
        </p>
      </Reveal>
      <ol className="outcomes-list">
        {outcomes.map((o, i) => (
          <Reveal key={o.title} as="li" delay={i * 0.04} className="outcome-row">
            <span className="outcome-num mono">{String(i + 1).padStart(2, "0")}</span>
            <span className="outcome-icon"><o.icon size={18} strokeWidth={1.7} /></span>
            <div className="outcome-text">
              <h3 className="h4">{o.title}</h3>
              <p className="muted">{o.body}</p>
            </div>
            <div className="outcome-measure">
              <span className="label">Measured by</span>
              <span>{o.measure}</span>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
