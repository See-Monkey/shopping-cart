import { useState } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router";
import logoImg from "../../icons/icons8-shop-64.png";
import cartIcon from "../../icons/shopping-cart.svg";
import menuIcon from "../../icons/menu.svg";

export default function Header() {
	const [navOpen, setNavOpen] = useState(false);

	return (
		<header className={styles.header}>
			<div className={styles.headerMobile}>
				<Link
					to={"/"}
					className={styles.logoLink}
					onClick={() => setNavOpen(false)}
				>
					<img src={logoImg} alt="store logo" className={styles.logoImg} />
					<div className={styles.logoText}>
						<h1 className={styles.logoTextLittle}>Little</h1>
						<h1 className={styles.logoTextBig}>BIG</h1>
						<h1 className={styles.logoTextShop}>Shop</h1>
					</div>
				</Link>

				<button
					className={styles.menuBtn}
					onClick={() => setNavOpen((open) => !open)}
					aria-label="toggle navigation"
					aria-expanded={navOpen}
				>
					<img src={menuIcon} alt="" className={styles.menuIcon} />
				</button>
			</div>

			<nav className={`${styles.nav} ${navOpen ? styles.navOpen : ""}`}>
				<Link to={"home"} onClick={() => setNavOpen(false)}>
					Home
				</Link>
				<Link to={"shop"} onClick={() => setNavOpen(false)}>
					Shop
				</Link>
				<Link
					to={"cart"}
					className={styles.cartLink}
					onClick={() => setNavOpen(false)}
				>
					Cart
					<div className={styles.cartIcon}>
						<img src={cartIcon} alt="" />
						<div className={styles.cartCounter}>7</div>
					</div>
				</Link>
			</nav>
		</header>
	);
}
