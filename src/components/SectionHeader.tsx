import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
}

export default function SectionHeader({ eyebrow, title, lead, align = "left" }: Props) {
  return (
    <Reveal className={`section-header ${align === "center" ? "center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="h2">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </Reveal>
  );
}
