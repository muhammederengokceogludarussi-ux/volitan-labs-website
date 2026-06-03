import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "../card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies data-slot attribute", () => {
    render(<Card>Content</Card>);
    expect(screen.getByText("Content").closest("[data-slot='card']")).not.toBeNull();
  });

  it("merges custom className", () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    const card = container.querySelector("[data-slot='card']")!;
    expect(card.className).toContain("custom-class");
  });
});

describe("CardHeader", () => {
  it("renders with data-slot card-header", () => {
    const { container } = render(<CardHeader>Header</CardHeader>);
    expect(container.querySelector("[data-slot='card-header']")).not.toBeNull();
  });
});

describe("CardTitle", () => {
  it("renders title text", () => {
    render(<CardTitle>My Title</CardTitle>);
    expect(screen.getByText("My Title")).toBeInTheDocument();
  });

  it("has data-slot card-title", () => {
    const { container } = render(<CardTitle>Title</CardTitle>);
    expect(container.querySelector("[data-slot='card-title']")).not.toBeNull();
  });
});

describe("CardDescription", () => {
  it("renders description text", () => {
    render(<CardDescription>Some description</CardDescription>);
    expect(screen.getByText("Some description")).toBeInTheDocument();
  });

  it("has data-slot card-description", () => {
    const { container } = render(<CardDescription>Desc</CardDescription>);
    expect(container.querySelector("[data-slot='card-description']")).not.toBeNull();
  });
});

describe("CardContent", () => {
  it("renders content", () => {
    render(<CardContent>Body</CardContent>);
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("has data-slot card-content", () => {
    const { container } = render(<CardContent>Body</CardContent>);
    expect(container.querySelector("[data-slot='card-content']")).not.toBeNull();
  });
});

describe("CardFooter", () => {
  it("renders footer content", () => {
    render(<CardFooter>Footer</CardFooter>);
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("has data-slot card-footer", () => {
    const { container } = render(<CardFooter>Footer</CardFooter>);
    expect(container.querySelector("[data-slot='card-footer']")).not.toBeNull();
  });
});

describe("CardAction", () => {
  it("renders action content", () => {
    render(<CardAction>Action</CardAction>);
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("has data-slot card-action", () => {
    const { container } = render(<CardAction>Action</CardAction>);
    expect(container.querySelector("[data-slot='card-action']")).not.toBeNull();
  });
});
