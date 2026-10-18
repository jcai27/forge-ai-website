import type { LucideIcon } from "lucide-react";
import {
  Inbox, Sparkles, Boxes, Database, Bell, CheckCircle2, MessageSquare, Search, PenTool, UserCheck,
  FileText, ClipboardList, GitBranch, BarChart3, Users, Package, LineChart, RefreshCw,
} from "lucide-react";

export interface FlowStep {
  label: string;
  system: string;
  icon: LucideIcon;
  /** Activity log line written when this step completes. */
  log: string;
  /** Human-in-the-loop step: rendered as "awaiting approval" before completing. */
  approval?: boolean;
}

export interface Flow {
  id: string;
  tab: string;
  title: string;
  summary: string;
  record: { label: string; ref: () => string; fields: [string, string][] };
  steps: FlowStep[];
}

const rand = (min: number, max: number) => Math.floor(min + Math.random() * (max - min));

export const heroFlow: Flow = {
  id: "orders",
  tab: "Orders",
  title: "Order pipeline",
  summary: "New customer order processed end to end.",
  record: {
    label: "Purchase order",
    ref: () => `PO-${rand(10400, 10999)}`,
    fields: [["Customer", "Harbor Street Market"], ["Lines", "14 items"], ["Channel", "Email · PDF"]],
  },
  steps: [
    { label: "New order", system: "Email inbox", icon: Inbox, log: "Order email received · PDF attached" },
    { label: "AI processing", system: "Forge agent", icon: Sparkles, log: "Extracted 14 line items · confidence 98%" },
    { label: "Inventory check", system: "Warehouse", icon: Boxes, log: "All SKUs available · 1 substitution suggested" },
    { label: "ERP update", system: "ERP", icon: Database, log: "Sales order created and allocated" },
    { label: "Team notified", system: "Slack", icon: Bell, log: "#fulfillment notified with pick list" },
    { label: "Completed", system: "Audit log", icon: CheckCircle2, log: "Run complete · every step logged" },
  ],
};

export const demoFlows: Flow[] = [
  {
    id: "customer",
    tab: "Customer Operations",
    title: "Customer inquiry triage",
    summary: "An inbound inquiry is categorized, enriched with CRM context, and answered — with a person approving the reply.",
    record: {
      label: "Inquiry",
      ref: () => `TKT-${rand(2100, 2999)}`,
      fields: [["From", "Customer · existing account"], ["Subject", "Change delivery window"], ["Channel", "Email"]],
    },
    steps: [
      { label: "Incoming inquiry", system: "Shared inbox", icon: MessageSquare, log: "New message received in support inbox" },
      { label: "AI categorization", system: "Forge agent", icon: Sparkles, log: "Classified: Delivery change · priority normal" },
      { label: "CRM lookup", system: "CRM", icon: Search, log: "Account found · 2 open orders · preferred contact email" },
      { label: "Response draft", system: "Forge agent", icon: PenTool, log: "Reply drafted using account context and policy" },
      { label: "Human approval", system: "Support team", icon: UserCheck, log: "Reviewed and approved by support · reply sent", approval: true },
    ],
  },
  {
    id: "hiring",
    tab: "Hiring Operations",
    title: "Engineering work trial",
    summary: "An application moves through tracking and a scoped work trial, ending with a summary for the hiring team to review.",
    record: {
      label: "Candidate",
      ref: () => `CND-${rand(300, 899)}`,
      fields: [["Role", "Software Engineer"], ["Stage", "Application"], ["Source", "Careers page"]],
    },
    steps: [
      { label: "Application", system: "Careers form", icon: FileText, log: "Application received · resume parsed" },
      { label: "Candidate tracking", system: "ATS", icon: ClipboardList, log: "Added to pipeline · confirmation email sent" },
      { label: "Work-trial assignment", system: "GitHub + Linear", icon: GitBranch, log: "Scoped repo and 3 Linear issues provisioned" },
      { label: "Evaluation summary", system: "Forge agent", icon: BarChart3, log: "Rubric-based summary prepared from submission" },
      { label: "Hiring team review", system: "Hiring team", icon: Users, log: "Hiring team reviewing · decision stays with people", approval: true },
    ],
  },
  {
    id: "inventory",
    tab: "Inventory Operations",
    title: "Order-to-inventory sync",
    summary: "A new order checks availability, updates the demand forecast, syncs to the ERP, and notifies operations.",
    record: {
      label: "Order",
      ref: () => `SO-${rand(58000, 58999)}`,
      fields: [["Account", "Wholesale customer"], ["Lines", "22 items"], ["Ship", "Next-day route"]],
    },
    steps: [
      { label: "New order", system: "Ordering portal", icon: Package, log: "Order submitted · 22 line items" },
      { label: "Availability check", system: "Inventory", icon: Boxes, log: "21 in stock · 1 item short, backorder proposed" },
      { label: "Forecast update", system: "Forecast model", icon: LineChart, log: "Weekly demand forecast adjusted for 3 SKUs" },
      { label: "ERP synchronization", system: "ERP", icon: RefreshCw, log: "Order and allocations synced to ERP" },
      { label: "Operations notified", system: "Slack", icon: Bell, log: "Ops channel notified · reorder suggestion attached" },
    ],
  },
];
