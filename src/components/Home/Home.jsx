import { useOutletContext } from "react-router";
import styles from "./Home.module.css";

export default function Home() {
	const { products } = useOutletContext();

	return (
		<main className={styles.main}>
			<div>Home</div>
		</main>
	);
}
