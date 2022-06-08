import React from "react";

import styles from "./MarketAnalysis.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import ComingSoon from "../CominSoon/ComingSoon";
import TablePivots from "./PivotTable";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Box,
} from "@chakra-ui/react";
import ComicsGraphs from "./scatterPlot";
import HistogramGraph from "./histogram";

const ComicAnalysis = ({ dataCI }) => {
  return (
    <>
      <div className={styles.section}>
        {/* <Tabs
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
              Graphs
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
              Searchable Table
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className={styles.section}>
                <ComicsGraphs data={dataCI} />
                <Box h={"3rem"} />
                <HistogramGraph data={dataCI} />
              </div>
            </TabPanel>
            <TabPanel>
              <TablePivots dataCI={dataCI} />
            </TabPanel>
          </TabPanels>
          <TooltipGlodal />
        </Tabs> */}
        <div className={styles.section}>
        <TablePivots dataCI={dataCI} />
        </div>
      </div>

      <TooltipGlodal />
    </>
  );
};

export default ComicAnalysis;
