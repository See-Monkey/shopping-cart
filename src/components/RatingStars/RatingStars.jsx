import styles from "./RatingStars.module.css";
import starIcon from "../../icons/star.svg";
import starHalfFullIcon from "../../icons/star-half-full.svg";
import starOutlineIcon from "../../icons/star-outline.svg";

export default function RatingStars({ rating }) {
	const roundedRating = Math.round(rating * 2) / 2;
	const stars = [1, 2, 3, 4, 5];

	return (
		<div
			className={styles.ratingStars}
			role="img"
			aria-label={`Rated ${roundedRating} out of 5 stars`}
		>
			{stars.map((starNumber) => {
				let starSrc;

				if (roundedRating >= starNumber) {
					starSrc = starIcon;
				} else if (roundedRating >= starNumber - 0.5) {
					starSrc = starHalfFullIcon;
				} else {
					starSrc = starOutlineIcon;
				}

				return (
					<img
						key={starNumber}
						src={starSrc}
						alt=""
						aria-hidden="true"
						className={styles.star}
					/>
				);
			})}
		</div>
	);
}
