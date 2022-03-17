import React from "react";

import styles from "./MarketAnalysis.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import CompanySales from "./Graph";
import { Box } from "@chakra-ui/react";
import Table from "./AverageSelling";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import SentimentAnalysis from "./AverageSelling/Sentiment/SentimentAnalysis";
import ComingSoon from "../CominSoon/ComingSoon";

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
            <p>Total Sold</p>
          </TabPanel>
          <TabPanel>
            <p>Sell Through</p>
          </TabPanel>
          <TabPanel>
            <p>Total Sellers</p>
          </TabPanel>
          <TabPanel>
            <p>Total Sales</p>
          </TabPanel>
        </TabPanels>
      </Tabs> */}
      <ComingSoon />
    </>
  );
};

export default MarketAnalysis;
