interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Volitan Labs",
  url: "https://volitanlabs.dev",
  inLanguage: ["en", "tr"],
};

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammed Eren Gökceoğlu",
  jobTitle: "Mechanical Engineering Student & App Developer",
  url: "https://volitanlabs.dev",
  sameAs: [
    "https://github.com/muhammederengokceogludarussi-ux",
    "https://www.linkedin.com/in/muhammed-eren-g%C3%B6kceo%C4%9Flu-33b5bb1b7/",
  ],
  knowsAbout: [
    "Mechanical Engineering",
    "Flutter",
    "Software Development",
    "UAV Design",
    "CAD/CAM",
    "AI-Augmented Development",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Middle East Technical University (METU)",
  },
};

export const focusSpaceSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Focus Space",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Android, iOS",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "Volitan Labs",
  },
};
