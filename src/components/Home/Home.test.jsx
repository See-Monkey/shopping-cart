import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Outlet } from "react-router";
import Home from "./Home";

vi.mock("../ImageCarousel/ImageCarousel", () => ({
	default: () => <div data-testid="image-carousel" />,
}));

vi.mock("../ShopProduct/ShopProduct.jsx", () => ({
	default: ({ item }) => <div data-testid="shop-product">{item?.title}</div>,
}));

const mockProducts = [
	{ id: 1, title: "Test Product 1" },
	{ id: 2, title: "Test Product 2" },
];

// Helper wrapper that provides outlet context
function renderWithOutletContext(products) {
	return render(
		<MemoryRouter initialEntries={["/"]}>
			<Routes>
				<Route element={<Outlet context={{ products }} />}>
					<Route index element={<Home />} />
				</Route>
			</Routes>
		</MemoryRouter>,
	);
}

describe("Home component (without router mocks)", () => {
	it("renders welcome text", () => {
		renderWithOutletContext(mockProducts);

		expect(screen.getByText(/welcome/i)).toBeInTheDocument();
		expect(screen.getByText(/little/i)).toBeInTheDocument();
		expect(screen.getByText(/big/i)).toBeInTheDocument();
		expect(screen.getByText(/shop/i)).toBeInTheDocument();
	});

	it("renders category links", () => {
		renderWithOutletContext(mockProducts);

		expect(
			screen.getAllByText(/men's clothing/i).length,
		).toBeGreaterThanOrEqual(1);
		expect(screen.getByText(/women's clothing/i)).toBeInTheDocument();
		expect(screen.getByText(/jewelry/i)).toBeInTheDocument();
		expect(screen.getByText(/electronics/i)).toBeInTheDocument();
	});

	it("renders image carousel", () => {
		renderWithOutletContext(mockProducts);

		expect(screen.getByTestId("image-carousel")).toBeInTheDocument();
	});

	it("renders a featured product", () => {
		renderWithOutletContext(mockProducts);

		expect(screen.getByTestId("shop-product")).toBeInTheDocument();
	});

	it("renders nothing when products array is empty", () => {
		const { container } = renderWithOutletContext([]);

		expect(container.firstChild).toBeNull();
	});
});
