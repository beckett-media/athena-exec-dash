import React from "react";
import cn from "classnames";
import styles from "./CardTop.module.sass";
import TooltipGlodal from "../../../components/TooltipGlodal";
import Card from "../../../components/Card";
import PercentOfPostPerWeek from "../../../components/PercentOfPostPerWeek";
import { Grid } from "@chakra-ui/react";

const items = [
	{
		title: "Total Sales",
		counter: "$128k",
		color: "#B5E4CA",
		value: 37.8,
	},
	{
		title: "Average Selling Price",
		counter: "$52.64",
		color: "#CABDFF",
		value: -17.8,
	},
	{
		title: "BBS Average Sales",
		counter: "$64k",
		color: "#B1E5FC",
		value: 24.3,
	},
];

const CardTop = ({ className }) => {
	return (
		<>
			<Card className={cn(styles.card, className)}>
				<div className={styles.overview}>
					<Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}>
						{items.map((x, index) => (
							<div
								style={{ paddingBottom: "2rem", paddingTop: "2rem" }}
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
			<TooltipGlodal />
		</>
	);
};

export default CardTop;
