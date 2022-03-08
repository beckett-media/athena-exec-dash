import React from "react";
import cn from "classnames";
import styles from "./Overview.module.sass";
import TooltipGlodal from "../../../components/TooltipGlodal";
import Card from "../../../components/Card";
import Balance from "../../../components/PercentOfPostPerWeek";

const items = [
	{
		title: "Card graded per week",
		counter: "1.2k",
		value: 37.8,
		background: "#B5E4CA",
	},
	{
		title: "Grading speed",
		counter: "45%",
		value: -37.8,
		background: "#B1E5FC",
	},
	{
		title: "Card in backlog",
		counter: "10,000",
		value: 0.8,
		background: "#FF6A55",
	},
];

const GradingCards = ({ className }) => {
	return (
		<>
			<Card
				className={cn(styles.card, className)}
				title='Weekly Grading Score Card'
				classTitle='title-purple'
			>
				<div className={styles.overview}>
					<div className={styles.list}>
						{items.map((x, index) => (
							<div
								className={styles.item}
								key={index}
								style={{ backgroundColor: x.background }}
							>
								<div className={styles.line}>
									<div className={styles.details}>
										<div className={styles.category}>{x.title}</div>
										<div className={styles.counter}>{x.counter}</div>
										{x.value !== 0 && (
											<div className={styles.indicator}>
												<Balance className={styles.balance} value={x.value} />
												<span>this week</span>
											</div>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</Card>
			<TooltipGlodal />
		</>
	);
};

export default GradingCards;
