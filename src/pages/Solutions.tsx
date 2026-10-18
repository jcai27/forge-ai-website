import { Fragment } from "react";
import { ChevronRight, CircleDot, ShieldCheck, Target } from "lucide-react";
import PageHero from "../components/PageHero";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import CTABand from "../components/CTABand";
import { solutions } from "../data/solutions";
import { discoveryCallHref } from "../config/site";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function Solutions() {
  useDocumentTitle("Solutions", "Workflow automation, AI agents, systems integration, hiring operations, forecasting, and custom AI solutions from Forge AI.");

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={<>Practical automation for <span className="gradient-text">real operations.</span></>}
        lead="We focus on the workflows that slow your business down — the hand-offs, re-entry, and coordination that eat your team's week — and build systems that handle them reliably."
      >
        <div className="btn-row">
          <Button to={discoveryCallHref} arrow>Book a Discovery Call</Button>
          <Button to="/contact" variant="secondary">Tell Us About Your Workflow</Button>
        </div>
      </PageHero>

      <nav className="subnav" aria-label="Solutions">
        <div className="container subnav-inner">
          {solutions.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="subnav-link">
              <s.icon size={14} aria-hidden="true" /> {s.title}
            </a>
          ))}
        </div>
      </nav>

      {solutions.map((s, idx) => (
        <section key={s.id} id={s.id} className={`section solution-detail ${idx % 2 ? "section-alt" : ""}`}>
          <div className="container solution-layout">
            <Reveal className="solution-intro">
              <span className="eyebrow mono">{String(idx + 1).padStart(2, "0")} / {String(solutions.length).padStart(2, "0")}</span>
              <span className="icon-tile lg"><s.icon size={24} strokeWidth={1.75} /></span>
              <h2 className="h2">{s.title}</h2>
              <p className="value-prop">{s.value}</p>
              <p className="muted">{s.overview}</p>
              <div className="btn-row">
                <Button to={`/contact?solution=${s.id}`} arrow className="btn-sm">Discuss this solution</Button>
              </div>
            </Reveal>

            <div className="solution-body">
              <Reveal className="detail-block">
                <h3 className="detail-h">Common challenges</h3>
                <ul className="bullet-grid">
                  {s.challenges.map((c) => <li key={c}><CircleDot size={14} aria-hidden="true" />{c}</li>)}
                </ul>
              </Reveal>

              <Reveal className="detail-block">
                <h3 className="detail-h">Example workflows</h3>
                <div className="workflow-list">
                  {s.workflows.map((w) => (
                    <div key={w.title} className="workflow-row">
                      <span className="workflow-title">{w.title}</span>
                      <ol className="chain">
                        {w.steps.map((step, i) => (
                          <Fragment key={step}>
                            <li className="chain-step">{step}</li>
                            {i < w.steps.length - 1 && <ChevronRight size={14} className="chain-sep" aria-hidden="true" />}
                          </Fragment>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal className="detail-block">
                <h3 className="detail-h">Typical integrations</h3>
                <ul className="chips">
                  {s.integrations.map((t) => <li key={t} className="chip">{t}</li>)}
                </ul>
              </Reveal>

              {s.safeguards && (
                <Reveal className="detail-block safeguards">
                  <h3 className="detail-h"><ShieldCheck size={16} aria-hidden="true" /> Built-in safeguards</h3>
                  <ul className="bullet-grid">
                    {s.safeguards.map((g) => <li key={g}><CircleDot size={14} aria-hidden="true" />{g}</li>)}
                  </ul>
                </Reveal>
              )}

              <Reveal className="outcome">
                <Target size={18} aria-hidden="true" />
                <div>
                  <span className="eyebrow-sm">What to expect</span>
                  <p>{s.outcome}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="container">
          <Reveal className="inline-cta">
            <div>
              <h2 className="h3">Not sure where your workflow fits?</h2>
              <p className="muted">Most projects blend several of these. Describe the problem and we'll recommend the right approach — including when automation isn't the answer.</p>
            </div>
            <Button to="/contact" arrow>Describe your workflow</Button>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
