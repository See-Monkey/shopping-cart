import { describe, it, expect, vi } from "vitest";

vi.mock("../../context/CartContext", () => {
	return {
		useCart: () => ({
			getItemQty: vi.fn(() => 0),
			addItem: vi.fn(),
			updateItem: vi.fn(),
			incrementItem: vi.fn(),
			decrementItem: vi.fn(),
		}),
	};
});

describe("something truthy and falsy", () => {
	it("true to be true", () => {
		expect(true).toBe(true);
	});

	it("false to be false", () => {
		expect(false).toBe(false);
	});
});
