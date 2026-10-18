import { Fragment } from "react";
import { ChevronRight, ShieldCheck, Hammer } from "lucide-react";
import PageHero from "../components/PageHero";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import FinalCTA from "../components/FinalCTA";
import { previews } from "../components/mockups/SolutionPreviews";
import { solutions } from "../data/solutions";
import { consultationHref } from "../config/site";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function Solutions() {
  useDocumentTitle("Solutions", "Workflow automation, systems integration, AI agents, operational analytics, and hiring operations from Forge AI.");

  return (
    <>
      <PageHero
        label="Solutions"
        title="Practical automation for real operations."
        lead="We focus on the workflows that slow businesses down — hand-offs, re-entry, and coordination — and build systems that handle them reliably, with people in control where it matters."
      >
        <div className="btn-row">
          <Button to={consultationHref} arrow>Book a Consultation</Button>
          <Button to="/contact" variant="secondary">Describe a workflow</Button>
        </div>
      </PageHero>

      <nav className="subnav" aria-label="Solutions">
        <div className="container wide subnav-inner">
          {solutions.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} className="subnav-link">
              <span className="mono">{String(i + 1).padStart(2, "0")}</span> {s.title}
            </a>
          ))}
        </div>
      </nav>

      {solutions.map((s, idx) => {
        const P = previews[s.preview];
        return (
          <section key={s.id} id={s.id} className={`section sol ${idx % 2 ? "sunken" : ""}`}>
            <div className="container wide">
              <div className="sol-top">
                <Reveal className="sol-intro">
                  <span className="label"><span className="label-index">{String(idx + 1).padStart(2, "0")}</span><span aria-hidden="true">—</span>{s.title}</span>
                  <h2 className="h2">{s.value}</h2>
                  <p className="lead">{s.overview}</p>
                  <div className="btn-row">
                    <Button to={`/contact?solution=${s.id}`} size="sm" arrow>Discuss {s.title.toLowerCase()}</Button>
                  </div>
                </Reveal>
                <Reveal delay={0.1} className="sol-preview"><P /></Reveal>
              </div>

              <div className="sol-detail">
                <Reveal className="sol-col">
                  <h3 className="label">Common challenges</h3>
                  <ul className="dash-list">{s.challenges.map((c) => <li key={c}>{c}</li>)}</ul>
                </Reveal>
                <Reveal delay={0.05} className="sol-col wide">
                  <h3 className="label">Example workflows</h3>
                  <div className="wf-list">
                    {s.workflows.map((w) => (
                      <div key={w.title} className="wf-row">
                        <span className="wf-title">{w.title}</span>
                        <ol className="chain">
                          {w.steps.map((step, i) => (
                            <Fragment key={step}>
                              <li>{step}</li>
                              {i < w.steps.length - 1 && <ChevronRight size={12} className="chain-sep" aria-hidden="true" />}
                            </Fragment>
                          ))}
                        </ol>
                      </div>
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={0.1} className="sol-col">
                  <h3 className="label">Systems we typically connect</h3>
                  <ul className="chips">{s.systems.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
                  {s.safeguards && (
                    <div className="sol-safeguards">
                      <h3 className="label"><ShieldCheck size={13} aria-hidden="true" /> Built-in safeguards</h3>
                      <ul className="dash-list">{s.safeguards.map((g) => <li key={g}>{g}</li>)}</ul>
                    </div>
                  )}
                </Reveal>
              </div>

              <Reveal className="sol-outcome">
                <span className="label">What to expect</span>
                <p>{s.outcome}</p>
              </Reveal>
            </div>
          </section>
        );
      })}

      <section className="section">
        <div className="container wide">
          <Reveal className="custom-band">
            <span className="custom-icon"><Hammer size={20} strokeWidth={1.7} /></span>
            <div>
              <h2 className="h3">Custom agents and operational tools</h2>
              <p className="muted">
                Some of the most valuable opportunities are specific to how your business works. We start with the problem, evaluate whether AI, conventional software, or a process change is the right answer — and build exactly what's needed.
              </p>
            </div>
            <Button to="/contact" variant="secondary" arrow>Describe your workflow</Button>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
