import { Link } from "react-router";
import RatingStars from "../RatingStars/RatingStars.jsx";
import styles from "./ShopProduct.module.css";
import plusIcon from "../../icons/plus-square.svg";
import minusIcon from "../../icons/minus-square.svg";

export default function ShopProduct({ item }) {
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

			<div className={styles.bottomContainer}>
				<div className={styles.priceQtyContainer}>
					<p className={styles.price}>${item.price.toFixed(2)}</p>
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
	);
}
