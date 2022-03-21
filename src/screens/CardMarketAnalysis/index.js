import React from "react";

import styles from "./MarketAnalysis.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import { Box } from "@chakra-ui/react";
import Table from "./AverageSelling";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import SentimentAnalysis from "./AverageSelling/MarketDataGraphs";
import TotalSoldData from "./TotalSold/MarketDataGraphs";
import ComingSoon from "../CominSoon/ComingSoon";
import TotalSold from "./TotalSold";
import SellThrough from "./SellThrough";
import SellThroughData from "./SellThrough/MarketDataGraphs";
import TotalSales from "./TotalSales";
import TotalSellers from "./TotalSellers";
import TotalSellersData from "./TotalSellers/MarketDataGraphs";
import TotalSalesData from "./TotalSales/MarketDataGraphs";

const MarketAnalysis = () => {
  return (
    <>
      {/* <Tabs>
        <TabList>
          <Tab>Average Selling Price</Tab>
          <Tab>Total Sold</Tab>
          <Tab>Sell Through</Tab>
          <Tab>Total Sellers</Tab>
          <Tab>Total Sales</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <div className={styles.section}>
              <Table />
              <Box my={"4rem"} />
              <SentimentAnalysis />
            </div>
            <TooltipGlodal />
          </TabPanel>
          <TabPanel>
            <TotalSold />
            <Box my={"4rem"} />
            <TotalSoldData />
          </TabPanel>
          <TabPanel>
            <SellThrough />
            <Box my={"4rem"} />
            <SellThroughData />
          </TabPanel>
          <TabPanel>
            <TotalSellers />
            <Box my={"4rem"} />
            <TotalSellersData />
          </TabPanel>
          <TabPanel>
            <TotalSales />
            <Box my={"4rem"} />
            <TotalSalesData />
          </TabPanel>
        </TabPanels>
      </Tabs> */}
      <ComingSoon />
    </>
  );
};

export default MarketAnalysis;
