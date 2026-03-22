import { getTranslations } from "next-intl/server";
import { getPostsByLocale } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { BackgroundGrid } from "@/components/ui/background-grid";

import { BlogPostCard } from "@/components/blog/blog-post-card";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = getPostsByLocale(locale);

  const featuredPost = posts[0];
  const restPosts = posts.slice(1);

  return (
    <Section className="relative overflow-hidden pt-20 md:pt-32">
      <BackgroundGrid variant="dots" />
      <Container className="relative z-10">
        <AnimatedSection>
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        </AnimatedSection>

        {posts.length === 0 ? (
          <AnimatedSection variant="fade" delay={0.1}>
            <p className="mt-12 text-center text-text-secondary">
              {t("noPosts")}
            </p>
          </AnimatedSection>
        ) : (
          <AnimatedSection variant="fade" delay={0.1}>
            {/* Featured first post — full width */}
            {featuredPost && (
              <div className="mt-12">
                <BlogPostCard
                  slug={featuredPost.slug.split("/").pop()!}
                  title={featuredPost.title}
                  description={featuredPost.description}
                  date={featuredPost.date}
                  readingTime={featuredPost.readingTime ?? 5}
                  tags={featuredPost.tags ?? []}
                  readMoreLabel={t("readMore")}
                  minReadLabel={t("minRead")}
                  locale={locale}
                  featured
                />
              </div>
            )}

            {/* Rest of posts — 2-column grid */}
            {restPosts.length > 0 && (
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {restPosts.map((post) => (
                  <BlogPostCard
                    key={post.slug}
                    slug={post.slug.split("/").pop()!}
                    title={post.title}
                    description={post.description}
                    date={post.date}
                    readingTime={post.readingTime ?? 5}
                    tags={post.tags ?? []}
                    readMoreLabel={t("readMore")}
                    minReadLabel={t("minRead")}
                    locale={locale}
                  />
                ))}
              </div>
            )}
          </AnimatedSection>
        )}
      </Container>
    </Section>
  );
}
