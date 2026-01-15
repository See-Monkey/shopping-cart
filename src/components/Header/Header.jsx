import styles from "./Header.module.css";
import { Link } from "react-router";

export default function Header() {
	return (
		<header className={styles.header}>
			<nav>
				<Link to={"/"}>Home</Link>
				<Link to={"shop"}>Shop</Link>
				<Link to={"cart"}>Cart</Link>
			</nav>
		</header>
	);
}
