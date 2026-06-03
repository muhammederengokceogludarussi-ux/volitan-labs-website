import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeading } from "../section-heading";

describe("SectionHeading", () => {
  it("renders the title as an h2", () => {
    render(<SectionHeading title="My Section" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("My Section");
  });

  it("renders subtitle when provided", () => {
    render(<SectionHeading title="Title" subtitle="A subtitle" />);
    expect(screen.getByText("A subtitle")).toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    const { container } = render(<SectionHeading title="Title" />);
    const paragraphs = container.querySelectorAll("p.mt-4");
    expect(paragraphs).toHaveLength(0);
  });

  it("renders label when provided", () => {
    render(<SectionHeading title="Title" label="SECTION" />);
    expect(screen.getByText("SECTION")).toBeInTheDocument();
  });

  it("does not render label when not provided", () => {
    const { container } = render(<SectionHeading title="Title" />);
    const labels = container.querySelectorAll("p.mb-3");
    expect(labels).toHaveLength(0);
  });

  it("applies center alignment classes when align='center'", () => {
    const { container } = render(
      <SectionHeading title="Centered" align="center" />
    );
    expect(container.firstElementChild!.className).toContain("text-center");
  });

  it("does not apply center alignment by default (left)", () => {
    const { container } = render(<SectionHeading title="Left" />);
    expect(container.firstElementChild!.className).not.toContain("text-center");
  });

  it("applies center max-w constraint to subtitle when centered", () => {
    const { container } = render(
      <SectionHeading title="T" subtitle="Sub" align="center" />
    );
    const subtitle = container.querySelector("p.mt-4");
    expect(subtitle?.className).toContain("mx-auto");
    expect(subtitle?.className).toContain("max-w-2xl");
  });

  it("merges custom className", () => {
    const { container } = render(
      <SectionHeading title="Title" className="my-custom" />
    );
    expect(container.firstElementChild!.className).toContain("my-custom");
  });
});
