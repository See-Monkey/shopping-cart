import { useEffect, useState } from "react";
import styles from "./ImageCarousel.module.css";

export default function ImageCarousel({ images, delay = 5000 }) {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (!images.length) return;

		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
		}, delay);

		return () => clearInterval(interval);
	}, [images.length, delay]);

	const goToNext = () => {
		setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	};

	const goToPrevious = () => {
		setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	};

	const goToSlide = (index) => {
		setCurrentIndex(index);
	};

	if (!images.length) return null;

	return (
		<div className={styles.carousel}>
			<button
				className={`${styles.carouselArrow} ${styles.left}`}
				onClick={goToPrevious}
			>
				❮
			</button>

			<div className={styles.imgContainer}>
				{images.map((src, index) => (
					<img
						key={src}
						src={src}
						alt={`Slide ${index + 1}`}
						aria-hidden={index !== currentIndex}
						className={`${styles.carouselImg} ${
							index === currentIndex ? styles.active : styles.inactive
						}`}
					/>
				))}
			</div>

			<button
				className={`${styles.carouselArrow} ${styles.right}`}
				onClick={goToNext}
			>
				❯
			</button>

			<div className={styles.dotsContainer}>
				{images.map((_, index) => (
					<button
						key={index}
						className={`${styles.dot} ${index === currentIndex ? styles.active : ""}`}
						aria-current={index === currentIndex}
						onClick={() => goToSlide(index)}
					/>
				))}
			</div>
		</div>
	);
}
