import React from "react";

import styles from "./MarketAnalysis.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Table from "./AverageSelling";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import ComingSoon from "../CominSoon/ComingSoon";

import TotalSales from "./TotalSales";
import TotalSellers from "./TotalSellers";
import TotalSold from "./TotalSold";

import SellThrough from "./SellThrough";

const MarketAnalysis = ({ data, isLoading }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {/* <Tabs
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
            <Tab
              _selected={{ color: "white", bg: "blue.500", borderRadius: 10 }}
            >
              Average Selling Price
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "blue.500", borderRadius: 10 }}
            >
              Total Sold
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "blue.500", borderRadius: 10 }}
            >
              Sell Through
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "blue.500", borderRadius: 10 }}
            >
              Total Sellers
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "blue.500", borderRadius: 10 }}
            >
              Total Sales
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <div className={styles.section}>
                <Table data={data} isLoading={isLoading} />
              </div>
            </TabPanel>
            <TabPanel>
              <TotalSold data={data} isLoading={isLoading} />
            </TabPanel>
            <TabPanel>
              <SellThrough data={data} isLoading={isLoading} />
            </TabPanel>
            <TabPanel>
              <TotalSellers data={data} isLoading={isLoading} />
            </TabPanel>
            <TabPanel>
              <TotalSales data={data} isLoading={isLoading} />
            </TabPanel>
          </TabPanels>
          <TooltipGlodal />
        </Tabs> */}
        <ComingSoon />
      </>
    );
  }
};

export default MarketAnalysis;
