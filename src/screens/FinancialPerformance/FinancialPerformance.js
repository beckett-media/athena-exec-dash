import React, { useEffect, useState } from "react";
import TooltipGlodal from "../../components/TooltipGlodal";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import { Storage, StorageProvider } from 'aws-amplify';

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

// const OpsPerformance = () => {
  
  
//   // const quartly = download('data_pivot_quarterly').then((result) => {return result});
  
//   // const dictionary = {'data_pivot_quarterly': quartly, 'data_monthly': monthly, 'data_quarterly': quarterly, 
//   //                        'revenue_monthly': revenueStreams, 'revenue_quarterly': revenueStreamsQuarterly, 
//   //                        'revenue_pivot_quarterly': revenueStreamsPivotQuarterly,
//   //                        'balance_monthly': balanceSheet, 'balance_quarterly': balanceQuarterly, 
//   //                        'balance_pivot_quarterly': balancePivotQuarterly}
//   // return opsPerformance(dictionary)
// };





function OpsPerformance() {

  // const quartly = profit_pivot_quarterly;
  // const monthly = profit_monthly;
  // const quarterly = profit_quarterly;

  // const revenueStreams = revenue_monthly;
  // const revenueStreamsQuarterly = revenue_quarterly;
  // const revenueStreamsPivotQuarterly = revenue_pivot_quarterly;

  // const balanceSheet = balance_monthly;
  // const balanceQuarterly = balance_quarterly;
  // const balancePivotQuarterly = balance_pivot_quarterly;  

  const [opsDictionary, setOpsDictionary] = useState({})
  const [isLoading, setIsLoading] = useState(true)


  const dataNames = ['data_monthly','data_quarterly','data_pivot_quarterly','revenue_monthly','revenue_quarterly','revenue_pivot_quarterly','balance_monthly','balance_quarterly','balance_pivot_quarterly']
  // usage
  async function downloadJSONs() {
    const dataDict ={};
    await Promise.all(dataNames.map(async (key) => {
      const fileKey = 'finance-data/' + key + '.json'
      const result = await Storage.get(fileKey, { download: true });
      dataDict[key] = (JSON.parse(await result.Body.text()))
    }))
    setOpsDictionary(dataDict);
    setIsLoading(false);
  }
  
  useEffect(() => {
    downloadJSONs()
  }, [isLoading])


  if (isLoading) {
    return <div>Loading...</div>;
  } else {

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
          
        </TabList>
        <TabPanels>
          <TabPanel>
            <ProfitAndLoss
              quarterly={opsDictionary['data_quarterly']}
              quartly={opsDictionary['data_pivot_quarterly']}
              monthly={opsDictionary['data_monthly']}
            />
          </TabPanel>
          <TabPanel>
            <div>
              <BalanceSheet
                balanceQuarterly={opsDictionary['balance_quarterly']}
                balanceSheet={opsDictionary['balance_monthly']}
                balancePivotQuarterly={opsDictionary['balance_pivot_quarterly']}
              />
            </div>
          </TabPanel>
          <TabPanel>
            <RevenueStreams
              revenueStreams={opsDictionary['revenue_monthly']}
              revenueStreamsQuarterly={opsDictionary['revenue_quarterly']}
              revenueStreamsPivotQuarterly={opsDictionary['revenue_pivot_quarterly']}
            />
          </TabPanel>
        </TabPanels>
        <TooltipGlodal />
      </Tabs>
    </>
  );
          }
}


export default OpsPerformance;

function isLoading() {
  return "Loading..."
}

// const fileNames = ['finance-data/balance_monthly.json', 'finance-data/balance_pivot_quarterly.json', 'finance-data/balance_quarterly.json', 'finance-data/data_monthly.json', 'finance-data/data_pivot_quarterly.json', 'finance-data/data_quarterly.json', 'finance-data/revenue_monthly.json', 'finance-data/revenue_pivot_quarterly.json', 'finance-data/revenue_quarterly.json']

// function validateStorage() {
//   const storageList = Storage.list('').then((result) => {
//     const storedFolders = result.map((x) => (x['key']));
//     return fileNames.every(fileName => {return storedFolders.includes(fileName)});
//   });
//   return storageList;
// }


