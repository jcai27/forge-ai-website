import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "inverse" | "inverse-secondary";

interface Props {
  to: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "md" | "sm";
  arrow?: boolean;
  className?: string;
}

const isExternal = (to: string) => /^(https?:|mailto:|tel:)/.test(to);

/** A link styled as a button. Internal paths use client-side routing; external URLs open normally. */
export default function Button({ to, children, variant = "primary", size = "md", arrow, className = "" }: Props) {
  const cls = `btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${className}`.trim();
  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight size={15} strokeWidth={2} className="btn-arrow" aria-hidden="true" />}
    </>
  );
  if (isExternal(to)) {
    const newTab = to.startsWith("http");
    return (
      <a href={to} className={cls} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return <Link to={to} className={cls}>{content}</Link>;
}
