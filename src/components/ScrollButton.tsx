"use client";

import { useState } from "react";

import styles from "./ScrollButton.module.css";

export function ScrollButton() {
	const [visible, setVisible] = useState(false);

	const toggleVisible = () => {
		const scrolled = document.body.scrollTop;
		if (scrolled > 100) {
			setVisible(true);
			console.log("we be scrolling", scrolled);
		} else if (scrolled <= 100) {
			setVisible(false);
			console.log("no scroll", scrolled);
		}
	};

	const scrollToTop = () => {
		document.body.scrollTo({
			behavior: "smooth",
			top: 0,
		});
	};

	document.body.addEventListener("scroll", toggleVisible);

	return (
		<button
			className={styles.scrollButton}
			onClick={scrollToTop}
			style={{ display: visible ? "inline" : "none" }}
			type="button"
		>
			Back to Top⬆
		</button>
	);
}
