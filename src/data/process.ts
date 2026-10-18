import type { LucideIcon } from "lucide-react";
import { Compass, Target, Search, ClipboardList, Code2, Rocket, Activity } from "lucide-react";

export const processSteps = [
  { num: "01", title: "Discover", body: "We learn how your business operates and identify where manual work is costing you time." },
  { num: "02", title: "Design", body: "We map the workflow and recommend the right automation architecture." },
  { num: "03", title: "Build", body: "We implement and integrate the solution with your existing systems." },
  { num: "04", title: "Improve", body: "We monitor performance, refine workflows, and help your automations evolve." },
];

export interface Phase {
  icon: LucideIcon;
  stage: string;
  title: string;
  body: string;
  activities: string[];
  youGet: string;
}

export const phases: Phase[] = [
  {
    icon: Compass,
    stage: "Discover",
    title: "Discovery & workflow mapping",
    body: "We start with conversations, not code. We sit with the people doing the work, learn how requests flow through your business, and document each step — including the workarounds nobody wrote down.",
    activities: ["Interviews with the people closest to the work", "Walkthroughs of the tools and documents involved", "A map of each workflow, its hand-offs, and its pain points"],
    youGet: "A clear picture of how work actually moves through your operations.",
  },
  {
    icon: Target,
    stage: "Discover",
    title: "Identifying high-value opportunities",
    body: "Not everything should be automated. We look for work that is frequent, rule-heavy, error-prone, or blocking growth, and weigh it against the effort and risk of automating it.",
    activities: ["Estimating time spent and frequency for each task", "Ranking opportunities by value and complexity", "Flagging steps that should stay with people"],
    youGet: "A prioritized shortlist of where automation will matter most.",
  },
  {
    icon: Search,
    stage: "Design",
    title: "Feasibility & integration assessment",
    body: "We review the systems involved — APIs, data quality, access, and security requirements — to confirm what can be built reliably and where the constraints are.",
    activities: ["Reviewing APIs, exports, and access options", "Checking data quality and edge cases", "Identifying security, privacy, and compliance needs"],
    youGet: "Confidence that the recommended approach will work with your stack.",
  },
  {
    icon: ClipboardList,
    stage: "Design",
    title: "Solution proposal & scope",
    body: "We recommend an architecture and a clearly scoped first phase, with defined success criteria so everyone agrees on what “working” means before anything is built.",
    activities: ["Architecture and workflow design", "Scope, milestones, and responsibilities", "Measurable success criteria for the first phase"],
    youGet: "A written proposal with scope, timeline, and how success will be measured.",
  },
  {
    icon: Code2,
    stage: "Build",
    title: "Development & testing",
    body: "We build incrementally and test against real examples from your business — including the messy ones. You see progress early and often, and give feedback before anything goes live.",
    activities: ["Iterative builds with regular check-ins", "Testing with real historical data and edge cases", "Approval steps, logging, and error handling built in"],
    youGet: "A working system validated against your actual workflows.",
  },
  {
    icon: Rocket,
    stage: "Build",
    title: "Deployment & training",
    body: "We roll out carefully — often alongside the existing process at first — and make sure your team understands what the system does, how to review its work, and what to do when something looks off.",
    activities: ["Staged rollout with a fallback plan", "Team walkthroughs and plain-language documentation", "Clear ownership and escalation paths"],
    youGet: "A system your team trusts and knows how to work with.",
  },
  {
    icon: Activity,
    stage: "Improve",
    title: "Monitoring & iteration",
    body: "Automations need care as your business changes. We monitor performance against the agreed criteria, fix issues, and extend what works to the next workflow when you're ready.",
    activities: ["Monitoring, alerting, and run history", "Regular reviews against success criteria", "Refinements and expansion to new workflows"],
    youGet: "Automation that keeps working — and grows with you.",
  },
];
