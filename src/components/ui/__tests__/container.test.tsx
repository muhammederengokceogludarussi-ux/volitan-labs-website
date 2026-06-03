import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Container } from "../container";

describe("Container", () => {
  it("renders children", () => {
    render(<Container>Hello</Container>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("applies max-w-6xl and responsive padding by default", () => {
    const { container } = render(<Container>Content</Container>);
    const div = container.firstElementChild!;
    expect(div.className).toContain("max-w-6xl");
    expect(div.className).toContain("px-4");
    expect(div.className).toContain("mx-auto");
  });

  it("merges custom className", () => {
    const { container } = render(<Container className="mt-8">Content</Container>);
    const div = container.firstElementChild!;
    expect(div.className).toContain("mt-8");
    expect(div.className).toContain("max-w-6xl");
  });
});
