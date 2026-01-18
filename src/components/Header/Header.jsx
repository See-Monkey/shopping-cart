import { useState } from "react";
import { Link } from "react-router";
import { useCart } from "../../context/CartContext";
import styles from "./Header.module.css";
import logoImg from "../../icons/icons8-shop-64.png";
import cartIcon from "../../icons/shopping-cart.svg";
import menuIcon from "../../icons/menu.svg";

export default function Header() {
	const [navOpen, setNavOpen] = useState(false);

	const { cart } = useCart();

	const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

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
					aria-label="Toggle navigation"
					aria-expanded={navOpen}
				>
					<img src={menuIcon} alt="" className={styles.menuIcon} />
				</button>
			</div>

			<nav className={`${styles.nav} ${navOpen ? styles.navOpen : ""}`}>
				<Link to={"shop"} onClick={() => setNavOpen(false)}>
					Shop All
				</Link>
				<Link to={"shop/men"} onClick={() => setNavOpen(false)}>
					Men
				</Link>
				<Link to={"shop/women"} onClick={() => setNavOpen(false)}>
					Women
				</Link>
				<Link to={"shop/jewelry"} onClick={() => setNavOpen(false)}>
					Jewelry
				</Link>
				<Link to={"shop/electronics"} onClick={() => setNavOpen(false)}>
					Electronics
				</Link>
				<Link
					to={"cart"}
					className={styles.cartLink}
					onClick={() => setNavOpen(false)}
				>
					Cart
					<div className={styles.cartIcon}>
						<img src={cartIcon} alt="" />
						{totalItems > 0 && (
							<div className={styles.cartCounter}>{totalItems}</div>
						)}
					</div>
				</Link>
			</nav>
		</header>
	);
}
