import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
	const [cart, setCart] = useState([]);

	const getItemQty = (productId) =>
		cart.find((item) => item.productId === productId)?.quantity ?? 0;

	const addItem = (productId, quantity) => {
		if (quantity <= 0) return;

		setCart((prev) => {
			const existing = prev.find((i) => i.productId === productId);

			if (existing) {
				return prev.map((i) =>
					i.productId === productId
						? { ...i, quantity: i.quantity + quantity }
						: i,
				);
			}

			return [...prev, { productId, quantity }];
		});
	};

	const updateItem = (productId, quantity) => {
		setCart((prev) => {
			if (quantity <= 0) {
				return prev.filter((i) => i.productId !== productId);
			}

			return prev.map((i) =>
				i.productId === productId ? { ...i, quantity } : i,
			);
		});
	};

	const incrementItem = (productId) => {
		setCart((prev) =>
			prev.map((i) =>
				i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i,
			),
		);
	};

	const decrementItem = (productId) => {
		setCart((prev) =>
			prev
				.map((i) =>
					i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i,
				)
				.filter((i) => i.quantity > 0),
		);
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				getItemQty,
				addItem,
				updateItem,
				incrementItem,
				decrementItem,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export const useCart = () => {
	const ctx = useContext(CartContext);
	if (!ctx) throw new Error("useCart must be used inside CartProvider");
	return ctx;
};
