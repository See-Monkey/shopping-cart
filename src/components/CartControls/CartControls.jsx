import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import styles from "./CartControls.module.css";
import plusIcon from "../../icons/plus-square.svg";
import minusIcon from "../../icons/minus-square.svg";

export default function CartControls({ productId, cartQty, variant }) {
	const { addItem, updateItem, incrementItem, decrementItem } = useCart();

	const [inputQty, setInputQty] = useState(cartQty > 0 ? String(cartQty) : "1");

	const numericInputQty = Number(inputQty);

	const isInCart = cartQty > 0;
	const isUnchanged = numericInputQty === cartQty;
	const isModified = isInCart && !isUnchanged;

	const showQtyControls = isInCart && isUnchanged;

	useEffect(() => {
		// Intentionally syncing input state with cart state.
		// Cart is the source of truth.
		// eslint-disable-next-line
		setInputQty(cartQty > 0 ? String(cartQty) : "1");
	}, [cartQty]);

	const getValidatedQty = () => {
		const parsed = Number(inputQty);

		if (!Number.isInteger(parsed) || parsed < 0) {
			alert("Please enter a valid quantity.");
			setInputQty(cartQty > 0 ? String(cartQty) : "1");
			return null;
		}

		return parsed;
	};

	const handleButtonClick = () => {
		const qty = getValidatedQty();
		if (qty === null) return;

		if (!isInCart) {
			addItem(productId, qty);
		} else if (isModified) {
			updateItem(productId, qty);
		}
	};

	const handleCartButtonClick = () => {
		const qty = getValidatedQty();
		if (qty === null) return;

		if (!isModified) {
			updateItem(productId, 0);
		} else if (isModified) {
			updateItem(productId, qty);
		}
	};

	let buttonLabel = "ADD TO CART";
	let buttonDisabled = false;

	if (isInCart && isModified) {
		buttonLabel = "UPDATE QUANTITY";
	} else if (isInCart && variant !== "cart") {
		buttonLabel = "ADDED TO CART";
		buttonDisabled = true;
	} else if (isInCart && variant === "cart") {
		buttonLabel = "REMOVE";
	}

	return (
		<div
			className={`${styles.cartControls} ${variant === "cart" ? styles.cartVariant : ""}`}
		>
			<div className={styles.qtyContainer}>
				<input
					type="text"
					className={`${styles.itemQty} ${!showQtyControls ? styles.simple : ""}`}
					value={inputQty}
					onChange={(e) => setInputQty(e.target.value)}
				/>
				{showQtyControls && (
					<div className={styles.itemQtyPlusMinus}>
						<button
							className={styles.plusBtn}
							onClick={() => incrementItem(productId)}
						>
							<img src={plusIcon} alt="Plus" />
						</button>
						<button
							className={styles.minusBtn}
							onClick={() => decrementItem(productId)}
						>
							<img src={minusIcon} alt="Minus" />
						</button>
					</div>
				)}
			</div>

			<button
				className={variant !== "cart" ? styles.addBtn : styles.cartUpdateBtn}
				onClick={variant !== "cart" ? handleButtonClick : handleCartButtonClick}
				disabled={buttonDisabled}
			>
				{buttonLabel}
			</button>
		</div>
	);
}
