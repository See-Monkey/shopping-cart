import { useOutletContext } from "react-router";
import { Link } from "react-router";
import styles from "./Cart.module.css";
import { useCart } from "../../context/CartContext.jsx";
import CartControls from "../CartControls/CartControls";

export default function Cart() {
	const { products } = useOutletContext();

	const { cart } = useCart();

	const subtotal = cart.reduce((total, item) => {
		const product = products.find((p) => p.id === item.productId);

		if (!product) return total;

		return total + product.price * item.quantity;
	}, 0);

	return (
		<main className={styles.main}>
			<div className={styles.shoppingCart}>
				<h1>Shopping Cart</h1>
				<div className={styles.cartItems}>
					{cart.length === 0 && <p>Your cart is empty.</p>}

					{cart.map((item) => {
						const product = products.find((p) => p.id === item.productId);

						if (!product) return null;

						return (
							<div key={item.productId} className={styles.cartItem}>
								<Link to={`/product/${item.productId}`}>
									<img
										src={product.image}
										alt=""
										className={styles.cartItemImg}
									/>
								</Link>
								<div className={styles.cartItemTitleContainer}>
									<h2>{product.title}</h2>
									<div className={styles.itemValues}>
										<div className={styles.qtyContainer}>
											<h3>Quantity</h3>
											<CartControls
												productId={item.productId}
												cartQty={item.quantity}
												variant="cart"
											/>
										</div>
										<div className={styles.priceContainer}>
											<h3>Price</h3>
											<p>{`$${product.price.toFixed(2)}`}</p>
										</div>
										<div className={styles.extPriceContainer}>
											<h3>Ext Price</h3>
											<p>{`$${(product.price * item.quantity).toFixed(2)}`}</p>
										</div>
									</div>
								</div>
							</div>
						);
					})}

					{cart.length > 0 && (
						<div className={styles.cartSummary}>
							<h4>Taxes and shipping fees will be calculated at checkout.</h4>
							<h3>Subtotal</h3>
							<p>{`$${subtotal.toFixed(2)}`}</p>
						</div>
					)}
				</div>
				{cart.length > 0 && (
					<button className={styles.checkoutBtn}>PROCEED TO CHECKOUT</button>
				)}
			</div>
		</main>
	);
}
