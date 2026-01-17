import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RatingStars from "./RatingStars";

describe("RatingStars (accessible)", () => {
	it("announces the correct rating for a whole number", () => {
		render(<RatingStars rating={3} />);

		expect(screen.getByLabelText("Rated 3 out of 5 stars")).toBeInTheDocument();
	});

	it("rounds to the nearest 0.5 and announces correctly", () => {
		render(<RatingStars rating={3.3} />);

		expect(
			screen.getByLabelText("Rated 3.5 out of 5 stars")
		).toBeInTheDocument();
	});

	it("rounds high values correctly", () => {
		render(<RatingStars rating={4.8} />);

		expect(screen.getByLabelText("Rated 5 out of 5 stars")).toBeInTheDocument();
	});

	it("announces zero rating correctly", () => {
		render(<RatingStars rating={0} />);

		expect(screen.getByLabelText("Rated 0 out of 5 stars")).toBeInTheDocument();
	});

	it("renders exactly 5 decorative star images", () => {
		const { container } = render(<RatingStars rating={3.5} />);

		const images = container.querySelectorAll("img");

		expect(images).toHaveLength(5);

		images.forEach((img) => {
			expect(img).toHaveAttribute("aria-hidden", "true");
			expect(img).toHaveAttribute("alt", "");
		});
	});
});
