import { describe, it, expect, vi } from "vitest";

vi.mock("#velite", () => ({
  posts: [
    {
      slug: "blog/en/hello-world",
      locale: "en",
      title: "Hello World",
      description: "First post",
      date: "2024-06-01T00:00:00.000Z",
      published: true,
      tags: ["intro"],
    },
    {
      slug: "blog/tr/merhaba-dunya",
      locale: "tr",
      title: "Merhaba Dunya",
      description: "Ilk yazi",
      date: "2024-06-02T00:00:00.000Z",
      published: true,
      tags: ["giris"],
    },
    {
      slug: "blog/en/draft-post",
      locale: "en",
      title: "Draft",
      description: "Not published",
      date: "2024-07-01T00:00:00.000Z",
      published: false,
      tags: [],
    },
    {
      slug: "blog/en/older-post",
      locale: "en",
      title: "Older Post",
      description: "An older post",
      date: "2024-01-15T00:00:00.000Z",
      published: true,
      tags: ["tech"],
    },
  ],
}));

import {
  getPostsByLocale,
  getPostBySlug,
  getAllPostSlugs,
} from "../content";

describe("getPostsByLocale", () => {
  it("returns only published posts for a given locale", () => {
    const enPosts = getPostsByLocale("en");
    expect(enPosts).toHaveLength(2);
    expect(enPosts.every((p) => p.locale === "en" && p.published)).toBe(true);
  });

  it("sorts posts by date descending (newest first)", () => {
    const enPosts = getPostsByLocale("en");
    expect(enPosts[0].title).toBe("Hello World");
    expect(enPosts[1].title).toBe("Older Post");
  });

  it("returns Turkish posts for 'tr' locale", () => {
    const trPosts = getPostsByLocale("tr");
    expect(trPosts).toHaveLength(1);
    expect(trPosts[0].title).toBe("Merhaba Dunya");
  });

  it("returns empty array for unknown locale", () => {
    expect(getPostsByLocale("fr")).toEqual([]);
  });
});

describe("getPostBySlug", () => {
  it("finds a post by slug suffix and locale", () => {
    const post = getPostBySlug("hello-world", "en");
    expect(post).toBeDefined();
    expect(post!.title).toBe("Hello World");
  });

  it("returns undefined for unpublished post", () => {
    const post = getPostBySlug("draft-post", "en");
    expect(post).toBeUndefined();
  });

  it("returns undefined for wrong locale", () => {
    const post = getPostBySlug("hello-world", "tr");
    expect(post).toBeUndefined();
  });

  it("returns undefined for nonexistent slug", () => {
    expect(getPostBySlug("nonexistent", "en")).toBeUndefined();
  });
});

describe("getAllPostSlugs", () => {
  it("returns slugs of all published posts", () => {
    const slugs = getAllPostSlugs();
    expect(slugs).toHaveLength(3);
  });

  it("extracts the final slug segment", () => {
    const slugs = getAllPostSlugs();
    const slugValues = slugs.map((s) => s.slug);
    expect(slugValues).toContain("hello-world");
    expect(slugValues).toContain("merhaba-dunya");
    expect(slugValues).toContain("older-post");
  });

  it("excludes unpublished posts", () => {
    const slugs = getAllPostSlugs();
    const slugValues = slugs.map((s) => s.slug);
    expect(slugValues).not.toContain("draft-post");
  });

  it("includes locale information", () => {
    const slugs = getAllPostSlugs();
    const enSlugs = slugs.filter((s) => s.locale === "en");
    const trSlugs = slugs.filter((s) => s.locale === "tr");
    expect(enSlugs).toHaveLength(2);
    expect(trSlugs).toHaveLength(1);
  });
});
