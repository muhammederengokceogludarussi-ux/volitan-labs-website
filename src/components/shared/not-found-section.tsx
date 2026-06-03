import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ArrowLeft } from "lucide-react";

interface NotFoundSectionProps {
  title: string;
  backHref: string;
  backLabel: string;
}

export function NotFoundSection({
  title,
  backHref,
  backLabel,
}: NotFoundSectionProps) {
  return (
    <Section className="pt-20 md:pt-32">
      <Container className="text-center">
        <h1 className="font-display text-3xl font-bold tracking-[-0.03em]">
          {title}
        </h1>
        <Link
          href={backHref}
          className="mt-4 inline-flex items-center gap-2 text-accent-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>
      </Container>
    </Section>
  );
}
