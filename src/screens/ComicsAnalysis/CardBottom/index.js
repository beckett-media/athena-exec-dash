import React from "react";
import cn from "classnames";
import styles from "./CardBottom.module.sass";
import Card from "../../../components/Card";
import { Box, Grid } from "@chakra-ui/react";

import PercentOfPostPerWeek from "../../../components/PercentOfPostPerWeek";



const items = [
	{
		title: "Cards Sold",
		counter: "$18k",
		color: "#B5E4CA",
		value: 37.8,
	},
	{
		title: "Number of Sellers",
		counter: "$12.64",
		color: "#CABDFF",
		value: -17.8,
	},
	{
		title: "OPG Revenue",
		counter: "$6k",
		color: "#B1E5FC",
		value: 24.3,
	},
];

const CardBottom = ({ className }) => {
	return (
		<>
			<Card className={cn(styles.card, className)}>
				<div className={styles.overview}>
					<Grid
						templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
					>
						{items.map((x, index) => (
							<div
								style={{ paddingBottom: "2rem", paddingTop: "2rem"}}
								className={styles.item}
								key={index}
							>
								<div className={styles.details}>
									<div className={styles.label}>{x.title}</div>
									<div className={styles.counter}>{x.counter}</div>
									<div className={styles.indicator}>
										<PercentOfPostPerWeek
											className={styles.balance}
											value={x.value}
										/>
										<span>this week</span>
									</div>
								</div>
							</div>
						))}
					</Grid>
				</div>
			</Card>
			<Box my={"3rem"} />
		</>
	);
};

export default CardBottom;
