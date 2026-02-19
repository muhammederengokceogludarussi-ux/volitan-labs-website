import { Hero } from "@/components/sections/hero";
import { FeaturedProject } from "@/components/sections/featured-project";
import { Skills } from "@/components/sections/skills";
import { BlogPreview } from "@/components/sections/blog-preview";
import { CTA } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProject />
      <Skills />
      <BlogPreview />
      <CTA />
    </>
  );
}
