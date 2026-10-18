import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import FinalCTA from "../components/FinalCTA";
import HeroCommandCenter from "../components/mockups/HeroCommandCenter";
import FragmentationStory from "../components/home/FragmentationStory";
import SolutionsShowcase from "../components/home/SolutionsShowcase";
import ProcessTimeline from "../components/home/ProcessTimeline";
import PlatformDiagram from "../components/home/PlatformDiagram";
import Outcomes from "../components/home/Outcomes";
import { consultationHref } from "../config/site";
import { solutions } from "../data/solutions";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const ease = [0.16, 1, 0.3, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

const principles = [
  { title: "Built on your stack", body: "We integrate with the systems you already run. No rip-and-replace, no new platform for your team to learn." },
  { title: "Observable by default", body: "Every trigger, decision, and action is logged — so you can see what ran, when, and why." },
  { title: "People stay in control", body: "Approval gates and scoped permissions keep consequential decisions with the people accountable for them." },
];

export default function Home() {
  useDocumentTitle();

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="container wide">
          <div className="hero-copy">
            <motion.span className="hero-badge" {...rise(0)}>
              <span className="hero-badge-dot" /> AI-powered operational infrastructure
            </motion.span>
            <motion.h1 className="display" {...rise(0.06)}>
              Your business operations,<br />
              <span className="hero-soft">intelligently automated.</span>
            </motion.h1>
            <div className="hero-row">
              <motion.p className="lead" {...rise(0.14)}>
                Forge AI connects your systems, automates repetitive work, and builds intelligent workflows tailored to how your business operates.
              </motion.p>
              <motion.div className="btn-row" {...rise(0.2)}>
                <Button to={consultationHref} arrow>Book a Consultation</Button>
                <Button to="/solutions" variant="secondary">Explore Solutions</Button>
              </motion.div>
            </div>
          </div>
          <motion.div className="hero-visual" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease }}>
            <HeroCommandCenter />
          </motion.div>
          <motion.ul className="hero-caps" {...rise(0.5)} aria-label="Capabilities">
            {solutions.map((s) => (
              <li key={s.id}><Link to={`/solutions#${s.id}`}><s.icon size={14} strokeWidth={1.8} aria-hidden="true" />{s.title}</Link></li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Problem */}
      <section className="section">
        <div className="container wide">
          <FragmentationStory />
        </div>
      </section>

      {/* Solutions */}
      <section className="section sunken" id="solutions">
        <div className="container wide">
          <SectionHeader
            index="02"
            label="Solutions"
            layout="split"
            title="Five ways we take operational work off your team's plate."
            lead="Each engagement combines these capabilities around a specific workflow. Select one to see what it looks like in practice."
          />
          <SolutionsShowcase />
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container wide">
          <SectionHeader
            index="03"
            label="How it works"
            layout="split"
            title="From first conversation to production workflows."
            lead="An incremental engagement that starts with one well-scoped workflow. You bring knowledge of your business — no technical expertise required."
          />
          <ProcessTimeline />
          <Reveal className="inline-link-row">
            <Link to="/how-it-works" className="text-link">See the full engagement process <ArrowRight size={14} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>

      {/* Platform */}
      <section className="section night platform-section">
        <div className="platform-glow" aria-hidden="true" />
        <div className="container wide">
          <SectionHeader
            index="04"
            label="Platform"
            layout="split"
            title="One orchestration layer across every system you run."
            lead="Your existing tools feed events into a shared layer of triggers, agents, rules, and observability — which turns them into completed work."
          />
          <Reveal y={24}><PlatformDiagram /></Reveal>
          <div className="principles">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06} className="principle">
                <h3 className="h4">{p.title}</h3>
                <p className="muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="platform-foot">
            <p className="muted body-sm">Illustrative architecture. Each integration is designed, built, and tested against your systems during the engagement.</p>
            <Link to="/platform" className="text-link on-dark">Explore the platform <ArrowRight size={14} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>

      {/* Outcomes */}
      <section className="section">
        <div className="container wide">
          <Outcomes />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
