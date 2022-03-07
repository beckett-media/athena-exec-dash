import React, { useState } from "react";
import styles from "./Header.module.sass";
import LogoHeader from "./Logo";

const Header = ({ onOpen }) => {
	const [visible, setVisible] = useState(false);
	const handleClick = () => {
		onOpen();
		setVisible(false);
	};

	return (
		<header className={styles.header}>
			<button className={styles.burger} onClick={() => handleClick()} />

			<div className={styles.control} onClick={() => setVisible(false)}>
				<LogoHeader className={styles.user} />
			</div>
		</header>
	);
};

export default Header;
