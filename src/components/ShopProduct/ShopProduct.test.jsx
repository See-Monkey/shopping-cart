import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ShopProduct from "./ShopProduct";
import { mockProducts } from "../../tests/mocks/products";

vi.mock("../../context/CartContext", () => ({
	useCart: () => ({
		getItemQty: () => 0,
	}),
}));

describe("ShopProduct", () => {
	it("renders product title, price, and rating", () => {
		render(
			<MemoryRouter>
				<ShopProduct item={mockProducts[0]} />
			</MemoryRouter>,
		);

		expect(screen.getByText("Men Shirt")).toBeInTheDocument();
		expect(screen.getByText("$29.99")).toBeInTheDocument();
		expect(screen.getByText("(120)")).toBeInTheDocument();
	});

	it("links to product detail page", () => {
		render(
			<MemoryRouter>
				<ShopProduct item={mockProducts[0]} />
			</MemoryRouter>,
		);

		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/product/1");
	});
});
