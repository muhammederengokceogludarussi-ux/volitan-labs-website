import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkipToContent } from "../skip-to-content";

vi.mock("next-intl", () => ({
  useLocale: vi.fn(),
}));

import { useLocale } from "next-intl";

describe("SkipToContent", () => {
  it("renders English text when locale is 'en'", () => {
    vi.mocked(useLocale).mockReturnValue("en");
    render(<SkipToContent />);
    expect(screen.getByText("Skip to content")).toBeInTheDocument();
  });

  it("renders Turkish text when locale is 'tr'", () => {
    vi.mocked(useLocale).mockReturnValue("tr");
    render(<SkipToContent />);
    expect(screen.getByText("İçeriğe atla")).toBeInTheDocument();
  });

  it("links to #main-content", () => {
    vi.mocked(useLocale).mockReturnValue("en");
    render(<SkipToContent />);
    const link = screen.getByText("Skip to content");
    expect(link).toHaveAttribute("href", "#main-content");
  });

  it("has sr-only class for accessibility", () => {
    vi.mocked(useLocale).mockReturnValue("en");
    render(<SkipToContent />);
    const link = screen.getByText("Skip to content");
    expect(link.className).toContain("sr-only");
  });
});
