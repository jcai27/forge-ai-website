import { formatSource, type Attribution } from "./attribution";

export type RequestType = "consultation" | "workflow";

export interface FormData {
  name: string;
  email: string;
  company: string;
  industry: string;
  teamSize: string;
  interest: string;
  requestType: RequestType;
  message: string;
  website: string; // honeypot
}

export type FormErrors = Partial<Record<keyof FormData, string>>;

export const SUBMIT_TIMEOUT_MS = 15000;

export function validate(data: FormData): FormErrors {
  const e: FormErrors = {};
  if (!data.name.trim()) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Please enter a valid email address.";
  if (data.message.trim().length < 10) e.message = "Tell us a little about the workflow — a sentence or two is enough.";
  return e;
}

export function buildMailtoHref(data: FormData, email: string, attribution?: Attribution | null): string {
  const subject = `${data.requestType === "consultation" ? "Consultation request" : "Workflow inquiry"} — ${data.company || data.name}`;
  const details: [string, string][] = [
    ["Name", data.name], ["Email", data.email], ["Company", data.company],
    ["Industry", data.industry], ["Team size", data.teamSize], ["Interested in", data.interest],
  ];
  const source = formatSource(attribution);
  if (source) details.push(["Source", source]);
  const body = details.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\n${data.message}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function submitContact(
  endpoint: string,
  payload: Omit<FormData, "website"> & Attribution,
  { timeoutMs = SUBMIT_TIMEOUT_MS }: { timeoutMs?: number } = {},
): Promise<{ ok: boolean }> {
  // Never forward the honeypot field, even if a caller passes it along.
  const { website: _hp, ...safe } = payload as FormData;
  void _hp;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(safe),
      signal: controller.signal,
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  } finally {
    clearTimeout(timer);
  }
}
