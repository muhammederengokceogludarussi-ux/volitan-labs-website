import { posts } from "#velite";

export function getPostsByLocale(locale: string) {
  return posts
    .filter((post) => post.locale === locale && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string, locale: string) {
  return posts.find(
    (post) =>
      post.slug.endsWith(slug) && post.locale === locale && post.published
  );
}

export function getAllPostSlugs() {
  return posts
    .filter((post) => post.published)
    .map((post) => ({
      slug: post.slug.split("/").pop()!,
      locale: post.locale,
    }));
}
