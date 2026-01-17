import { useOutletContext, useParams } from "react-router";
import styles from "./Shop.module.css";
import Loading from "../Loading/Loading.jsx";
import ShopProduct from "../../components/ShopProduct/ShopProduct.jsx";

export default function Shop() {
	const { loading, products } = useOutletContext();
	const { category } = useParams();

	const categoryMap = {
		men: "men's clothing",
		women: "women's clothing",
		jewelry: "jewelery",
		electronics: "electronics",
	};

	const filteredProducts = category
		? products.filter((product) => product.category === categoryMap[category])
		: products;

	return (
		<main className={styles.main}>
			{loading && <Loading />}

			{!loading && !category && (
				<div className={styles.content}>
					<h1>Men</h1>
					<div className={styles.productsContainer}>
						{products
							.filter((p) => p.category === "men's clothing")
							.map((product) => (
								<ShopProduct key={product.id} item={product} />
							))}
					</div>

					<h1>Women</h1>
					<div className={styles.productsContainer}>
						{products
							.filter((p) => p.category === "women's clothing")
							.map((product) => (
								<ShopProduct key={product.id} item={product} />
							))}
					</div>

					<h1>Jewelry</h1>
					<div className={styles.productsContainer}>
						{products
							.filter((p) => p.category === "jewelery")
							.map((product) => (
								<ShopProduct key={product.id} item={product} />
							))}
					</div>

					<h1>Electronics</h1>
					<div className={styles.productsContainer}>
						{products
							.filter((p) => p.category === "electronics")
							.map((product) => (
								<ShopProduct key={product.id} item={product} />
							))}
					</div>
				</div>
			)}

			{!loading && category && (
				<div className={styles.content}>
					<h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
					<div className={styles.productsContainer}>
						{filteredProducts.map((product) => (
							<ShopProduct key={product.id} item={product} />
						))}
					</div>
				</div>
			)}
		</main>
	);
}
