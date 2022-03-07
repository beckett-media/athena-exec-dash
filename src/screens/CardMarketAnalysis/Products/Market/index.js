import React, { useState } from "react";
import styles from "./Market.module.sass";
import Icon from "../../../../components/Icon";
import Row from "./Row";

const Market = ({ items }) => {
	return (
		<div className={styles.market}>
			<div className={styles.table}>
				<div className={styles.row}>
					<div className={styles.col} /> {/* For space */}
					<div className={styles.col}>Product</div>
					<div className={styles.col}>Status</div>
					<div className={styles.col}>Open Price</div>
					<div className={styles.col}>Closing Price</div>
					<div className={styles.col}>Bids</div>
				</div>
				{items.map((x, index) => (
					<Row item={x} key={index} up={items.length - index <= 2} />
				))}
			</div>
			<div className={styles.foot}>
				<button className={styles.arrow}>
					<Icon name='arrow-left' size='20' />
				</button>
				<button className={styles.arrow}>
					<Icon name='arrow-right' size='20' />
				</button>
			</div>
		</div>
	);
};

export default Market;
