import { MemoryRouter } from "react-router";
import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";

vi.mock("../../context/CartContext", () => {
	return {
		useCart: () => ({
			cart: [
				{ productId: 1, quantity: 3 },
				{ productId: 2, quantity: 2 },
			],
			getItemQty: vi.fn((id) => (id === 1 ? 3 : id === 2 ? 2 : 0)),
			addItem: vi.fn(),
			updateItem: vi.fn(),
			incrementItem: vi.fn(),
			decrementItem: vi.fn(),
		}),
	};
});

describe("Header", () => {
	it("renders the logo and navigation links", () => {
		render(
			<MemoryRouter>
				<Header />
			</MemoryRouter>,
		);

		// Logo
		expect(screen.getByAltText(/store logo/i)).toBeInTheDocument();

		// Scope to nav
		const nav = screen.getByRole("navigation");
		const navLinks = within(nav);

		expect(
			navLinks.getAllByRole("link", { name: /Shop All/i })[0],
		).toBeInTheDocument();
		expect(
			navLinks.getAllByRole("link", { name: /Men/i })[0],
		).toBeInTheDocument();
		expect(
			navLinks.getAllByRole("link", { name: /Women/i })[0],
		).toBeInTheDocument();
	});

	it("shows the correct cart quantity", () => {
		render(
			<MemoryRouter>
				<Header />
			</MemoryRouter>,
		);

		// Total quantity in the mocked cart: 3 + 2 = 5
		expect(screen.getByText("5")).toBeInTheDocument();
	});

	it("toggles mobile navigation when menu button is clicked", async () => {
		render(
			<MemoryRouter>
				<Header />
			</MemoryRouter>,
		);
		const menuButton = screen.getByLabelText(/toggle navigation/i);

		await userEvent.click(menuButton);
		const nav = screen.getByRole("navigation");
		expect(nav.className.includes("navOpen")).toBe(true);

		await userEvent.click(menuButton);
		expect(nav.className.includes("navOpen")).toBe(false);
	});
});
