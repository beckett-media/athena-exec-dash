import React from "react";
import cn from "classnames";
// import OutsideClickHandler from "react-outside-click-handler";
import styles from "./LogoHeader.module.sass";

const LogoHeader = ({ className }) => {
	return (
		<>
			<div className={cn(styles.user, className)}>
				<div className={styles.head}>
					{/* <img src='/images/content/Beckett-Logo-Full-Wordmark-0K.png' alt='Avatar' /> */}
				</div>
			</div>
		</>
	);
};

export default LogoHeader;
