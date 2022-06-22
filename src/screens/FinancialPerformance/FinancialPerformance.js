import React from "react";
import TooltipGlodal from "../../components/TooltipGlodal";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import BalanceSheet from "./BalanceSheet";
import RevenueStreams from "./RevenueStreams";
import ProfitAndLoss from "./ProfitAndLoss";

// update json version
import ComingSoon from "../CominSoon/ComingSoon";
import profit_monthly from "../../mocks/financial_update/data_monthly.json";
import profit_quarterly from "../../mocks/financial_update/data_quarterly.json";
import profit_pivot_quarterly from "../../mocks/financial_update/data_pivot_quarterly.json";

import revenue_monthly from "../../mocks/financial_update/revenue_monthly.json";
import revenue_quarterly from "../../mocks/financial_update/revenue_quarterly.json";
import revenue_pivot_quarterly from "../../mocks/financial_update/revenue_pivot_quarterly.json";

import balance_monthly from "../../mocks/financial_update/balance_monthly.json";
import balance_quarterly from "../../mocks/financial_update/balance_quarterly.json";
import balance_pivot_quarterly from "../../mocks/financial_update/balance_pivot_quarterly.json";

const OpsPerformance = () => {
  const pivot_quarterly = profit_pivot_quarterly;
  const monthly = profit_monthly;
  const quarterly = profit_quarterly;

  const revenueStreams = revenue_monthly;
  const revenueStreamsQuarterly = revenue_quarterly;
  const revenueStreamsPivotQuarterly = revenue_pivot_quarterly;

  const balanceSheet = balance_monthly;
  const balanceQuarterly = balance_quarterly;
  const balancePivotQuarterly = balance_pivot_quarterly;

  return (
    <>
      {/* <ComingSoon /> */}
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
              color: "gray.700",
              bg: "#68D391",
              borderRadius: 5,
              _focus: { boxShadow: "none", outline: "none" },
            }}
          >
            Profit & Loss
          </Tab>

          <Tab
            color={"white"}
            _selected={{
              color: "gray.700",
              bg: "#68D391",
              borderRadius: 5,
              _focus: { boxShadow: "none", outline: "none" },
            }}
          >
            Revenue Streams
          </Tab>

          <Tab
            color={"white"}
            _selected={{
              color: "gray.700",
              bg: "#68D391",
              borderRadius: 5,
              _focus: { boxShadow: "none", outline: "none" },
            }}
          >
            Balance Sheet
          </Tab>
          
          
        </TabList>

        <TabPanels>
          <TabPanel>
            <ProfitAndLoss
              quarterly={quarterly}
              pivot_quarterly={pivot_quarterly}
              monthly={monthly}
            />
          </TabPanel>
          
          <TabPanel>
            <RevenueStreams
              // revenueStreams={revenueStreams}
              // revenueStreamsQuarterly={revenueStreamsQuarterly}
              // revenueStreamsPivotQuarterly={revenueStreamsPivotQuarterly}
              revenueStreams={monthly}
              revenueStreamsQuarterly={quarterly}
              revenueStreamsPivotQuarterly={pivot_quarterly}
            />
          </TabPanel>

          <TabPanel>
            <div>
              <BalanceSheet
                balanceQuarterly={balanceQuarterly}
                balanceSheet={balanceSheet}
                balancePivotQuarterly={balancePivotQuarterly}
              />
            </div>
          </TabPanel>
          
        </TabPanels>
        <TooltipGlodal />
      </Tabs>
    </>
  );
};

export default OpsPerformance;
