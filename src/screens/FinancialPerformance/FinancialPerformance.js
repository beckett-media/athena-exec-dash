import React, { useEffect, useState } from "react";
import TooltipGlodal from "../../components/TooltipGlodal";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import { Storage } from 'aws-amplify';

import BalanceSheet from "./BalanceSheet";
import RevenueStreams from "./RevenueStreams";
import ProfitAndLoss from "./ProfitAndLoss";

function OpsPerformance() {
  const [opsDictionary, setOpsDictionary] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const dataNames = ['data_monthly','data_quarterly','data_pivot_quarterly','revenue_monthly','revenue_quarterly','revenue_pivot_quarterly','balance_monthly','balance_quarterly','balance_pivot_quarterly'];

    // usage
    async function downloadJSONs() {
      setIsLoading(true);

      const dataDict ={};
      await Promise.all(dataNames.map(async (key) => {
        const fileKey = 'finance-data/' + key + '.json'
        const result = await Storage.get(fileKey, { download: true });
        dataDict[key] = (JSON.parse(await result.Body.text()))
      }))
      setOpsDictionary(dataDict);
      setIsLoading(false);
    }

    downloadJSONs()
  }, [])


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!opsDictionary) {
    return null;
  }

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
              pl_quarterly={opsDictionary['data_quarterly']}
              pl_pivot_quarterly={opsDictionary['data_pivot_quarterly']}
              pl_monthly={opsDictionary['data_monthly']}
            />
          </TabPanel>
          <TabPanel>
            <RevenueStreams
              revenueStreams={opsDictionary['revenue_monthly']}
              revenueStreamsQuarterly={opsDictionary['revenue_quarterly']}
              revenueStreamsPivotQuarterly={opsDictionary['revenue_pivot_quarterly']}
            />
          </TabPanel>
          <TabPanel>
            <BalanceSheet
              bs_quarterly={opsDictionary['balance_quarterly']}
              bs_monthly={opsDictionary['balance_monthly']}
              bs_pivoted_quarterly={opsDictionary['balance_pivot_quarterly']}
            />
          </TabPanel>
        </TabPanels>
        <TooltipGlodal />
      </Tabs>
    </>
  );
}

export default OpsPerformance;
