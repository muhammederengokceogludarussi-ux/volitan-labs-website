import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { FeaturedProject } from "@/components/sections/featured-project";
import { CTA } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Skills />
      <FeaturedProject />
      <CTA />
    </>
  );
}
