import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";

describe("route list", () => {
  it("matches the <loc> entries in public/sitemap.xml", () => {
    const xml = readFileSync(resolve(__dirname, "../public/sitemap.xml"), "utf8");
    const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((m) => m[1])
      .filter((loc) => !loc.endsWith("/"))
      .map((loc) => new URL(loc).pathname.split("/").pop() as string);
    expect([...paths].sort()).toEqual([...ROUTES].sort());
  });
});
