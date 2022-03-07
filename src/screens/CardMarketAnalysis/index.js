import React from "react";

import styles from "./MarketAnalysis.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import CardsTop from "./CardTop";
import CompanySales from "./CompanySales";
import TopCountries from "./TopCountries";
import CardsBottom from "./CardBottom";
import { Box } from "@chakra-ui/react";
import PriceTicker from "./Products/PriceTicker";
import ComingSoon from "../CominSoon/ComingSoon";

const MarketAnalysis = () => {
  return (
    <>
      <div className={styles.section}>
        {/* <CardsBottom className={styles.card} />
				<CardsTop className={styles.card} />
				<div className={styles.row}>
					<div className={styles.col}>
						<Box my={"4rem"} />
						<CompanySales />
						<Box my={"4rem"} />
					</div>
					<div className={styles.col}>
						<Box my={"4rem"} />
						<TopCountries />
					</div>
				</div> */}
        <ComingSoon />
      </div>
      <TooltipGlodal />
    </>
  );
};

export default MarketAnalysis;
