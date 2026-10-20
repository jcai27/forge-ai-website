// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ATTRIBUTION_KEY,
  captureAttribution,
  deserializeAttribution,
  formatSource,
  getStoredAttribution,
  loadAttribution,
  parseAttribution,
  saveAttribution,
  serializeAttribution,
  type AttributionStorage,
} from "./attribution";
import { buildMailtoHref, submitContact, type FormData } from "./contact";

function memoryStorage(): AttributionStorage & { data: Map<string, string> } {
  const data = new Map<string, string>();
  return {
    data,
    getItem: (k) => data.get(k) ?? null,
    setItem: (k, v) => void data.set(k, v),
  };
}

describe("parseAttribution", () => {
  it("reads utm params, gclid, referrer and landing path", () => {
    expect(
      parseAttribution("?utm_source=x&utm_medium=cpc&utm_campaign=y&utm_term=t&utm_content=c&gclid=g&other=1", "https://google.com/", "/"),
    ).toEqual({
      utm_source: "x", utm_medium: "cpc", utm_campaign: "y", utm_term: "t", utm_content: "c", gclid: "g",
      referrer: "https://google.com/", landing_path: "/",
    });
  });

  it("omits missing and blank values", () => {
    expect(parseAttribution("?utm_source=&utm_medium=%20", "", "/about")).toEqual({ landing_path: "/about" });
  });

  it("truncates very long values", () => {
    expect(parseAttribution(`?utm_source=${"a".repeat(500)}`, "", "/").utm_source).toHaveLength(200);
  });
});

describe("serialize / deserialize", () => {
  it("round-trips", () => {
    const a = { utm_source: "x", landing_path: "/" };
    expect(deserializeAttribution(serializeAttribution(a))).toEqual(a);
  });

  it.each([null, "", "not json", "[]", "null", "5"])("returns null for %j", (raw) => {
    expect(deserializeAttribution(raw)).toBeNull();
  });

  it("drops unknown and non-string fields", () => {
    expect(deserializeAttribution('{"utm_source":"x","evil":"y","gclid":5}')).toEqual({ utm_source: "x" });
  });
});

describe("saveAttribution (first touch)", () => {
  it("stores once and never overwrites", () => {
    const s = memoryStorage();
    expect(saveAttribution(s, { utm_source: "x", utm_campaign: "y", landing_path: "/" })).toBe(true);
    expect(saveAttribution(s, { landing_path: "/contact" })).toBe(false);
    expect(loadAttribution(s)).toEqual({ utm_source: "x", utm_campaign: "y", landing_path: "/" });
  });

  it("returns null when nothing is stored", () => {
    expect(loadAttribution(memoryStorage())).toBeNull();
  });

  it("does not throw when storage throws", () => {
    const broken: AttributionStorage = {
      getItem: () => { throw new Error("blocked"); },
      setItem: () => { throw new Error("blocked"); },
    };
    expect(saveAttribution(broken, {})).toBe(false);
    expect(loadAttribution(broken)).toBeNull();
    expect(ATTRIBUTION_KEY).toBeTruthy();
  });
});

describe("captureAttribution / getStoredAttribution", () => {
  afterEach(() => vi.unstubAllGlobals());

  function stubBrowser(search: string, pathname: string, referrer = "") {
    const storage = memoryStorage();
    vi.stubGlobal("window", { sessionStorage: storage, location: { search, pathname } });
    vi.stubGlobal("document", { referrer });
    return storage;
  }

  it("captures the landing URL once and keeps it across later navigation", () => {
    stubBrowser("?utm_source=x&utm_campaign=y", "/", "https://g.test/");
    captureAttribution();
    expect(getStoredAttribution()).toEqual({
      utm_source: "x", utm_campaign: "y", referrer: "https://g.test/", landing_path: "/",
    });

    vi.stubGlobal("window", { ...window, location: { search: "", pathname: "/contact" } });
    captureAttribution();
    expect(getStoredAttribution()?.utm_source).toBe("x");
    expect(getStoredAttribution()?.landing_path).toBe("/");
  });

  it("returns null and does not throw when sessionStorage is unavailable", () => {
    vi.stubGlobal("window", {
      get sessionStorage(): never { throw new Error("blocked"); },
      location: { search: "", pathname: "/" },
    });
    vi.stubGlobal("document", { referrer: "" });
    expect(() => captureAttribution()).not.toThrow();
    expect(getStoredAttribution()).toBeNull();
  });
});

describe("submitContact payload", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("sends attribution fields in the POST body and drops the honeypot", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const payload = {
      name: "Ada", email: "ada@example.com", company: "", industry: "", teamSize: "", interest: "",
      requestType: "workflow" as const, message: "We re-enter orders by hand.", website: "bot",
      utm_source: "x", utm_campaign: "y",
    };
    expect(await submitContact("https://form.test/e", payload)).toEqual({ ok: true });
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.utm_source).toBe("x");
    expect(body.utm_campaign).toBe("y");
    expect(body).not.toHaveProperty("website");
  });
});

describe("mailto source line", () => {
  const form: FormData = {
    name: "Ada", email: "ada@example.com", company: "", industry: "", teamSize: "", interest: "",
    requestType: "workflow", message: "We re-enter orders by hand.", website: "",
  };
  const bodyOf = (href: string) => new URL(href).searchParams.get("body");

  it("prefers utm values, then referrer", () => {
    expect(formatSource({ utm_source: "x", utm_campaign: "y" })).toBe("x / y");
    expect(formatSource({ referrer: "https://g.test/" })).toBe("https://g.test/");
    expect(formatSource({ landing_path: "/" })).toBe("");
    expect(formatSource(null)).toBe("");
  });

  it("appends Source when attribution exists", () => {
    expect(bodyOf(buildMailtoHref(form, "hi@forge.test", { utm_source: "x", utm_campaign: "y" }))).toContain("Source: x / y");
  });

  it("is unchanged without attribution", () => {
    expect(bodyOf(buildMailtoHref(form, "hi@forge.test"))).toBe("Name: Ada\nEmail: ada@example.com\n\nWe re-enter orders by hand.");
    expect(bodyOf(buildMailtoHref(form, "hi@forge.test", null))).not.toContain("Source");
  });
});
