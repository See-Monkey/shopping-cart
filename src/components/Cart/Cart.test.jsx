import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Cart from "./Cart";

const addItem = vi.fn();
const updateItem = vi.fn();
const incrementItem = vi.fn();
const decrementItem = vi.fn();

let mockCart = [];

vi.mock("../../context/CartContext.jsx", () => ({
	useCart: () => ({
		cart: mockCart,
		addItem,
		updateItem,
		incrementItem,
		decrementItem,
	}),
}));

const renderCart = () =>
	render(
		<MemoryRouter>
			<Cart />
		</MemoryRouter>,
	);

vi.mock("react-router", async () => {
	const actual = await vi.importActual("react-router");
	return {
		...actual,
		useOutletContext: () => ({
			products: [
				{
					id: 1,
					title: "Test Product",
					price: 10,
					image: "test.jpg",
				},
			],
		}),
	};
});

describe("Cart component", () => {
	beforeEach(() => {
		mockCart = [];
		vi.clearAllMocks();
	});

	it("shows empty cart message when cart is empty", () => {
		renderCart();

		expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
	});
	it("renders cart items with title, price, and quantity", () => {
		mockCart = [{ productId: 1, quantity: 2 }];

		renderCart();

		expect(screen.getByText("Test Product")).toBeInTheDocument();
		expect(screen.getAllByText("$10.00").length).toBeGreaterThan(0);
		expect(screen.getAllByText("$20.00").length).toBeGreaterThan(0);
	});
	it("calculates and displays subtotal", () => {
		mockCart = [{ productId: 1, quantity: 3 }];

		renderCart();

		expect(screen.getByText("Subtotal")).toBeInTheDocument();
		expect(screen.getAllByText("$30.00").length).toBeGreaterThan(0);
	});
	it("shows checkout button when cart has items", () => {
		mockCart = [{ productId: 1, quantity: 1 }];

		renderCart();

		expect(
			screen.getByRole("button", { name: /proceed to checkout/i }),
		).toBeInTheDocument();
	});

	it("does not show checkout button when cart is empty", () => {
		renderCart();

		expect(
			screen.queryByRole("button", { name: /proceed to checkout/i }),
		).not.toBeInTheDocument();
	});
	it("links cart item image to product detail page", () => {
		mockCart = [{ productId: 1, quantity: 1 }];

		renderCart();

		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/product/1");
	});
});
