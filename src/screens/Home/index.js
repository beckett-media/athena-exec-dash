import React from "react";
import styles from "./BeckettDash.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import GradingCards from "./GradingCards";
import ReceivedChart from "./ReceivedChart";
import GradedVsReceivedGraph from "./GradedVsReceivedGraph";
import { Box } from "@chakra-ui/react";
import Backlog from "./backlog";
import ComingSoon from "../CominSoon/ComingSoon";



const ProductsDashboard = () => {
	return (
		<>
			<div className={styles.section}>
				{/* <GradingCards className={styles.card} />
				<div className={styles.row}>
					<div className={styles.col}>
						<GradedVsReceivedGraph />
						<Box my={15} />
						<Backlog />
					</div>
					<div className={styles.col}>
						<ReceivedChart />
					</div>
				</div> */}
				<ComingSoon />
			</div>
			<TooltipGlodal />
		</>
	);
};

export default ProductsDashboard;
