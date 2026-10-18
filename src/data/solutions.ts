import type { LucideIcon } from "lucide-react";
import { Workflow, Cable, Cpu, LineChart, Users } from "lucide-react";

export type PreviewKey = "builder" | "integrations" | "agent" | "analytics" | "hiring";

export interface Solution {
  id: string;
  icon: LucideIcon;
  preview: PreviewKey;
  title: string;
  /** One-line summary used in lists. */
  short: string;
  /** Short declarative value statement. */
  value: string;
  highlights: string[];
  overview: string;
  challenges: string[];
  workflows: { title: string; steps: string[] }[];
  /** Categories of systems — never implies a pre-built connector. */
  systems: string[];
  outcome: string;
  safeguards?: string[];
}

export const solutions: Solution[] = [
  {
    id: "workflow-automation",
    icon: Workflow,
    preview: "builder",
    title: "Workflow Automation",
    short: "Automate repetitive administrative and operational processes.",
    value: "Spend less time moving information and more time running the business.",
    highlights: [
      "Invoices, orders, and requests processed from email and forms",
      "Approvals routed, reminded, and recorded automatically",
      "Event-driven actions with retries, validation, and audit logs",
    ],
    overview:
      "Most operational drag comes from small, repeated tasks: re-keying data, chasing approvals, forwarding documents, updating the same record in three places. We map these flows end to end and replace manual hand-offs with automations that run on events, schedules, or requests — with logs that show exactly what happened and why.",
    challenges: [
      "Hours each week spent copying data between tools",
      "Orders and invoices arriving in inconsistent formats",
      "Approvals stalled in inboxes with no visibility",
      "Errors introduced by manual re-entry",
    ],
    workflows: [
      { title: "Invoice intake", steps: ["Invoice arrives by email", "Fields extracted and validated", "Matched to purchase order", "Posted to accounting", "Exceptions routed for review"] },
      { title: "Order processing", steps: ["Order received", "Customer and items verified", "Order created", "Confirmation sent", "Team notified"] },
      { title: "Approval routing", steps: ["Request submitted", "Rules select approver", "Reminder if idle", "Decision recorded", "Downstream action triggered"] },
    ],
    systems: ["Email & shared inboxes", "Spreadsheets", "Accounting", "Team chat", "Forms & portals", "Internal databases"],
    outcome: "Fewer manual hand-offs, fewer re-entry errors, and a complete record of routine work — so your team spends its time on judgment, not copy and paste.",
  },
  {
    id: "systems-integration",
    icon: Cable,
    preview: "integrations",
    title: "Systems Integration",
    short: "Connect existing business tools into unified workflows.",
    value: "Your software should work together, not create more work.",
    highlights: [
      "CRM, ERP, and accounting kept consistent",
      "APIs and webhooks replace manual exports",
      "Monitoring and alerts when a sync needs attention",
    ],
    overview:
      "Growing companies accumulate tools faster than they connect them. We design integrations that move data reliably between systems — with validation, retries, monitoring, and alerting — so information entered once appears everywhere it is needed.",
    challenges: [
      "The same customer or order living in several systems with different values",
      "Weekly CSV exports and imports to keep tools aligned",
      "Brittle scripts nobody wants to touch",
      "No alert when a sync quietly fails",
    ],
    workflows: [
      { title: "CRM ↔ accounting", steps: ["Deal marked won", "Customer created in accounting", "Invoice generated", "Payment status synced back", "Account owner notified"] },
      { title: "Order pipeline", steps: ["Order placed", "Validated and enriched", "Pushed to ERP", "Fulfillment status returned", "Customer updated"] },
    ],
    systems: ["CRM", "ERP", "Accounting", "E-commerce", "Project management", "REST APIs & webhooks"],
    outcome: "Consistent data across your tools, far less manual reconciliation, and monitoring that tells you when something needs attention.",
  },
  {
    id: "ai-agents",
    icon: Cpu,
    preview: "agent",
    title: "AI Agents",
    short: "Deploy intelligent agents that execute defined business tasks.",
    value: "Capable automation with scoped permissions, traceability, and a person in the loop.",
    highlights: [
      "Inquiry triage with drafted, reviewable responses",
      "Document extraction and classification",
      "Internal assistants grounded in your own knowledge",
    ],
    overview:
      "Some work requires reading, interpreting, and deciding what to do next. We build agents that handle these multistep tasks using your data and tools — within defined boundaries. Every agent ships with scoped permissions, logged actions, confidence thresholds, and approval gates wherever the stakes call for one.",
    challenges: [
      "Queues that must be read before anyone can act",
      "Knowledge scattered across documents and people",
      "Unstructured documents that need sorting and extraction",
      "Concern about AI acting without oversight",
    ],
    workflows: [
      { title: "Inquiry triage", steps: ["Message received", "Intent and urgency classified", "Customer record retrieved", "Response drafted", "Person approves and sends"] },
      { title: "Document classification", steps: ["Documents uploaded", "Type identified", "Key fields extracted", "Low-confidence items routed to review", "Records filed"] },
    ],
    systems: ["Help desk", "CRM", "Document storage", "Knowledge bases", "LLM providers", "Internal APIs"],
    outcome: "Faster handling of read-and-respond work, with every action traceable and every consequential decision reviewed by a person.",
    safeguards: [
      "Agents only access the tools and data they are granted",
      "Every step and tool call is logged",
      "Approval gates before consequential actions",
      "Uncertain cases routed to people",
    ],
  },
  {
    id: "operational-analytics",
    icon: LineChart,
    preview: "analytics",
    title: "Operational Analytics",
    short: "Turn fragmented operational data into useful insight.",
    value: "Better decisions without hours of spreadsheet assembly.",
    highlights: [
      "KPI reports compiled and delivered automatically",
      "Demand and inventory forecasting",
      "Anomaly detection on operational metrics",
    ],
    overview:
      "Many teams spend the start of every week assembling the same reports by hand. We build pipelines that gather operational data, model what matters — from KPIs to demand forecasts — and deliver it where your team will actually read it.",
    challenges: [
      "Recurring reports assembled by hand from several sources",
      "Inventory decisions made on stale numbers",
      "Problems noticed only after they become expensive",
      "Dashboards nobody trusts",
    ],
    workflows: [
      { title: "Weekly operating summary", steps: ["Data pulled from source systems", "Metrics calculated", "Changes highlighted", "Summary drafted", "Delivered to leadership"] },
      { title: "Demand forecasting", steps: ["Sales history collected", "Seasonality modeled", "Forecast generated", "Reorder suggestions produced", "Buyer reviews"] },
    ],
    systems: ["Data warehouses", "ERP & point of sale", "Spreadsheets", "BI tools", "Email & chat delivery"],
    outcome: "Reports that arrive on time without manual assembly, forecasts your team can interrogate, and earlier warning when numbers move unexpectedly.",
  },
  {
    id: "hiring-operations",
    icon: Users,
    preview: "hiring",
    title: "Hiring Operations",
    short: "Streamline screening, technical work trials, and evaluations.",
    value: "A structured, fair process — with people making every hiring decision.",
    highlights: [
      "Scoped technical work trials in controlled environments",
      "Structured evaluation summaries for reviewers",
      "Scheduling, communication, and onboarding logistics",
    ],
    overview:
      "Hiring involves a great deal of coordination. We automate the logistics and build practical work-trial systems where candidates complete realistic, scoped assignments in controlled environments. AI can organize and summarize evidence for your team — your team makes the decisions.",
    challenges: [
      "Applicants tracked across spreadsheets and inboxes",
      "Days of scheduling back-and-forth",
      "Inconsistent evaluation criteria across interviewers",
      "Take-home assignments that are hard to administer fairly",
    ],
    workflows: [
      { title: "Engineering work trial", steps: ["Candidate accepts trial", "Repository and issues provisioned", "Work submitted for review", "Rubric-based summary prepared", "Hiring team decides"] },
      { title: "Applicant coordination", steps: ["Application received", "Tracked in pipeline", "Next steps sent", "Interviews scheduled", "Feedback collected"] },
    ],
    systems: ["Applicant tracking", "Code hosting", "Issue tracking", "Calendars", "Team chat", "HR systems"],
    outcome: "Less coordination overhead, a more consistent candidate experience, and better-organized evidence for the people making hiring decisions.",
    safeguards: [
      "AI never makes employment decisions — people do",
      "Job-relevant criteria applied consistently",
      "Candidate data access limited and logged",
      "Isolated, time-boxed trial environments",
    ],
  },
];
