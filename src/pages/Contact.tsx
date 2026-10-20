import { useMemo, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, CalendarDays, CheckCircle2, Loader2, Mail } from "lucide-react";
import Reveal from "../components/Reveal";
import { site } from "../config/site";
import { solutions } from "../data/solutions";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { buildMailtoHref, submitContact, validate, type FormData } from "../lib/contact";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const industries = ["Technology / startup", "Restaurant or hospitality", "Food distribution", "Professional or field services", "Retail or e-commerce", "Healthcare or wellness", "Other"];
const teamSizes = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"];

const nextSteps = [
  { title: "We read every message", body: "Your note goes to the engineer who would build your solution." },
  { title: "A focused consultation", body: "We learn how the workflow runs today and where the time goes." },
  { title: "An honest recommendation", body: "What we'd automate first, what to leave alone, and what it would involve." },
];

export default function Contact() {
  useDocumentTitle("Contact", "Tell Forge AI where your operations are slowing down, or book a consultation.");
  const [params] = useSearchParams();

  const initial = useMemo<FormData>(() => {
    const sol = params.get("solution");
    return {
      name: "", email: "", company: "", industry: "", teamSize: "",
      interest: solutions.find((s) => s.id === sol)?.title ?? "",
      requestType: params.get("intent") === "consultation" ? "consultation" : "workflow",
      message: "", website: "",
    };
  }, [params]);

  const [data, setData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (data.website) return; // bot
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      window.setTimeout(() => document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus(), 0);
      return;
    }
    const { website: _hp, ...payload } = data;
    void _hp;

    if (site.contactEndpoint) {
      setStatus("sending");
      const res = await submitContact(site.contactEndpoint, payload);
      setStatus(res.ok ? "sent" : "error");
      return;
    }

    // No endpoint configured: hand off to the visitor's email client.
    window.location.href = buildMailtoHref(data, site.email);
    setStatus("mailto");
  };

  const field = (k: keyof FormData) => ({
    id: k,
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
  });

  const Err = ({ k }: { k: keyof FormData }) =>
    errors[k] ? <span id={`${k}-err`} className="field-err"><AlertCircle size={13} aria-hidden="true" />{errors[k]}</span> : null;

  return (
    <section className="page-hero contact-page">
      <div className="page-hero-grid" aria-hidden="true" />
      <div className="container wide contact-layout">
        <Reveal className="contact-aside">
          <span className="label">Contact</span>
          <h1 className="h1">Tell us where your operations are slowing down.</h1>
          <p className="lead">
            Describe the workflow that's taking your team's time. We'll explore what can be automated and what meaningful improvement could look like.
          </p>
          {site.bookingUrl && (
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="booking-card">
              <CalendarDays size={18} aria-hidden="true" />
              <span><strong>Prefer to pick a time?</strong><span className="muted body-sm">Book a consultation directly</span></span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          )}
          <ol className="next-steps">
            {nextSteps.map((s, i) => (
              <li key={s.title}>
                <span className="mono step-num">{String(i + 1).padStart(2, "0")}</span>
                <div><strong>{s.title}</strong><p className="muted body-sm">{s.body}</p></div>
              </li>
            ))}
          </ol>
          <a className="email-line" href={`mailto:${site.email}`}><Mail size={15} aria-hidden="true" />{site.email}</a>
        </Reveal>

        <Reveal delay={0.1} className="form-card">
          <AnimatePresence mode="wait">
            {status === "sent" || status === "mailto" ? (
              <motion.div key="done" className="form-success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} role="status">
                <CheckCircle2 size={36} className="ok" aria-hidden="true" />
                <h2 className="h3">{status === "sent" ? "Thank you — we've received your message." : "Almost there."}</h2>
                <p className="muted">
                  {status === "sent"
                    ? "We'll review your workflow and reply by email to arrange a conversation."
                    : <>Your email app should have opened with your message ready to send. If it didn't, email us directly at <a href={`mailto:${site.email}`}>{site.email}</a>.</>}
                </p>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setData(initial); setStatus("idle"); }}>Send another message</button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <fieldset className="seg form-seg">
                  <legend className="sr-only">What would you like to do?</legend>
                  {([["consultation", "Book a consultation"], ["workflow", "Describe a workflow"]] as const).map(([v, label]) => (
                    <label key={v} className={`seg-btn ${data.requestType === v ? "active" : ""}`}>
                      <input type="radio" name="requestType" value={v} checked={data.requestType === v} onChange={() => set("requestType", v)} />
                      {data.requestType === v && <motion.span layoutId="form-seg" className="seg-bg" transition={{ type: "spring", bounce: 0.15, duration: 0.45 }} />}
                      <span className="seg-text">{label}</span>
                    </label>
                  ))}
                </fieldset>

                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="name">Name <span className="req" aria-hidden="true">*</span></label>
                    <input {...field("name")} autoComplete="name" required value={data.name} onChange={(e) => set("name", e.target.value)} />
                    <Err k="name" />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Work email <span className="req" aria-hidden="true">*</span></label>
                    <input {...field("email")} type="email" autoComplete="email" required value={data.email} onChange={(e) => set("email", e.target.value)} />
                    <Err k="email" />
                  </div>
                  <div className="field">
                    <label htmlFor="company">Company</label>
                    <input {...field("company")} autoComplete="organization" value={data.company} onChange={(e) => set("company", e.target.value)} />
                  </div>
                  <div className="field">
                    <label htmlFor="industry">Industry</label>
                    <select {...field("industry")} value={data.industry} onChange={(e) => set("industry", e.target.value)}>
                      <option value="">Select…</option>
                      {industries.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="teamSize">Company size</label>
                    <select {...field("teamSize")} value={data.teamSize} onChange={(e) => set("teamSize", e.target.value)}>
                      <option value="">Select…</option>
                      {teamSizes.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="interest">Area of interest</label>
                    <select {...field("interest")} value={data.interest} onChange={(e) => set("interest", e.target.value)}>
                      <option value="">Not sure yet</option>
                      {solutions.map((s) => <option key={s.id}>{s.title}</option>)}
                    </select>
                  </div>
                  <div className="field full">
                    <label htmlFor="message">Where are your operations slowing down? <span className="req" aria-hidden="true">*</span></label>
                    <textarea
                      {...field("message")}
                      rows={5}
                      required
                      placeholder="e.g. We re-enter every emailed order into our ERP by hand, then message the warehouse in chat…"
                      value={data.message}
                      onChange={(e) => set("message", e.target.value)}
                    />
                    <Err k="message" />
                  </div>
                  <div className="hp" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => set("website", e.target.value)} />
                  </div>
                </div>

                {status === "error" && (
                  <p className="form-error" role="alert">
                    <AlertCircle size={16} aria-hidden="true" /> Something went wrong sending your message. Please try again or email <a href={`mailto:${site.email}`}>{site.email}</a>.
                  </p>
                )}

                <div className="form-footer">
                  <p className="muted body-sm">Required fields are marked *. We'll only use your details to respond. See our <Link to="/privacy">privacy notice</Link>.</p>
                  <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
                    {status === "sending"
                      ? <><Loader2 size={16} className="spin" aria-hidden="true" /><span>Sending…</span></>
                      : <><span>{data.requestType === "consultation" ? "Request a consultation" : "Send message"}</span><ArrowRight size={15} className="btn-arrow" aria-hidden="true" /></>}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
