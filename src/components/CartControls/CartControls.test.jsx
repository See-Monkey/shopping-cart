import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartControls from "./CartControls";

const addItem = vi.fn();
const updateItem = vi.fn();
const incrementItem = vi.fn();
const decrementItem = vi.fn();

vi.mock("../../context/CartContext", () => ({
	useCart: () => ({
		addItem,
		updateItem,
		incrementItem,
		decrementItem,
	}),
}));

describe("CartControls", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("adds item to cart", async () => {
		render(<CartControls productId={1} cartQty={0} />);

		await userEvent.click(screen.getByRole("button", { name: /add to cart/i }));

		expect(addItem).toHaveBeenCalledWith(1, 1);
	});

	it("updates quantity when modified", async () => {
		render(<CartControls productId={1} cartQty={2} />);

		const input = screen.getByRole("textbox");
		await userEvent.clear(input);
		await userEvent.type(input, "3");

		await userEvent.click(
			screen.getByRole("button", { name: /update quantity/i }),
		);

		expect(updateItem).toHaveBeenCalledWith(1, 3);
	});

	it("increments and decrements quantity", async () => {
		render(<CartControls productId={1} cartQty={2} />);

		await userEvent.click(screen.getByAltText("Plus"));
		await userEvent.click(screen.getByAltText("Minus"));

		expect(incrementItem).toHaveBeenCalledWith(1);
		expect(decrementItem).toHaveBeenCalledWith(1);
	});
});
