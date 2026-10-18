import { site } from "../config/site";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function Privacy() {
  useDocumentTitle("Privacy");
  return (
    <section className="page-hero">
      <div className="container prose">
        <span className="eyebrow">Legal</span>
        <h1 className="h1">Privacy notice</h1>
        <p className="muted">Last updated {new Date(2026, 9, 18).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

        <h2 className="h4">What we collect</h2>
        <p>When you contact us, we collect the information you choose to provide — such as your name, email address, company, and a description of your workflow. We don't sell personal information.</p>

        <h2 className="h4">How we use it</h2>
        <p>We use the information you submit only to respond to your inquiry, schedule conversations, and provide services you request.</p>

        <h2 className="h4">Client data</h2>
        <p>Data we access while building systems for clients is handled under the terms agreed with each client, using least-privilege access and only for the purpose of delivering the agreed work.</p>

        <h2 className="h4">Retention & your choices</h2>
        <p>You can ask us at any time to access, correct, or delete the information you've shared with us.</p>

        <h2 className="h4">Contact</h2>
        <p>Questions about privacy? Email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
      </div>
    </section>
  );
}
