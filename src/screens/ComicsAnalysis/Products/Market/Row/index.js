import React, { useState } from "react";
import styles from "./Row.module.sass";
import cn from "classnames";

import { numberWithCommas } from "../../../../../utils.js";

const Row = ({ item }) => {
	return (
		<>
			<div className={styles.row}>
				<div className={styles.col} />
				<div className={styles.col}>
					<div className={styles.item}>
						<div className={styles.preview}>
							<img
								srcSet={`${item.image2x} 2x`}
								src={item.image}
								alt='Ticker-Price-product'
							/>
						</div>
						<div className={styles.details}>
							<div className={styles.product}>{item.product}</div>
							<div className={styles.wrap}>
								<div className={styles.category}>{item.category}</div>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.col}>
					<div className={styles.label}>Status</div>
					{item.status ? (
						<div className={cn("status-green", styles.status)}>Active</div>
					) : (
						<div className={cn("status-red", styles.status)}>Ended</div>
					)}
				</div>
				<div className={styles.col}>${item.openPrice}</div>
				<div className={styles.col}>
					<div className={styles.label}>Closing Price</div>
					<div className={styles.sales}>
						<div className={styles.number}>
							${numberWithCommas(item.closing)}
						</div>
					</div>
				</div>
				<div className={styles.col}>
					<div className={styles.label}>Bids</div>
					<div className={styles.box}>
						<div className={styles.number}>{item.bids}</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Row;
