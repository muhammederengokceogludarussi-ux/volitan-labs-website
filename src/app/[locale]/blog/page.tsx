import { getTranslations } from "next-intl/server";
import { getPostsByLocale } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { BlogPostCard } from "@/components/blog/blog-post-card";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = getPostsByLocale(locale);

  return (
    <Section className="pt-20 md:pt-32">
      <Container>
        <AnimatedSection>
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        </AnimatedSection>

        {posts.length === 0 ? (
          <AnimatedSection delay={0.2}>
            <p className="mt-12 text-center text-text-secondary">
              {t("noPosts")}
            </p>
          </AnimatedSection>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <AnimatedSection key={post.slug} delay={0.1 * (index + 1)}>
                <BlogPostCard
                  slug={post.slug.split("/").pop()!}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  readingTime={post.readingTime ?? 5}
                  tags={post.tags ?? []}
                  readMoreLabel={t("readMore")}
                  minReadLabel={t("minRead")}
                />
              </AnimatedSection>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
