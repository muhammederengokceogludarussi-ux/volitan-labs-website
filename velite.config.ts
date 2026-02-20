import { defineConfig, defineCollection, s } from "velite";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s.object({
    slug: s.path(),
    locale: s.enum(["en", "tr"]),
    title: s.string().max(120),
    description: s.string().max(300),
    date: s.isodate(),
    updated: s.isodate().optional(),
    published: s.boolean().default(true),
    tags: s.array(s.string()).optional(),
    readingTime: s.number().optional(),
    body: s.mdx(),
  }),
});

export default defineConfig({
  root: "src/content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode as never, { theme: "github-dark-dimmed" }],
      [rehypeAutolinkHeadings as never, { behavior: "wrap" }],
    ],
  },
});
