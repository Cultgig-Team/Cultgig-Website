import { useEffect } from "react";
import { pageDescriptions, siteConfig } from "../config/site";
import { detailedFaqList } from "../content/faq";

const defaultDescription =
  "Cultgig is the two-sided creative marketplace connecting verified independent artists with event hosts, venues, and businesses across India. Book with confidence.";

export function usePageMeta(
  title: string,
  description = pageDescriptions[title] ?? defaultDescription,
  pageType: "website" | "faq" = "website"
) {
  useEffect(() => {
    document.title = `${title} | Cultgig`;

    const set = (key: string, content: string, property = false) => {
      let el = document.head.querySelector(
        `meta[${property ? "property" : "name"}="${key}"]`
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

    // Canonical link
    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = `${window.location.origin}${window.location.pathname}`;

    // Structured JSON-LD Schema
    let structuredData = document.head.querySelector<HTMLScriptElement>(
      'script[data-cultgig-schema="true"]'
    );
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.type = "application/ld+json";
      structuredData.dataset.cultgigSchema = "true";
      document.head.append(structuredData);
    }

    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: window.location.origin,
      logo: `${window.location.origin}/og-image.jpg`,
      description,
      sameAs: [
        siteConfig.socialLinks.instagram,
        siteConfig.socialLinks.linkedin,
        siteConfig.socialLinks.youtube,
      ].filter(Boolean),
    };

    if (pageType === "faq" || title.includes("FAQ")) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: detailedFaqList.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      };
      structuredData.textContent = JSON.stringify([orgSchema, faqSchema]);
    } else {
      const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        url: window.location.origin,
        potentialAction: {
          "@type": "SearchAction",
          target: `${window.location.origin}/#discover-artists?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      };
      structuredData.textContent = JSON.stringify([orgSchema, websiteSchema]);
    }
  }, [title, description, pageType]);
}
