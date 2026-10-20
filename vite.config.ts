import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";
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

// Without an endpoint or a real inbox, every lead goes through mailto to the placeholder address.
function warnOnPlaceholderContact(env: Record<string, string>): Plugin {
  return {
    name: "warn-placeholder-contact",
    apply: "build",
    buildStart() {
      if (!env.VITE_CONTACT_ENDPOINT && !env.VITE_CONTACT_EMAIL) {
        this.warn(
          "Neither VITE_CONTACT_ENDPOINT nor VITE_CONTACT_EMAIL is set: every lead will go through mailto to the " +
            "placeholder address hello@forgeai.com. Set one of them before launch (see .env.example).",
        );
      }
    },
  };
}

export default defineConfig(({ mode }) => ({
  // Served from a sub-path on GitHub Pages (e.g. /forge-ai-website/); "/" everywhere else.
  base: process.env.BASE_PATH || "/",
  plugins: [react(), perRouteIndex(), warnOnPlaceholderContact(loadEnv(mode, process.cwd(), "VITE_"))],
}));
