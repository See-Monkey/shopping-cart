import { useParams, useOutletContext } from "react-router";
import styles from "./ProductDetail.module.css";
import Loading from "../Loading/Loading.jsx";

export default function ProductDetail() {
	const { productId } = useParams();
	const { products, loading } = useOutletContext();

	const product = products.find((p) => p.id === Number(productId));

	return (
		<main className={styles.main}>
			{loading && <Loading />}

			{!loading && !product && <p>Product not found.</p>}

			{!loading && product && (
				<>
					<img src={product.image} alt={product.title} />
					<div className={styles.info}>
						<h1>{product.title}</h1>
						<p>{product.description}</p>
						<p>${product.price.toFixed(2)}</p>
						{/* Add rating, quantity selector, add to cart */}
					</div>
				</>
			)}
		</main>
	);
}
