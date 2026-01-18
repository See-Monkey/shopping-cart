import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ProductDetail from "./ProductDetail";
import { mockProducts } from "../../tests/mocks/products";

vi.mock("react-router", async () => {
	const actual = await vi.importActual("react-router");
	return {
		...actual,
		useParams: () => ({ productId: "1" }),
		useOutletContext: () => ({
			loading: false,
			products: mockProducts,
		}),
	};
});

vi.mock("../../context/CartContext", () => ({
	useCart: () => ({
		getItemQty: () => 0,
	}),
}));

describe("ProductDetail", () => {
	it("renders product details", () => {
		render(
			<MemoryRouter>
				<ProductDetail />
			</MemoryRouter>,
		);

		expect(screen.getByText("Men Shirt")).toBeInTheDocument();
		expect(screen.getByText("Nice shirt")).toBeInTheDocument();
		expect(screen.getByText("$29.99")).toBeInTheDocument();
	});

	it("shows not found when product does not exist", async () => {
		vi.mocked(await import("react-router")).useParams = () => ({
			productId: "999",
		});

		render(
			<MemoryRouter>
				<ProductDetail />
			</MemoryRouter>,
		);

		expect(screen.getByText(/product not found/i)).toBeInTheDocument();
	});
});
