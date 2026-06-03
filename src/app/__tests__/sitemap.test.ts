import { describe, it, expect } from "vitest";
import sitemap from "../sitemap";

describe("sitemap", () => {
  const entries = sitemap();

  it("returns a non-empty array", () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  it("generates entries for both locales", () => {
    const urls = entries.map((e) => e.url);
    const hasEn = urls.some((u) => u.includes("/en"));
    const hasTr = urls.some((u) => u.includes("/tr"));
    expect(hasEn).toBe(true);
    expect(hasTr).toBe(true);
  });

  it("includes static pages for each locale", () => {
    const urls = entries.map((e) => e.url);
    const staticPages = ["", "/about", "/projects", "/apps", "/contact", "/privacy"];
    for (const locale of ["en", "tr"]) {
      for (const page of staticPages) {
        expect(urls).toContain(`https://volitanlabs.dev/${locale}${page}`);
      }
    }
  });

  it("includes project entries", () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://volitanlabs.dev/en/projects/focus-space");
    expect(urls).toContain("https://volitanlabs.dev/tr/projects/teknofest-combat-uav");
  });

  it("includes app entries", () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://volitanlabs.dev/en/apps/focus-space");
    expect(urls).toContain("https://volitanlabs.dev/tr/apps/focus-space");
  });

  it("all entries have lastModified dates", () => {
    entries.forEach((entry) => {
      expect(entry.lastModified).toBeInstanceOf(Date);
    });
  });

  it("static entries include alternates with hreflang", () => {
    const staticEntries = entries.filter((e) => e.alternates);
    expect(staticEntries.length).toBeGreaterThan(0);

    const enHome = entries.find(
      (e) => e.url === "https://volitanlabs.dev/en"
    );
    expect(enHome?.alternates?.languages).toEqual({
      en: "https://volitanlabs.dev/en",
      tr: "https://volitanlabs.dev/tr",
    });
  });

  it("generates the correct total number of entries", () => {
    const staticCount = 6 * 2; // 6 pages * 2 locales
    const projectCount = 3 * 2; // 3 projects * 2 locales
    const appCount = 2; // 1 app * 2 locales
    expect(entries).toHaveLength(staticCount + projectCount + appCount);
  });
});
