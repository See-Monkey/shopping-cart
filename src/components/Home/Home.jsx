import { useMemo } from "react";
import { Link, useOutletContext } from "react-router";
import styles from "./Home.module.css";
import photoOne from "../../images/caroline-badran-L06sfkcn1Ic-unsplash.jpg";
import photoTwo from "../../images/clay-banks-Ie3fp14d_NQ-unsplash.jpg";
import photoThree from "../../images/imani-bahati-UrQeWGobTnI-unsplash.jpg";
import photoFour from "../../images/clay-banks-Ua8FfP8SYeA-unsplash.jpg";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import ShopProduct from "../ShopProduct/ShopProduct.jsx";

export default function Home() {
	const { products } = useOutletContext();

	const randomProduct = useMemo(() => {
		if (!products || products.length === 0) return null;
		const index = Math.floor(Math.random() * products.length);
		return products[index];
	}, [products]);

	if (!randomProduct) return null;

	const carouselPhotos = [photoOne, photoTwo, photoThree, photoFour];

	return (
		<main className={styles.main}>
			<ImageCarousel images={carouselPhotos} delay={6000} />

			<div className={styles.animatedLogo}>
				<h1 className={styles.welcome}>Welcome</h1>
				<div className={styles.toTheLogoContainer}>
					<div className={styles.toTheContainer}>
						<h2 className={styles.toThe}>to</h2>
						<h2 className={styles.toThe}>the</h2>
					</div>
					<div className={styles.logoText}>
						<h1 className={styles.logoTextLittle}>Little</h1>
						<h1 className={styles.logoTextBig}>BIG</h1>
						<h1 className={styles.logoTextShop}>Shop</h1>
					</div>
				</div>
			</div>

			<div className={styles.homeContent}>
				<div className={styles.links}>
					<h3>Best Prices</h3>
					<h3 className={styles.guaranteed}>GUARANTEED</h3>
					<p>What are you looking for today?</p>
					<ul>
						<li>
							<Link to={"shop/men"}>Men's Clothing</Link>
						</li>
						<li>
							<Link to={"shop/women"}>Women's Clothing</Link>
						</li>
						<li>
							<Link to={"shop/jewelry"}>Jewelry</Link>
						</li>
						<li>
							<Link to={"shop/electronics"}>Electronics</Link>
						</li>
					</ul>
				</div>
				<ShopProduct item={randomProduct} />
			</div>
		</main>
	);
}
