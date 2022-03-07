import React from "react";
import styles from "./Table.module.sass";
import cn from "classnames";
import { numberWithCommas } from "../../../utils.js";

const items = [
	{
		date: "PSA",
		status: false,
		total: 564.58,
		earnings: 31.62,
		avg: 136.59,
	},
	{
		date: "BGS",
		status: true,
		total: 23.24,
		earnings: 25.26,
		avg: 136.59,
	},
	{
		date: "SGC",
		status: false,
		total: 562.16,
		earnings: 15.88,
		avg: 136.59,
	},
	{
		date: "SGC",
		status: true,
		total: 54.48,
		earnings: 45.86,
		avg: 136.59,
	},
	{
		date: "CSG",
		status: true,
		total: 563.32,
		earnings: 22.44,
		avg: 136.59,
	},
	{
		date: "HGA",
		status: false,
		total: 455.64,
		earnings: 61.6,
		avg: 136.59,
	},
];

const Table = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.table}>
	
				<div className={styles.row}>
					<div className={styles.col}>Group</div>
					<div className={styles.col}>Avg</div>
					<div className={styles.col}>Total Sold</div>
					<div className={styles.col}>Share</div>
				</div>
				{items.map((x, index) => (
					<div className={styles.row} key={index}>
						<div className={styles.col}>{x.date}</div>
						<div className={styles.col}>$ {x.total}</div>
						<div className={styles.col}>$ {x.total}</div>
						<div className={styles.col}>
							{numberWithCommas(x.earnings.toFixed(2))}%
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Table;
