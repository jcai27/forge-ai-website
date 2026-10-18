import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  children: ReactNode;
  className?: string;
}

/** Router link for internal paths; plain anchor (new tab for http) for external URLs. */
export default function SmartLink({ to, children, className }: Props) {
  if (/^(https?:|mailto:|tel:)/.test(to)) {
    const newTab = to.startsWith("http");
    return (
      <a href={to} className={className} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return <Link to={to} className={className}>{children}</Link>;
}
