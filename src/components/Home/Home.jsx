import { useOutletContext } from "react-router";
import styles from "./Home.module.css";
import photoOne from "../../images/caroline-badran-L06sfkcn1Ic-unsplash.jpg";
import photoTwo from "../../images/clay-banks-Ie3fp14d_NQ-unsplash.jpg";
import photoThree from "../../images/imani-bahati-UrQeWGobTnI-unsplash.jpg";
import photoFour from "../../images/clay-banks-Ua8FfP8SYeA-unsplash.jpg";
import ImageCarousel from "../ImageCarousel/ImageCarousel";

export default function Home() {
	const { products } = useOutletContext();

	const carouselPhotos = [photoOne, photoTwo, photoThree, photoFour];

	return (
		<main className={styles.main}>
			<ImageCarousel images={carouselPhotos} delay={6000} />
		</main>
	);
}
