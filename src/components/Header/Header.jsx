import styles from "./Header.module.css";
import { Link } from "react-router";

export default function Header() {
	return (
		<header className={styles.header}>
			<nav>Header</nav>
		</header>
	);
}
