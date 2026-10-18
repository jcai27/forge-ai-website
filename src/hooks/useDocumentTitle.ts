import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { site } from "../config/site";

const DEFAULT_TITLE = "Forge AI — Operational infrastructure for modern businesses";
const DEFAULT_DESC =
  "Forge AI connects your systems, automates repetitive work, and builds intelligent workflows tailored to how your business operates.";

const setMeta = (selector: string, attr: string, value: string) =>
  document.querySelector(selector)?.setAttribute(attr, value);

/** Updates title, description, canonical, and Open Graph tags for the current page. */
export function useDocumentTitle(title?: string, description?: string) {
  const { pathname } = useLocation();
  useEffect(() => {
    const t = title ? `${title} — Forge AI` : DEFAULT_TITLE;
    const d = description || DEFAULT_DESC;
    const url = site.url + (pathname === "/" ? "/" : pathname);
    document.title = t;
    setMeta('meta[name="description"]', "content", d);
    setMeta('meta[property="og:title"]', "content", t);
    setMeta('meta[property="og:description"]', "content", d);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('link[rel="canonical"]', "href", url);
  }, [title, description, pathname]);
}
