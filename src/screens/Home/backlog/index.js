import React, { useState } from "react";
import styles from "./GradedVsReceivedGraph.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";
import useDarkMode from "use-dark-mode";

const data = [
	{
		name: "Jan 12",
		received: 500,
		graded: 300,
		backlog: 10000,
	},
	{
		name: "Jan 13",
		received: 600,
		graded: 320,
		backlog: 8000,
	},
	{
		name: "Jan 14",
		received: 550,
		graded: 270,
		backlog: 7100,
	},
	{
		name: "Jan 16",
		received: 450,
		graded: 230,
		backlog: 8600,
	},
	{
		name: "Jan 17",
		received: 620,
		graded: 280,
		backlog: 8900,
	},
	{
		name: "Jan 18",
		received: 500,
		graded: 300,
		backlog: 8100,
	},
	{
		name: "Jan 19",
		received: 600,
		graded: 320,
		backlog: 7320,
	},
	{
		name: "Jan 20",
		received: 550,
		graded: 270,
		backlog: 8565,
	},
];

const Backlog = ({ className }) => {
	const darkMode = useDarkMode(false);

	return (
		<Card
			className={cn(styles.card, className)}
			title='Backlog'
			classTitle={cn("title-purple", styles.cardTitle)}
			classCardHead={styles.cardHead}
		>
			<div className={styles.chart}>
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 0,
							right: 0,
							left: 0,
							bottom: 0,
						}}
					>
						<CartesianGrid
							strokeDasharray='none'
							stroke={darkMode.value ? "#272B30" : "#EFEFEF"}
							vertical={true}
						/>
						<XAxis
							dataKey='name'
							axisLine={false}
							tickLine={true}
							tick={{ fontSize: 12, fontWeight: "500", fill: "#9A9FA5" }}
							padding={{ left: 10 }}
						/>
						<Legend verticalAlign='top' height={36} />
						<YAxis
							axisLine={false}
							tickLine={true}
							tick={{ fontSize: 12, fontWeight: "500", fill: "#9A9FA5" }}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: "#272B30",
								borderColor: "rgba(255, 255, 255, 0.12)",
								borderRadius: 8,
								boxShadow:
									"0px 4px 8px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.1), inset 0px 0px 1px #000000",
							}}
							labelStyle={{ fontSize: 12, fontWeight: "500", color: "#fff" }}
							itemStyle={{
								padding: 0,
								textTransform: "capitalize",
								fontSize: 12,
								fontWeight: "600",
								color: "#fff",
							}}
						/>
						{/* <Line
							type='monotone'
							dataKey='received'
							dot={true}
							strokeWidth={3}
							stroke='#2A85FF'
						/>
						<Line
							type='monotone'
							dataKey='graded'
							dot={true}
							strokeWidth={3}
							stroke='#83BF6E'
						/> */}
						<Line
							type='monotone'
							dataKey='backlog'
							dot={true}
							strokeWidth={3}
							stroke='#FF6A55'
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</Card>
	);
};

export default Backlog;
