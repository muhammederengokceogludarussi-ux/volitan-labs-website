"use client";

import * as runtime from "react/jsx-runtime";

interface BlogPostContentProps {
  code: string;
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-10 mb-4 font-display text-2xl font-bold tracking-tight text-text-primary"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-8 mb-3 font-display text-xl font-semibold text-text-primary"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-relaxed text-text-secondary" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 ml-6 list-disc space-y-2 text-text-secondary" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2 text-text-secondary" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-text-primary" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-accent-cyan underline decoration-accent-cyan/30 underline-offset-2 transition-colors hover:decoration-accent-cyan"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-sm text-accent-amber"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="mb-4 overflow-x-auto rounded-xl border border-border/30 bg-surface p-4 font-mono text-sm"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mb-4 border-l-2 border-accent-cyan pl-4 italic text-text-muted"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-border/30" />,
};

function useMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

export function BlogPostContent({ code }: BlogPostContentProps) {
  const Component = useMDXComponent(code);
  return <Component components={mdxComponents} />;
}
