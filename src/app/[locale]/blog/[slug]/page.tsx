import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getPostBySlug, getAllPostSlugs } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { BlogPostContent } from "@/components/blog/blog-post-content";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";

export async function generateStaticParams() {
  return getAllPostSlugs().map(({ slug, locale }) => ({
    slug,
    locale,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString(
    locale === "tr" ? "tr-TR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <>
      <ScrollProgress />
      <Section className="pt-20 md:pt-32">
        <Container>
          <AnimatedSection>
            <div className="mx-auto max-w-3xl">
              {/* Back link */}
              <Link
                href="/blog"
                className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent-cyan"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("allPosts")}
              </Link>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-accent-purple/10 px-3 py-1 text-xs font-medium text-accent-purple"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              {/* Description */}
              <p className="mt-4 text-lg text-text-secondary">
                {post.description}
              </p>

              {/* Meta */}
              <div className="mt-6 flex items-center gap-4 border-b border-border/30 pb-6 text-sm text-text-muted">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readingTime ?? 5} {t("minRead")}
                </span>
              </div>

              {/* MDX Content */}
              <div className="prose-custom mt-8">
                <BlogPostContent code={post.body} />
              </div>

              {/* Back to blog */}
              <div className="mt-12 border-t border-border/30 pt-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent-cyan transition-colors hover:text-accent-cyan/80"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t("allPosts")}
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </Section>
    </>
  );
}
