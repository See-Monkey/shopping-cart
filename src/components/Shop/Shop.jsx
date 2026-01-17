import { useOutletContext } from "react-router";
import styles from "./Shop.module.css";
import Loading from "../Loading/Loading.jsx";
import ShopProduct from "../../components/ShopProduct/ShopProduct.jsx";

export default function Shop() {
	const { loading, products } = useOutletContext();

	return (
		<main className={styles.main}>
			{loading && <Loading />}
			{!loading && (
				<div className={styles.productsContainer}>
					{products.map((product) => (
						<ShopProduct key={product.id} item={product} />
					))}
				</div>
			)}
		</main>
	);
}
