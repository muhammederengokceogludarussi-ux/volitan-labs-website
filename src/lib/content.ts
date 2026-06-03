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
    .reduce<{ slug: string; locale: string }[]>((acc, post) => {
      const slug = post.slug.split("/").pop();
      if (slug) {
        acc.push({ slug, locale: post.locale });
      }
      return acc;
    }, []);
}
