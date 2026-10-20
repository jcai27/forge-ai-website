import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { ROUTES } from "./src/routes";

// GitHub Pages returns 404 for deep links without a matching file, so emit dist/<route>/index.html.
function perRouteIndex(): Plugin {
  let outDir = "dist";
  return {
    name: "per-route-index",
    apply: "build",
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const source = resolve(outDir, "index.html");
      const html = readFileSync(source, "utf8");
      for (const route of ROUTES) {
        const dir = resolve(outDir, route);
        mkdirSync(dir, { recursive: true });
        const target = resolve(dir, "index.html");
        copyFileSync(source, target);
        const canonical = (url: string) => `${url.replace(/\/$/, "")}/${route}`;
        writeFileSync(
          target,
          html
            .replace(/(<link rel="canonical" href=")([^"]*)(")/, (_m, a, url, c) => a + canonical(url) + c)
            .replace(/(<meta property="og:url" content=")([^"]*)(")/, (_m, a, url, c) => a + canonical(url) + c),
        );
      }
    },
  };
}

export default defineConfig({
  // Served from a sub-path on GitHub Pages (e.g. /forge-ai-website/); "/" everywhere else.
  base: process.env.BASE_PATH || "/",
  plugins: [react(), perRouteIndex()],
});
