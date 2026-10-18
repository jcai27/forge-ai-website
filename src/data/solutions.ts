import type { LucideIcon } from "lucide-react";
import { Workflow, Cpu, Cable, Users, TrendingUp, Hammer } from "lucide-react";

export interface Solution {
  id: string;
  icon: LucideIcon;
  title: string;
  short: string;
  value: string;
  examples: string[];
  overview: string;
  challenges: string[];
  workflows: { title: string; steps: string[] }[];
  integrations: string[];
  outcome: string;
  safeguards?: string[];
}

export const solutions: Solution[] = [
  {
    id: "workflow-automation",
    icon: Workflow,
    title: "Workflow Automation",
    short: "Eliminate repetitive manual work across the systems your team already uses.",
    value: "Spend less time moving information and more time running your business.",
    examples: [
      "Invoices and orders processed straight from email",
      "Data synced between spreadsheets, CRMs, and internal tools",
      "Routine approvals routed and tracked automatically",
    ],
    overview:
      "Most operational drag comes from small, repeated tasks: re-keying data, chasing approvals, forwarding documents, updating the same record in three places. We map these flows end to end and replace the manual hand-offs with reliable automations that run on events, schedules, or requests — with clear logs so you always know what happened.",
    challenges: [
      "Staff spend hours each week copying data between tools",
      "Orders, invoices, and requests arrive in inconsistent formats",
      "Approvals stall in inboxes with no visibility",
      "Errors creep in from manual re-entry",
    ],
    workflows: [
      {
        title: "Invoice intake",
        steps: ["Invoice arrives by email", "Fields extracted and validated", "Matched to PO", "Posted to accounting", "Exceptions flagged for review"],
      },
      {
        title: "Order processing",
        steps: ["Order received", "Customer and items verified", "Order created in system", "Confirmation sent", "Team notified"],
      },
      {
        title: "Approval routing",
        steps: ["Request submitted", "Rules determine approver", "Reminder if idle", "Decision logged", "Downstream action triggered"],
      },
    ],
    integrations: ["Gmail & Outlook", "Google Sheets & Excel", "Slack & Teams", "QuickBooks & Xero", "Airtable", "Internal databases"],
    outcome:
      "Fewer manual hand-offs, fewer re-entry errors, and a clear audit trail for routine work — so your team spends its time on judgment calls instead of copy-and-paste.",
  },
  {
    id: "ai-agents",
    icon: Cpu,
    title: "AI Agents & Intelligent Workflows",
    short: "Systems that execute multistep tasks using your business context and connected tools.",
    value: "Capable automation with guardrails, traceability, and a human in the loop.",
    examples: [
      "Customer inquiries triaged with drafted responses",
      "Internal knowledge assistants grounded in your docs",
      "Document extraction and classification at scale",
    ],
    overview:
      "Some work requires reading, interpreting, and deciding what to do next. We build AI agents that handle these multistep tasks using your data and tools — but within defined boundaries. Every agent we ship has scoped permissions, logged actions, confidence thresholds, and human approval steps wherever the stakes call for it.",
    challenges: [
      "Inboxes and queues that need reading before anyone can act",
      "Knowledge scattered across documents, wikis, and people",
      "Unstructured documents that need sorting and data extraction",
      "Concern about AI acting without oversight",
    ],
    workflows: [
      {
        title: "Inquiry triage",
        steps: ["Message received", "Intent and urgency classified", "Customer record retrieved", "Response drafted", "Human approves and sends"],
      },
      {
        title: "Document classification",
        steps: ["Documents uploaded", "Type identified", "Key fields extracted", "Low-confidence items routed to review", "Records filed"],
      },
      {
        title: "Operational research",
        steps: ["Question posed", "Relevant sources gathered", "Analysis drafted with citations", "Reviewer checks", "Summary delivered"],
      },
    ],
    integrations: ["Help desks (Zendesk, Intercom, Front)", "CRMs", "Google Drive & SharePoint", "Notion & Confluence", "Leading LLM providers", "Internal APIs"],
    outcome:
      "Faster handling of read-and-respond work, with every action traceable and every consequential decision reviewed by a person.",
    safeguards: [
      "Scoped tool permissions — agents only touch what they are allowed to",
      "Full action logs and audit trails",
      "Human approval gates for consequential steps",
      "Confidence thresholds that route uncertain cases to people",
    ],
  },
  {
    id: "systems-integration",
    icon: Cable,
    title: "Systems Integration",
    short: "Connect the CRMs, ERPs, and tools your business already relies on.",
    value: "Your software should work together, not create more work.",
    examples: [
      "CRM, ERP, and accounting kept in sync",
      "Webhooks and APIs replacing manual exports",
      "One source of truth across fragmented tools",
    ],
    overview:
      "Growing companies accumulate tools faster than they connect them. We design integrations that move data reliably between systems — with retries, validation, monitoring, and alerting — so information entered once shows up everywhere it is needed.",
    challenges: [
      "The same customer or order lives in several systems with different values",
      "Weekly CSV exports and imports to keep tools aligned",
      "Brittle point-to-point scripts nobody wants to touch",
      "No alert when a sync quietly fails",
    ],
    workflows: [
      {
        title: "CRM ↔ accounting sync",
        steps: ["Deal marked won", "Customer created in accounting", "Invoice generated", "Payment status synced back", "Sales notified"],
      },
      {
        title: "ERP order pipeline",
        steps: ["Order placed in storefront", "Validated and enriched", "Pushed to ERP", "Fulfillment status returned", "Customer updated"],
      },
      {
        title: "Project tracking sync",
        steps: ["Contract signed", "Project created", "Tasks provisioned", "Hours synced to billing", "Status reported"],
      },
    ],
    integrations: ["Salesforce & HubSpot", "NetSuite & other ERPs", "QuickBooks & Xero", "Shopify", "Asana, Linear & Jira", "REST APIs & webhooks"],
    outcome:
      "Consistent data across your tools, far less manual reconciliation, and monitoring that tells you when something needs attention.",
  },
  {
    id: "hiring-operations",
    icon: Users,
    title: "Hiring & People Operations",
    short: "Streamlined hiring from screening through evaluation and onboarding.",
    value: "A structured, fair process — with people making every hiring decision.",
    examples: [
      "Structured work trials with GitHub and Linear",
      "AI-assisted screening summaries for human reviewers",
      "Interview scheduling and onboarding checklists",
    ],
    overview:
      "Hiring involves a lot of coordination: tracking applicants, scheduling, collecting feedback, and onboarding. We automate the logistics and build practical work-trial systems where candidates complete realistic, scoped assignments in controlled environments. AI can summarize and organize information for your team, but your team makes the decisions.",
    challenges: [
      "Applicants tracked across spreadsheets and inboxes",
      "Interview scheduling that takes days of back-and-forth",
      "Inconsistent evaluation criteria across interviewers",
      "Take-home assignments that are hard to administer fairly",
    ],
    workflows: [
      {
        title: "Engineering work trial",
        steps: ["Candidate accepts trial", "Scoped repo and Linear issues provisioned", "Work submitted via pull request", "Structured rubric summary prepared", "Hiring team reviews"],
      },
      {
        title: "Applicant coordination",
        steps: ["Application received", "Tracked in pipeline", "Next steps emailed", "Interviews scheduled", "Feedback collected"],
      },
      {
        title: "Onboarding",
        steps: ["Offer accepted", "Accounts requested", "Equipment and docs prepared", "First-week plan shared", "Check-ins scheduled"],
      },
    ],
    integrations: ["GitHub", "Linear", "Greenhouse, Lever & Ashby", "Google Calendar & Outlook", "Slack", "HRIS platforms"],
    outcome:
      "Less coordination overhead, a more consistent candidate experience, and better-organized information for the people making hiring decisions.",
    safeguards: [
      "AI never makes final employment decisions — people do",
      "Structured, job-relevant criteria applied consistently",
      "Candidate data access limited and logged",
      "Isolated, time-boxed environments for work trials",
    ],
  },
  {
    id: "data-forecasting",
    icon: TrendingUp,
    title: "Data, Forecasting & Reporting",
    short: "Turn operational data into decisions without hours of spreadsheet assembly.",
    value: "Better decisions without spending hours assembling spreadsheets.",
    examples: [
      "KPI reports compiled and delivered automatically",
      "Demand and inventory forecasting",
      "Anomaly alerts on operational metrics",
    ],
    overview:
      "Many teams spend the first days of every week or month assembling the same reports by hand. We build data pipelines that gather your operational data, model what matters — from KPIs to demand forecasts — and deliver it where your team will actually read it.",
    challenges: [
      "Recurring reports assembled by hand from several sources",
      "Inventory decisions made on gut feel or stale numbers",
      "Problems noticed only after they become expensive",
      "Dashboards that exist but nobody trusts",
    ],
    workflows: [
      {
        title: "Weekly executive summary",
        steps: ["Data pulled from source systems", "Metrics calculated", "Changes and outliers highlighted", "Summary drafted", "Delivered to leadership"],
      },
      {
        title: "Demand forecasting",
        steps: ["Sales history collected", "Seasonality and trends modeled", "Forecast generated", "Reorder suggestions produced", "Buyer reviews"],
      },
      {
        title: "Anomaly monitoring",
        steps: ["Metrics streamed in", "Compared to expected range", "Unusual change detected", "Context gathered", "Owner alerted"],
      },
    ],
    integrations: ["Data warehouses (BigQuery, Snowflake, Postgres)", "ERPs & POS systems", "Google Sheets & Excel", "Looker Studio, Metabase & Power BI", "Email & Slack delivery"],
    outcome:
      "Reports that arrive on time without manual assembly, forecasts your team can interrogate, and earlier warning when numbers move unexpectedly.",
  },
  {
    id: "custom-solutions",
    icon: Hammer,
    title: "Custom AI Solutions",
    short: "For workflows that don't fit a category, we design and build something tailored.",
    value: "We start with your problem — not with a product we need to sell you.",
    examples: [
      "Internal tools purpose-built for your operations",
      "Industry-specific workflows and logic",
      "Prototypes that prove value before full rollout",
    ],
    overview:
      "Some of the most valuable automation opportunities are specific to how your business works. We begin with the operational problem, evaluate whether AI, conventional software, or a simple process change is the right answer, and build exactly what is needed — nothing more.",
    challenges: [
      "Off-the-shelf tools don't fit your process",
      "A unique bottleneck that no vendor addresses",
      "Uncertainty about whether AI is the right fit",
      "Previous tools that added work instead of removing it",
    ],
    workflows: [
      {
        title: "Scoped prototype",
        steps: ["Problem defined", "Success criteria agreed", "Prototype built", "Tested with real data", "Go / no-go decision"],
      },
      {
        title: "Internal operations tool",
        steps: ["Workflow mapped", "Interface designed", "Integrated with systems", "Team trained", "Iterated with feedback"],
      },
    ],
    integrations: ["Whatever your workflow requires — we work with your existing stack"],
    outcome:
      "A solution shaped around your operations, built incrementally, with clear criteria for whether it is working.",
  },
];
