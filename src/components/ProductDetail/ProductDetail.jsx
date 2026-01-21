import { Link, useParams, useOutletContext } from "react-router";
import styles from "./ProductDetail.module.css";
import Loading from "../Loading/Loading.jsx";
import RatingStars from "../RatingStars/RatingStars.jsx";
import CartControls from "../CartControls/CartControls.jsx";
import { useCart } from "../../context/CartContext";

export default function ProductDetail() {
	const { productId } = useParams();
	const numericProductId = Number(productId);
	const { products, loading } = useOutletContext();
	const { getItemQty } = useCart();
	const cartQty = getItemQty(numericProductId);

	const product = products.find((p) => p.id === Number(productId));

	const categoryBreadcrumbMap = {
		"men's clothing": {
			label: "Men's Clothing",
			slug: "men",
		},
		"women's clothing": {
			label: "Women's Clothing",
			slug: "women",
		},
		jewelery: {
			label: "Jewelry",
			slug: "jewelry",
		},
		electronics: {
			label: "Electronics",
			slug: "electronics",
		},
	};

	const breadcrumbCategory = product && categoryBreadcrumbMap[product.category];

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
						<nav className={styles.breadcrumbs}>
							<span>
								<Link to="/shop">Shop</Link>
							</span>
							<span className={styles.separator}>❯</span>
							<span>
								<Link to={`/shop/${breadcrumbCategory.slug}`}>
									{breadcrumbCategory.label}
								</Link>
							</span>
						</nav>
						<h1>{product.title}</h1>
						<div className={styles.ratingContainer}>
							<RatingStars rating={product.rating.rate} />
							<p>({product.rating.count})</p>
						</div>
						<p>{product.description}</p>
						<div className={styles.priceCartControlsContainer}>
							<p className={styles.price}>${product.price.toFixed(2)}</p>
							<CartControls productId={numericProductId} cartQty={cartQty} />
						</div>
					</div>
				</div>
			)}
		</main>
	);
}
