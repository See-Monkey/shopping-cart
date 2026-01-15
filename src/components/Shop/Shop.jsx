import { useOutletContext } from "react-router";
import styles from "./Shop.module.css";

export default function Shop() {
	const { loading, productArray } = useOutletContext();

	console.log(productArray);

	return (
		<main className={styles.main}>
			<div>Shop</div>
		</main>
	);
}
