import styles from "./Footer.module.css";
import emailIcon from "../../icons/mail.svg";
import phoneIcon from "../../icons/phone.svg";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.contactContainer}>
				<h3>Contact Us</h3>
				<div className={styles.contactEmail}>
					<img src={emailIcon} alt="Email" />
					<p>support@littleb1gshop.non</p>
				</div>
				<div className={styles.contactPhone}>
					<img src={phoneIcon} alt="Phone" />
					<p>(800) 555-8888</p>
				</div>
			</div>
			<div className={styles.footerImg}>
				<div className={styles.linkContainer}>
					<a href="#">Careers</a>
					<a href="#">About Us</a>
					<a href="#">FAQ</a>
				</div>
			</div>
		</footer>
	);
}
