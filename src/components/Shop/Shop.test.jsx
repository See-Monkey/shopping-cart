import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Shop from "./Shop";
import { mockProducts } from "../../tests/mocks/products";

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

vi.mock("react-router", async () => {
	const actual = await vi.importActual("react-router");
	return {
		...actual,
		useOutletContext: () => ({
			loading: false,
			products: mockProducts,
		}),
		useParams: () => ({}),
	};
});

describe("Shop", () => {
	it("renders all category sections when no category param", () => {
		render(
			<MemoryRouter>
				<Shop />
			</MemoryRouter>,
		);

		expect(screen.getByText("Men")).toBeInTheDocument();
		expect(screen.getByText("Jewelry")).toBeInTheDocument();
	});

	it("renders only filtered products when category param exists", async () => {
		vi.mocked(await import("react-router")).useParams = () => ({
			category: "men",
		});

		render(
			<MemoryRouter>
				<Shop />
			</MemoryRouter>,
		);

		expect(screen.getByText("Men Shirt")).toBeInTheDocument();
		expect(screen.queryByText("Gold Ring")).not.toBeInTheDocument();
	});
});
