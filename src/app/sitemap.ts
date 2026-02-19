import type { MetadataRoute } from "next";

const baseUrl = "https://volitanlabs.dev";
const locales = ["en", "tr"];

const staticPages = [
  "",
  "/about",
  "/projects",
  "/apps",
  "/apps/focus-space",
  "/blog",
  "/contact",
  "/privacy",
];

const blogSlugs = [
  "how-engineering-thinking-shapes-app-development",
  "building-focus-space-flutter-journey",
  "ai-augmented-development-workflow",
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

  const blogEntries = locales.flatMap((locale) =>
    blogSlugs.map((slug) => ({
      url: `${baseUrl}/${locale}/blog/${slug}`,
      lastModified: new Date(),
    }))
  );

  const projectEntries = locales.flatMap((locale) =>
    projectSlugs.map((slug) => ({
      url: `${baseUrl}/${locale}/projects/${slug}`,
      lastModified: new Date(),
    }))
  );

  return [...staticEntries, ...blogEntries, ...projectEntries];
}
