export const ATTRIBUTION_KEY = "forge.attribution";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"] as const;

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  referrer?: string;
  landing_path?: string;
}

export type AttributionStorage = Pick<Storage, "getItem" | "setItem">;

const MAX_LEN = 200;

export function parseAttribution(search: string, referrer: string, landingPath: string): Attribution {
  const params = new URLSearchParams(search);
  const out: Attribution = {};
  for (const k of UTM_KEYS) {
    const v = params.get(k)?.trim().slice(0, MAX_LEN);
    if (v) out[k] = v;
  }
  if (referrer) out.referrer = referrer.slice(0, MAX_LEN);
  if (landingPath) out.landing_path = landingPath.slice(0, MAX_LEN);
  return out;
}

export function serializeAttribution(a: Attribution): string {
  return JSON.stringify(a);
}

export function deserializeAttribution(raw: string | null): Attribution | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    const out: Attribution = {};
    for (const k of [...UTM_KEYS, "referrer", "landing_path"] as const) {
      const v = (parsed as Record<string, unknown>)[k];
      if (typeof v === "string" && v) out[k] = v;
    }
    return out;
  } catch {
    return null;
  }
}

// First touch wins: an existing stored value is never overwritten.
export function saveAttribution(storage: AttributionStorage, a: Attribution): boolean {
  try {
    if (storage.getItem(ATTRIBUTION_KEY) !== null) return false;
    storage.setItem(ATTRIBUTION_KEY, serializeAttribution(a));
    return true;
  } catch {
    return false; // storage unavailable (e.g. privacy mode)
  }
}

export function loadAttribution(storage: AttributionStorage): Attribution | null {
  try {
    return deserializeAttribution(storage.getItem(ATTRIBUTION_KEY));
  } catch {
    return null;
  }
}

// Short human-readable summary for the mailto fallback.
export function formatSource(a: Attribution | null | undefined): string {
  if (!a) return "";
  const utm = [a.utm_source, a.utm_medium, a.utm_campaign].filter(Boolean).join(" / ");
  return utm || a.referrer || "";
}

export function captureAttribution(): void {
  try {
    saveAttribution(
      window.sessionStorage,
      parseAttribution(window.location.search, document.referrer, window.location.pathname),
    );
  } catch {
    // sessionStorage can throw when blocked; attribution is best-effort.
  }
}

export function getStoredAttribution(): Attribution | null {
  try {
    return loadAttribution(window.sessionStorage);
  } catch {
    return null;
  }
}
