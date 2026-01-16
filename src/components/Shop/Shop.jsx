import { useOutletContext } from "react-router";
import styles from "./Shop.module.css";

export default function Shop() {
	const { loading, products } = useOutletContext();

	console.log(products);

	return (
		<main className={styles.main}>
			<div>Shop</div>
		</main>
	);
}
