import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface Props {
  index?: string;
  label?: string;
  title: ReactNode;
  lead?: ReactNode;
  layout?: "stack" | "center" | "split";
}

/** Section heading with an indexed mono label, e.g. "02 — Solutions". */
export default function SectionHeader({ index, label, title, lead, layout = "stack" }: Props) {
  return (
    <Reveal className={`section-head ${layout === "stack" ? "" : layout}`}>
      <div className="section-head-main">
        {label && (
          <span className="label">
            {index && <span className="label-index">{index}</span>}
            {index && <span aria-hidden="true">—</span>}
            {label}
          </span>
        )}
        <h2 className="h2">{title}</h2>
      </div>
      {lead && <p className="lead">{lead}</p>}
    </Reveal>
  );
}
