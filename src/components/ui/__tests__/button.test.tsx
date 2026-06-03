import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button, buttonVariants } from "../button";

describe("buttonVariants", () => {
  it("returns default variant classes", () => {
    const classes = buttonVariants();
    expect(classes).toContain("bg-accent-primary");
  });

  it("returns destructive variant classes", () => {
    const classes = buttonVariants({ variant: "destructive" });
    expect(classes).toContain("bg-accent-danger");
  });

  it("returns outline variant classes", () => {
    const classes = buttonVariants({ variant: "outline" });
    expect(classes).toContain("border");
  });

  it("returns ghost variant classes", () => {
    const classes = buttonVariants({ variant: "ghost" });
    expect(classes).toContain("hover:bg-surface-elevated");
  });

  it("returns pill variant classes with rounded-full", () => {
    const classes = buttonVariants({ variant: "pill" });
    expect(classes).toContain("rounded-full");
  });

  it("applies size classes", () => {
    const lgClasses = buttonVariants({ size: "lg" });
    expect(lgClasses).toContain("h-10");

    const smClasses = buttonVariants({ size: "sm" });
    expect(smClasses).toContain("h-8");

    const xlClasses = buttonVariants({ size: "xl" });
    expect(xlClasses).toContain("h-12");
  });

  it("applies icon size class", () => {
    const classes = buttonVariants({ size: "icon" });
    expect(classes).toContain("size-9");
  });
});

describe("Button component", () => {
  it("renders with children text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies data-slot attribute", () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("data-slot", "button");
  });

  it("applies data-variant attribute", () => {
    render(<Button variant="outline">Test</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("data-variant", "outline");
  });

  it("applies data-size attribute", () => {
    render(<Button size="lg">Test</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("data-size", "lg");
  });

  it("forwards additional HTML attributes", () => {
    render(<Button disabled aria-label="disabled-btn">Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("merges custom className", () => {
    render(<Button className="my-custom-class">Test</Button>);
    expect(screen.getByRole("button")).toHaveClass("my-custom-class");
  });
});
