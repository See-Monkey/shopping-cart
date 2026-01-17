import { useState, useEffect } from "react";
import styles from "./CartControls.module.css";
import plusIcon from "../../icons/plus-square.svg";
import minusIcon from "../../icons/minus-square.svg";

export default function CartControls({ cartQty }) {
	const [inputQty, setInputQty] = useState(cartQty > 0 ? cartQty : 1);

	const isInCart = cartQty > 0;
	const isUnchanged = inputQty === cartQty;
	const isModified = isInCart && !isUnchanged;

	const showQtyControls = isInCart && isUnchanged;

	useEffect(() => {
		if (cartQty > 0) {
			setInputQty(cartQty);
		}
	}, [cartQty]);

	const handleChange = (event) => {
		setInputQty(Number(event.target.value));
	};

	let buttonLabel;
	let buttonAction;
	let buttonDisabled = false;

	if (!isInCart) {
		buttonLabel = "ADD TO CART";
	} else if (isModified) {
		buttonLabel = "UPDATE QUANTITY";
	} else {
		buttonLabel = "ADDED TO CART";
		buttonDisabled = true;
	}

	return (
		<div className={styles.cartControls}>
			<div className={styles.qtyContainer}>
				<input
					type="text"
					className={`${styles.itemQty} ${!showQtyControls ? styles.simple : ""}`}
					value={inputQty}
					onChange={handleChange}
				/>
				{showQtyControls && (
					<div className={styles.itemQtyPlusMinus}>
						<button className={styles.plusBtn}>
							<img src={plusIcon} alt="Plus" />
						</button>
						<button className={styles.minusBtn}>
							<img src={minusIcon} alt="Minus" />
						</button>
					</div>
				)}
			</div>
			<button className={styles.addBtn} disabled={buttonDisabled}>
				{buttonLabel}
			</button>
		</div>
	);
}
