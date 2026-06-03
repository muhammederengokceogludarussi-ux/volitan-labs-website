import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Section } from "../section";

describe("Section", () => {
  it("renders as a <section> element", () => {
    render(<Section>Content</Section>);
    const section = screen.getByText("Content").closest("section");
    expect(section).not.toBeNull();
  });

  it("applies default padding classes", () => {
    const { container } = render(<Section>Content</Section>);
    const section = container.querySelector("section")!;
    expect(section.className).toContain("py-16");
    expect(section.className).toContain("md:py-24");
  });

  it("applies an id attribute when provided", () => {
    const { container } = render(<Section id="hero">Content</Section>);
    const section = container.querySelector("#hero");
    expect(section).not.toBeNull();
  });

  it("merges custom className", () => {
    const { container } = render(<Section className="bg-red-500">Content</Section>);
    const section = container.querySelector("section")!;
    expect(section.className).toContain("bg-red-500");
    expect(section.className).toContain("py-16");
  });
});
