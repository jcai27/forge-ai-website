// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { buildMailtoHref, submitContact, validate, type FormData } from "./contact";

const base: FormData = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "",
  industry: "",
  teamSize: "",
  interest: "",
  requestType: "workflow",
  message: "We re-enter orders by hand.",
  website: "",
};

describe("validate", () => {
  it("accepts a valid form", () => {
    expect(validate(base)).toEqual({});
  });

  it("requires a name", () => {
    expect(validate({ ...base, name: "   " }).name).toBeDefined();
  });

  it.each(["", "ada", "ada@", "ada@example", "a da@example.com"])("rejects email %j", (email) => {
    expect(validate({ ...base, email }).email).toBeDefined();
  });

  it("enforces the minimum message length", () => {
    expect(validate({ ...base, message: "123456789" }).message).toBeDefined();
    expect(validate({ ...base, message: "         123456789   " }).message).toBeDefined();
    expect(validate({ ...base, message: "1234567890" }).message).toBeUndefined();
  });
});

describe("buildMailtoHref", () => {
  it("builds a workflow inquiry with encoded subject and body, omitting empty fields", () => {
    const href = buildMailtoHref({ ...base, company: "Acme & Co" }, "hi@forge.test");
    const url = new URL(href);
    expect(url.protocol).toBe("mailto:");
    expect(url.pathname).toBe("hi@forge.test");
    expect(url.searchParams.get("subject")).toBe("Workflow inquiry — Acme & Co");
    const body = url.searchParams.get("body")!;
    expect(body).toBe("Name: Ada Lovelace\nEmail: ada@example.com\nCompany: Acme & Co\n\nWe re-enter orders by hand.");
    expect(body).not.toContain("Industry");
    expect(href).toContain(encodeURIComponent("Acme & Co"));
  });

  it("uses the consultation subject and falls back to name when no company", () => {
    const href = buildMailtoHref({ ...base, requestType: "consultation", teamSize: "11–50" }, "hi@forge.test");
    const url = new URL(href);
    expect(url.searchParams.get("subject")).toBe("Consultation request — Ada Lovelace");
    expect(url.searchParams.get("body")).toContain("Team size: 11–50");
  });
});

describe("submitContact", () => {
  const { website: _hp, ...payload } = base;
  void _hp;

  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("posts JSON and resolves ok on 2xx, never sending the honeypot", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const res = await submitContact("https://x.test/f", { ...payload, website: "spam" } as never);
    expect(res).toEqual({ ok: true });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://x.test/f");
    expect(init.method).toBe("POST");
    const sent = JSON.parse(init.body);
    expect(sent).toEqual(payload);
    expect("website" in sent).toBe(false);
  });

  it("returns a failure on a non-2xx response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    expect(await submitContact("https://x.test/f", payload)).toEqual({ ok: false });
  });

  it("returns a failure on a network rejection", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));
    expect(await submitContact("https://x.test/f", payload)).toEqual({ ok: false });
  });

  it("aborts and returns a failure when the endpoint hangs", async () => {
    let signal: AbortSignal | undefined;
    vi.stubGlobal(
      "fetch",
      vi.fn((_url: string, init: RequestInit) => {
        signal = init.signal as AbortSignal;
        return new Promise((_resolve, reject) => {
          signal!.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
        });
      }),
    );
    const pending = submitContact("https://x.test/f", payload, { timeoutMs: 5000 });
    await vi.advanceTimersByTimeAsync(4999);
    expect(signal!.aborted).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    expect(signal!.aborted).toBe(true);
    expect(await pending).toEqual({ ok: false });
  });
});
