import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  children?: ReactNode;
}

/** Header block for interior pages. */
export default function PageHero({ eyebrow, title, lead, children }: Props) {
  return (
    <section className="page-hero">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="container">
        <motion.div
          className="page-hero-inner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="h1">{title}</h1>
          <p className="lead lg">{lead}</p>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
