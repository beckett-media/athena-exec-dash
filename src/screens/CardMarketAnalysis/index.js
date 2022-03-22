import React, { Suspense, lazy } from "react";

import styles from "./MarketAnalysis.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import { Box } from "@chakra-ui/react";
import Table from "./AverageSelling";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import ComingSoon from "../CominSoon/ComingSoon";

import TotalSales from "./TotalSales";
import TotalSellers from "./TotalSellers";
import TotalSold from "./TotalSold";

import SellThrough from "./SellThrough";

const MarketAnalysis = () => {
  return (
    <>
      <Tabs
        variant="unstyled"
        isFitted
        borderRadius={0}
        lazyBehavior="mount"
        variantColor="blue"
        defaultIndex={0}
        isLazy={false}
        size="lg"
      >
        <TabList my={5}>
          <Tab _selected={{ color: "white", bg: "blue.500", borderRadius: 10 }}>
            Average Selling Price
          </Tab>
          <Tab _selected={{ color: "white", bg: "blue.500", borderRadius: 10 }}>
            Total Sold
          </Tab>
          <Tab _selected={{ color: "white", bg: "blue.500", borderRadius: 10 }}>
            Sell Through
          </Tab>
          <Tab _selected={{ color: "white", bg: "blue.500", borderRadius: 10 }}>
            Total Sellers
          </Tab>
          <Tab _selected={{ color: "white", bg: "blue.500", borderRadius: 10 }}>
            Total Sales
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <div className={styles.section}>
              <Table />
            </div>
            <TooltipGlodal />
          </TabPanel>
          <TabPanel>
            <TotalSold />
          </TabPanel>
          <TabPanel>
            <SellThrough />
          </TabPanel>
          <TabPanel>
            <TotalSellers />
          </TabPanel>
          <TabPanel>
            <TotalSales />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* <ComingSoon /> */}
    </>
  );
};

export default MarketAnalysis;
