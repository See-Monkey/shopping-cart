import styles from "./Header.module.css";
import { Link } from "react-router";
import logoImg from "../../icons/icons8-shop-64.png";
import cartIcon from "../../icons/shopping-cart.svg";
import menuIcon from "../../icons/menu.svg";

export default function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.headerMobile}>
				<Link to={"/"} className={styles.logoLink}>
					<img src={logoImg} alt="store logo" className={styles.logoImg} />
					<div className={styles.logoText}>
						<h1 className={styles.logoTextLittle}>Little</h1>
						<h1 className={styles.logoTextBig}>BIG</h1>
						<h1 className={styles.logoTextShop}>Shop</h1>
					</div>
				</Link>
				<img src={menuIcon} alt="menu icon" className={styles.menuIcon} />
			</div>
			<nav className={styles.nav}>
				<Link to={"home"}>Home</Link>
				<Link to={"shop"}>Shop</Link>
				<Link to={"cart"} className={styles.cartLink}>
					Cart
					<div className={styles.cartIcon}>
						<img src={cartIcon} />
						<div className={styles.cartCounter}>7</div>
					</div>
				</Link>
			</nav>
		</header>
	);
}
