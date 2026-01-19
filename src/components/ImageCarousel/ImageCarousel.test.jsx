import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ImageCarousel from "./ImageCarousel";

const images = ["/img-1.jpg", "/img-2.jpg", "/img-3.jpg"];

describe("ImageCarousel (CSS-module safe)", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
	});

	it("renders nothing when images array is empty", () => {
		const { container } = render(<ImageCarousel images={[]} />);
		expect(container.firstChild).toBeNull();
	});

	it("renders all images", () => {
		render(<ImageCarousel images={images} />);
		const slides = screen.getAllByAltText(/Slide \d/);
		expect(slides).toHaveLength(3);
	});

	it("shows only the first slide as visible initially", () => {
		render(<ImageCarousel images={images} />);
		const slides = screen.getAllByAltText(/Slide \d/);

		expect(slides[0]).toHaveAttribute("aria-hidden", "false");
		expect(slides[1]).toHaveAttribute("aria-hidden", "true");
		expect(slides[2]).toHaveAttribute("aria-hidden", "true");
	});

	it("moves to next slide when right arrow is clicked", () => {
		render(<ImageCarousel images={images} />);
		fireEvent.click(screen.getByRole("button", { name: "❯" }));

		expect(screen.getByAltText("Slide 2")).toHaveAttribute(
			"aria-hidden",
			"false",
		);
	});

	it("moves to previous slide when left arrow is clicked", () => {
		render(<ImageCarousel images={images} />);
		fireEvent.click(screen.getByRole("button", { name: "❮" }));

		expect(screen.getByAltText("Slide 3")).toHaveAttribute(
			"aria-hidden",
			"false",
		);
	});

	it("navigates to slide when dot is clicked", () => {
		render(<ImageCarousel images={images} />);
		const dots = screen
			.getAllByRole("button")
			.filter((btn) => btn.getAttribute("aria-current") === "true");

		// Click the third dot
		const allDots = screen
			.getAllByRole("button")
			.filter((btn) => btn.getAttribute("aria-current") !== null);
		fireEvent.click(allDots[2]);

		expect(screen.getByAltText("Slide 3")).toHaveAttribute(
			"aria-hidden",
			"false",
		);
	});

	it("auto-advances slides based on delay", () => {
		render(<ImageCarousel images={images} delay={1000} />);

		act(() => {
			vi.advanceTimersByTime(1000);
		});
		expect(screen.getByAltText("Slide 2")).toHaveAttribute(
			"aria-hidden",
			"false",
		);

		act(() => {
			vi.advanceTimersByTime(1000);
		});
		expect(screen.getByAltText("Slide 3")).toHaveAttribute(
			"aria-hidden",
			"false",
		);
	});
});
