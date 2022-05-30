import React from "react";
import TooltipGlodal from "../../components/TooltipGlodal";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import BalanceSheet from "./BalanceSheet";
import RevenueStreams from "./RevenueStreams";
import ProfitAndLoss from "./ProfitAndLoss";

import json_quarter_pivot_pl from "../../mocks/financial_mock/json_quarter_pivot_pl.json";
import json_monthly_pl from "../../mocks/financial_mock/json_monthly_pl.json";
import json_quarterly from "../../mocks/financial_mock/json_quarterly.json";

import revenue from "../../mocks/financial_mock/revenue.json";
import revenue_quarterly from "../../mocks/financial_mock/revenue_quarterly.json";
import revenue_pivot_quarterly from "../../mocks/financial_mock/revenue_pivot_quarterly.json";

import balance_sheet from "../../mocks/financial_mock/balance_monthly.json";
import balance_quarterly from "../../mocks/financial_mock/balance_quarterly.json";
import balance_pivot_quarterly from "../../mocks/financial_mock/balance_pivot_quarterly.json";

const OpsPerformance = ({ data, isLoading }) => {
  const quartly = json_quarter_pivot_pl;
  const monthly = json_monthly_pl;
  const quarterly = json_quarterly;

  const revenueStreams = revenue;
  const revenueStreamsQuarterly = revenue_quarterly;
  const revenueStreamsPivotQuarterly = revenue_pivot_quarterly;

  const balanceSheet = balance_sheet;
  const balanceQuarterly = balance_quarterly;
  const balancePivotQuarterly = balance_pivot_quarterly;

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
              color: "gray.700",
              bg: "#68D391",
              borderRadius: 5,
              _focus: { boxShadow: "none", outline: "none" },
            }}
          >
            Balance Sheet
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
            Profit & Loss
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <div>
              <BalanceSheet
                balanceQuarterly={balanceQuarterly}
                balanceSheet={balanceSheet}
                balancePivotQuarterly={balancePivotQuarterly}
              />
            </div>
          </TabPanel>
          <TabPanel>
            <RevenueStreams
              revenueStreams={revenueStreams}
              revenueStreamsQuarterly={revenueStreamsQuarterly}
              revenueStreamsPivotQuarterly={revenueStreamsPivotQuarterly}
            />
          </TabPanel>
          <TabPanel>
            <ProfitAndLoss
              quarterly={quarterly}
              quartly={quartly}
              monthly={monthly}
            />
          </TabPanel>
        </TabPanels>
        <TooltipGlodal />
      </Tabs>
    </>
  );
};

export default OpsPerformance;
