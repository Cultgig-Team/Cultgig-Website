import { useEffect } from "react";
import { pageDescriptions, siteConfig } from "../config/site";
const defaultDescription =
  "Cultgig helps independent artists create a profile and get discovered by the people who need their work.";
export function usePageMeta(title: string, description = pageDescriptions[title] ?? defaultDescription) {
  useEffect(() => {
    document.title = `${title} | Cultgig`;
    const set = (key: string, content: string, property = false) => {
      let el = document.head.querySelector(
        `meta[${property ? "property" : "name"}="${key}"]`,
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(property ? "property" : "name", key);
        document.head.append(el);
      }
      el.content = content;
    };
    set("description", description);
    set("og:title", `${title} | Cultgig`, true);
    set("og:description", description, true);
    set("og:type", "website", true);
    set("og:image", `${window.location.origin}/og-image.jpg`, true);
    set("twitter:card", "summary_large_image");
    set("twitter:title", `${title} | Cultgig`);
    set("twitter:description", description);
    set("twitter:image", `${window.location.origin}/og-image.jpg`);
    set("og:url", window.location.href, true);
    let structuredData = document.head.querySelector<HTMLScriptElement>('script[data-cultgig-schema="true"]');
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.type = "application/ld+json";
      structuredData.dataset.cultgigSchema = "true";
      document.head.append(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: window.location.origin,
      description,
    });
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = `${window.location.origin}${window.location.pathname}`;
  }, [title, description]);
}
