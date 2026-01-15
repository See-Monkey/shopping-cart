import { useOutletContext } from "react-router";
import styles from "./Cart.module.css";

export default function Cart() {
	const { productArray } = useOutletContext();

	return (
		<main className={styles.main}>
			<div>Cart</div>
		</main>
	);
}
