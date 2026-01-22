import { Link, useParams, useOutletContext, useNavigate } from "react-router";
import { useEffect } from "react";
import styles from "./ProductDetail.module.css";
import Loading from "../Loading/Loading.jsx";
import RatingStars from "../RatingStars/RatingStars.jsx";
import CartControls from "../CartControls/CartControls.jsx";
import { useCart } from "../../context/CartContext";

export default function ProductDetail() {
	const { productId } = useParams();
	const { products, loading } = useOutletContext();
	const navigate = useNavigate();
	const { getItemQty } = useCart();

	const numericId = Number(productId);
	const product = products.find((p) => p.id === numericId);

	useEffect(() => {
		if (!loading && (!numericId || !product)) {
			navigate("*", { replace: true });
		}
	}, [loading, numericId, product, navigate]);

	if (loading) return <Loading />;
	if (!product) return null; // redirecting

	const cartQty = getItemQty(product.id);

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
						<CartControls productId={product.id} cartQty={cartQty} />
					</div>
				</div>
			</div>
		</main>
	);
}
