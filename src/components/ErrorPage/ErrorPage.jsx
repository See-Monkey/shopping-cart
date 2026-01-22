import styles from "./ErrorPage.module.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import sadKitten from "../../images/vecteezy_sad-cat-daydreaming-illustration_44183676.png";
import { Link } from "react-router";

export default function ErrorPage() {
	return (
		<>
			<Header />
			<main className={styles.main}>
				<h1>Hmm, something isn't right</h1>
				<div className={styles.errorContainer}>
					<img src={sadKitten} alt="sad kitten" />
					<p>
						The page you're looking for doesn't seem to exist or has been moved.
					</p>
				</div>
				<p>
					Click <Link to={"/"}>here</Link> to go back to safety.
				</p>
			</main>
			<Footer />
		</>
	);
}
