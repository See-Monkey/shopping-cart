import { useOutletContext } from "react-router";
import styles from "./Shop.module.css";
import Loading from "../Loading/Loading.jsx";
import ShopProduct from "../../components/ShopProduct/ShopProduct.jsx";

export default function Shop() {
	const { loading, products } = useOutletContext();

	const menClothing = products.filter(
		(product) => product.category === "men's clothing",
	);
	const womenClothing = products.filter(
		(product) => product.category === "women's clothing",
	);
	const jewelry = products.filter((product) => product.category === "jewelery");
	const electronics = products.filter(
		(product) => product.category === "electronics",
	);

	return (
		<main className={styles.main}>
			{loading && <Loading />}
			{!loading && (
				<div className={styles.content}>
					<h1>Men's Clothing</h1>
					<div className={styles.productsContainer}>
						{menClothing.map((product) => (
							<ShopProduct key={product.id} item={product} />
						))}
					</div>
					<h1>Women's Clothing</h1>
					<div className={styles.productsContainer}>
						{womenClothing.map((product) => (
							<ShopProduct key={product.id} item={product} />
						))}
					</div>
					<h1>Jewelry</h1>
					<div className={styles.productsContainer}>
						{jewelry.map((product) => (
							<ShopProduct key={product.id} item={product} />
						))}
					</div>
					<h1>Electronics</h1>
					<div className={styles.productsContainer}>
						{electronics.map((product) => (
							<ShopProduct key={product.id} item={product} />
						))}
					</div>
				</div>
			)}
		</main>
	);
}
