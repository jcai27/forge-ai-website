import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  label: string;
  title: ReactNode;
  lead: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}

/** Header block for interior pages. */
export default function PageHero({ label, title, lead, children, aside }: Props) {
  return (
    <section className="page-hero">
      <div className="page-hero-grid" aria-hidden="true" />
      <div className={`container wide page-hero-inner ${aside ? "has-aside" : ""}`}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <span className="label">{label}</span>
          <h1 className="h1">{title}</h1>
          <p className="lead">{lead}</p>
          {children}
        </motion.div>
        {aside && (
          <motion.div
            className="page-hero-aside"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {aside}
          </motion.div>
        )}
      </div>
    </section>
  );
}
