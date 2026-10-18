import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Props {
  to: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
}

const isExternal = (to: string) => /^(https?:|mailto:|tel:)/.test(to);

/** A link styled as a button. Internal paths use client-side routing; external URLs open normally. */
export default function Button({ to, children, variant = "primary", arrow, className = "", onClick }: Props) {
  const cls = `btn btn-${variant} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />}
    </>
  );
  if (isExternal(to)) {
    const newTab = to.startsWith("http");
    return (
      <a href={to} className={cls} onClick={onClick} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link to={to} className={cls} onClick={onClick}>
      {content}
    </Link>
  );
}
