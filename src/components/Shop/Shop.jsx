import { useOutletContext } from "react-router";
import styles from "./Shop.module.css";
import RatingStars from "../../components/RatingStars/RatingStars.jsx";

export default function Shop() {
	const { loading, products } = useOutletContext();

	console.log(products);

	return (
		<main className={styles.main}>
			<div>Shop</div>
			<RatingStars rating={4.3} />
		</main>
	);
}
