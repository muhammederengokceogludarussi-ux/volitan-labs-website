"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Send, CheckCircle, AlertCircle, Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "../../../../content/site";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function ContactPage() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);

  const handleTurnstileCallback = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileRef.current) return;

    // Load Turnstile script
    const existing = document.querySelector('script[src*="turnstile"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => {
        renderTurnstile();
      };
    } else {
      renderTurnstile();
    }

    function renderTurnstile() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = window as any;
      if (turnstileRef.current && win.turnstile) {
        win.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: handleTurnstileCallback,
          theme: "auto",
        });
      }
    }
  }, [handleTurnstileCallback]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const honeypot = formData.get("website");

    if (honeypot) {
      setStatus("success");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          token: turnstileToken,
          honeypot: "",
        }),
      });

      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section className="pt-20 md:pt-32">
      <Container>
        <AnimatedSection>
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        </AnimatedSection>

        <div className="mx-auto mt-12 grid max-w-4xl gap-12 lg:grid-cols-5">
          {/* Form */}
          <AnimatedSection delay={0.2} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                className="absolute -left-[9999px] opacity-0"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                  {t("name")}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-xl border border-border/50 bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/30"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                  {t("email")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-border/50 bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/30"
                />
              </div>

              <div>
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">
                  {t("subject")}
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  className="w-full rounded-xl border border-border/50 bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/30"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  {t("message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full resize-none rounded-xl border border-border/50 bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/30"
                />
              </div>

              {/* Cloudflare Turnstile */}
              {TURNSTILE_SITE_KEY && (
                <div ref={turnstileRef} className="flex justify-start" />
              )}

              <ShimmerButton className="w-full text-sm font-medium" disabled={status === "sending"}>
                {status === "sending" ? t("sending") : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    {t("send")}
                  </>
                )}
              </ShimmerButton>

              {status === "success" && (
                <div className="flex items-center gap-2 rounded-xl bg-accent-green/10 p-4 text-sm text-accent-green">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  {t("success")}
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-2 rounded-xl bg-accent-red/10 p-4 text-sm text-accent-red">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {t("error")}
                </div>
              )}
            </form>
          </AnimatedSection>

          {/* Sidebar */}
          <AnimatedSection delay={0.3} className="lg:col-span-2">
            <div className="rounded-xl border border-border/30 bg-surface p-6">
              <h3 className="font-display text-lg font-semibold">
                {t("otherWays")}
              </h3>
              <div className="mt-4 space-y-3">
                <a
                  href={`mailto:${siteConfig.social.email}`}
                  className="flex items-center gap-3 rounded-lg p-2.5 text-sm text-text-secondary transition-colors hover:bg-surface-elevated hover:text-text-primary"
                >
                  <Mail className="h-5 w-5 text-accent-cyan" />
                  {siteConfig.social.email}
                </a>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg p-2.5 text-sm text-text-secondary transition-colors hover:bg-surface-elevated hover:text-text-primary"
                >
                  <Github className="h-5 w-5" />
                  GitHub
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg p-2.5 text-sm text-text-secondary transition-colors hover:bg-surface-elevated hover:text-text-primary"
                >
                  <Linkedin className="h-5 w-5" />
                  LinkedIn
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </Section>
  );
}
