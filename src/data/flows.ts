import type { LucideIcon } from "lucide-react";
import {
  Inbox, Sparkles, Boxes, Bell, MessageSquare, Search, PenTool, UserCheck, FileText, ClipboardList,
  GitBranch, BarChart3, Users, Package, LineChart, RefreshCw, Contact, ShieldCheck, FilePlus2,
} from "lucide-react";

export interface FlowStep {
  label: string;
  system: string;
  icon: LucideIcon;
  /** Activity log line written when this step completes. */
  log: string;
  /** Human-in-the-loop step: rendered as "awaiting review" before completing. */
  approval?: boolean;
  /** Steps sharing a stage run in parallel. Defaults to the step's index. */
  stage?: number;
  /** Optional technical detail (tool call) shown in execution logs. */
  call?: string;
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

/** Hero command center: a branching order-intake workflow. Positions live in HeroCommandCenter. */
export const commandFlow: Flow = {
  id: "order-intake",
  tab: "Order intake",
  title: "Order intake",
  summary: "Emailed purchase orders extracted, verified, and entered — with review over a threshold.",
  record: {
    label: "Purchase order",
    ref: () => `PO-${rand(20400, 20999)}`,
    fields: [["Source", "orders@ inbox"], ["Lines", "14"], ["Value", "$4,820.00"]],
  },
  steps: [
    { label: "Order email received", system: "Email", icon: Inbox, stage: 0, log: "PDF purchase order received", call: "email.watch(orders@)" },
    { label: "Extract line items", system: "Forge agent", icon: Sparkles, stage: 1, log: "14 line items extracted · confidence 0.98", call: "agent.extract(po.pdf)" },
    { label: "Check inventory", system: "ERP", icon: Boxes, stage: 2, log: "All 14 SKUs available", call: "erp.inventory.check(14)" },
    { label: "Match customer", system: "CRM", icon: Contact, stage: 2, log: "Account matched · terms Net 30", call: "crm.accounts.find(domain)" },
    { label: "Threshold review", system: "Rules", icon: ShieldCheck, stage: 3, log: "Under $10k threshold · auto-approved", call: "rules.eval(order.value)" },
    { label: "Create sales order", system: "ERP", icon: FilePlus2, stage: 4, log: "Sales order created and allocated", call: "erp.orders.create()" },
    { label: "Notify warehouse", system: "Team chat", icon: Bell, stage: 4, log: "#fulfillment notified with pick list", call: "chat.post(#fulfillment)" },
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
      fields: [["From", "Existing account"], ["Subject", "Change delivery window"], ["Channel", "Email"]],
    },
    steps: [
      { label: "Incoming inquiry", system: "Shared inbox", icon: MessageSquare, log: "New message received in support inbox" },
      { label: "AI categorization", system: "Forge agent", icon: Sparkles, log: "Classified: delivery change · priority normal" },
      { label: "CRM lookup", system: "CRM", icon: Search, log: "Account found · 2 open orders" },
      { label: "Response draft", system: "Forge agent", icon: PenTool, log: "Reply drafted from account context and policy" },
      { label: "Human approval", system: "Support team", icon: UserCheck, log: "Approved by support · reply sent", approval: true },
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
      { label: "Candidate tracking", system: "Applicant tracking", icon: ClipboardList, log: "Added to pipeline · confirmation sent" },
      { label: "Work-trial assignment", system: "Code + issues", icon: GitBranch, log: "Scoped repository and 3 issues provisioned" },
      { label: "Evaluation summary", system: "Forge agent", icon: BarChart3, log: "Rubric-based summary prepared" },
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
      fields: [["Account", "Wholesale customer"], ["Lines", "22"], ["Ship", "Next-day route"]],
    },
    steps: [
      { label: "New order", system: "Ordering portal", icon: Package, log: "Order submitted · 22 line items" },
      { label: "Availability check", system: "Inventory", icon: Boxes, log: "21 in stock · 1 backorder proposed" },
      { label: "Forecast update", system: "Forecast model", icon: LineChart, log: "Weekly demand forecast adjusted for 3 SKUs" },
      { label: "ERP synchronization", system: "ERP", icon: RefreshCw, log: "Order and allocations synced" },
      { label: "Operations notified", system: "Team chat", icon: Bell, log: "Ops notified · reorder suggestion attached" },
    ],
  },
];
