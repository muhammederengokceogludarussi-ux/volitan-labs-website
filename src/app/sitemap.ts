import type { MetadataRoute } from "next";

const baseUrl = "https://volitanlabs.dev";
const locales = ["en", "tr"];

const staticPages = [
  "",
  "/about",
  "/projects",
  "/contact",
  "/privacy",
];

const projectSlugs = [
  "focus-space",
  "teknofest-combat-uav",
  "volitan-labs-website",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}${page}`])
        ),
      },
    }))
  );

  const projectEntries = locales.flatMap((locale) =>
    projectSlugs.map((slug) => ({
      url: `${baseUrl}/${locale}/projects/${slug}`,
      lastModified: new Date(),
    }))
  );

  return [...staticEntries, ...projectEntries];
}
