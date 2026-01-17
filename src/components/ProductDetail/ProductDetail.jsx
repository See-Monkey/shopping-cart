import { useParams, useOutletContext } from "react-router";
import styles from "./ProductDetail.module.css";
import Loading from "../Loading/Loading.jsx";
import RatingStars from "../RatingStars/RatingStars.jsx";
import plusIcon from "../../icons/plus-square.svg";
import minusIcon from "../../icons/minus-square.svg";

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
					<img src={product.image} alt={product.title} />
					<div className={styles.infoContainer}>
						<h1>{product.title}</h1>
						<RatingStars rating={product.rating.rate} />
						<p>{product.description}</p>
						<div className={styles.priceQtyContainer}>
							<p className={styles.price}>${product.price.toFixed(2)}</p>
							<div className={styles.qtyContainer}>
								<input type="text" className={styles.itemQty} />
								<div className={styles.itemQtyPlusMinus}>
									<button className={styles.plusBtn}>
										<img src={plusIcon} alt="Plus" />
									</button>
									<button className={styles.minusBtn}>
										<img src={minusIcon} alt="Minus" />
									</button>
								</div>
							</div>
						</div>
						<button className={styles.addBtn}>ADD TO CART</button>
					</div>
				</div>
			)}
		</main>
	);
}
