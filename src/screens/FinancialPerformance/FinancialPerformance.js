import React from "react";
import styles from "./FinancialPerformance.module.sass";
import { Box } from "@chakra-ui/react";
import BudgetGraph from "./BudgetGraph";
import RevenueGraph from "./RevenueGraph";
import PnLGraph from "./PnLGraph";
import ComingSoon from "../CominSoon/ComingSoon";
import TooltipGlodal from "../../components/TooltipGlodal";
import Table from "./AverageSelling";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import TotalSales from "./TotalSales";
import TotalSellers from "./TotalSellers";
import TotalSold from "./TotalSold";

import SellThrough from "./SellThrough";

const OpsPerformance = ({ data, isLoading }) => {
  return (
    <>
      <Tabs
        isManual
        variant="enclosed"
        isFitted
        borderRadius={0}
        lazyBehavior="mount"
        variantColor="blue"
        defaultIndex={0}
        isLazy={false}
        size="md"
      >
        <TabList my={8}>
          <Tab
            color={"white"}
            _selected={{
              color: "black",
              bg: "#f7b267",
              borderRadius: 5,
            }}
          >
            Average Selling Price
          </Tab>
          <Tab
            color={"white"}
            _selected={{
              color: "black",
              bg: "#f7b267",
              borderRadius: 5,
              _focus: { boxShadow: "none", outline: "none" },
            }}
          >
            Total Sold
          </Tab>
          <Tab
            color={"white"}
            _selected={{ color: "black", bg: "#f7b267", borderRadius: 5 }}
          >
            Sell Through
          </Tab>
          <Tab
            color={"white"}
            _selected={{ color: "black", bg: "#f7b267", borderRadius: 5 }}
          >
            Total Sellers
          </Tab>
          <Tab
            color={"white"}
            _selected={{ color: "black", bg: "#f7b267", borderRadius: 5 }}
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
      </Tabs>
    </>
  );
};

export default OpsPerformance;
