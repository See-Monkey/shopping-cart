import { Link } from "react-router";
import RatingStars from "../RatingStars/RatingStars.jsx";
import styles from "./ShopProduct.module.css";
import CartControls from "../CartControls/CartControls.jsx";
import { useCart } from "../../context/CartContext";

export default function ShopProduct({ item }) {
	const { getItemQty } = useCart();
	const cartQty = getItemQty(item.id);

	return (
		<div className={styles.itemContainer}>
			<Link to={`/product/${item.id}`} className={styles.topContainer}>
				<img src={item.image} alt="" className={styles.itemImg} />
				<h3>{item.title}</h3>
				<div className={styles.ratingContainer}>
					<RatingStars rating={item.rating.rate} />
					<p>({item.rating.count})</p>
				</div>
			</Link>

			<div className={styles.priceCartControlsContainer}>
				<p className={styles.price}>${item.price.toFixed(2)}</p>
				<CartControls productId={item.id} cartQty={cartQty} />
			</div>
		</div>
	);
}
