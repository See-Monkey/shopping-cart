import { useParams, useOutletContext } from "react-router";
import styles from "./ProductDetail.module.css";
import Loading from "../Loading/Loading.jsx";
import RatingStars from "../RatingStars/RatingStars.jsx";
import CartControls from "../CartControls/CartControls.jsx";

export default function ProductDetail() {
	const { productId } = useParams();
	const { products, loading } = useOutletContext();

	const product = products.find((p) => p.id === Number(productId));

	return (
		<main className={styles.main}>
			{loading && <Loading />}

			{!loading && !product && <p>Product not found.</p>}

			{!loading && product && (
				<div className={styles.productContainer}>
					<img
						src={product.image}
						alt={product.title}
						className={styles.productImg}
					/>
					<div className={styles.infoContainer}>
						<h1>{product.title}</h1>
						<RatingStars rating={product.rating.rate} />
						<p>{product.description}</p>
						<div className={styles.priceCartControlsContainer}>
							<p className={styles.price}>${product.price.toFixed(2)}</p>
							<CartControls />
						</div>
					</div>
				</div>
			)}
		</main>
	);
}
