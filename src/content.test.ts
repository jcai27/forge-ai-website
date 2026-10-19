import { describe, expect, it } from "vitest";
import { commandFlow, demoFlows } from "./data/flows";
import { solutions } from "./data/solutions";

describe("workflow demo flows", () => {
  it.each([commandFlow, ...demoFlows].map((f) => [f.record.ref(), f] as const))("flow %s has complete steps", (_ref, flow) => {
    expect(flow.steps.length).toBeGreaterThan(0);
    for (const step of flow.steps) {
      expect(step.label).toBeTruthy();
      expect(step.log).toBeTruthy();
    }
  });

  it("generates a record reference on each call", () => {
    for (const flow of [commandFlow, ...demoFlows]) {
      expect(typeof flow.record.ref()).toBe("string");
      expect(flow.record.ref().length).toBeGreaterThan(0);
    }
  });
});

describe("solutions", () => {
  it("has unique ids", () => {
    const ids = solutions.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has the content each page section requires", () => {
    for (const s of solutions) {
      expect(s.title).toBeTruthy();
      expect(s.highlights.length).toBeGreaterThan(0);
      expect(s.workflows.length).toBeGreaterThan(0);
    }
  });
});
