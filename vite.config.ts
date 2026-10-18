import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Served from a sub-path on GitHub Pages (e.g. /forge-ai-website/); "/" everywhere else.
  base: process.env.BASE_PATH || "/",
  plugins: [react()],
});
