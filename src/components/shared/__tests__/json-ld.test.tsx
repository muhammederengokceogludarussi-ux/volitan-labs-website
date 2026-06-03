import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import {
  JsonLd,
  websiteSchema,
  personSchema,
  focusSpaceSchema,
} from "../json-ld";

describe("JsonLd component", () => {
  it("renders a script tag with application/ld+json type", () => {
    const { container } = render(<JsonLd data={{ "@type": "Thing" }} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
  });

  it("serializes data as JSON in the script content", () => {
    const data = { "@context": "https://schema.org", "@type": "Thing", name: "Test" };
    const { container } = render(<JsonLd data={data} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(JSON.parse(script!.innerHTML)).toEqual(data);
  });
});

describe("websiteSchema", () => {
  it("has the correct @type", () => {
    expect(websiteSchema["@type"]).toBe("WebSite");
  });

  it("has the correct URL", () => {
    expect(websiteSchema.url).toBe("https://volitanlabs.dev");
  });

  it("supports both en and tr languages", () => {
    expect(websiteSchema.inLanguage).toEqual(["en", "tr"]);
  });
});

describe("personSchema", () => {
  it("has the correct @type", () => {
    expect(personSchema["@type"]).toBe("Person");
  });

  it("includes social profile links", () => {
    expect(personSchema.sameAs.length).toBeGreaterThan(0);
    expect(personSchema.sameAs.some((url) => url.includes("github.com"))).toBe(true);
    expect(personSchema.sameAs.some((url) => url.includes("linkedin.com"))).toBe(true);
  });

  it("includes knowsAbout skills", () => {
    expect(personSchema.knowsAbout).toContain("Flutter");
    expect(personSchema.knowsAbout).toContain("Mechanical Engineering");
  });

  it("includes alumni information", () => {
    expect(personSchema.alumniOf["@type"]).toBe("CollegeOrUniversity");
  });
});

describe("focusSpaceSchema", () => {
  it("has the correct @type", () => {
    expect(focusSpaceSchema["@type"]).toBe("SoftwareApplication");
  });

  it("is a productivity application", () => {
    expect(focusSpaceSchema.applicationCategory).toBe("ProductivityApplication");
  });

  it("supports Android and iOS", () => {
    expect(focusSpaceSchema.operatingSystem).toBe("Android, iOS");
  });

  it("is free", () => {
    expect(focusSpaceSchema.offers.price).toBe("0");
    expect(focusSpaceSchema.offers.priceCurrency).toBe("USD");
  });
});
