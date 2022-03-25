import React from "react";
import styles from "./WebsiteMetric.module.sass";
import TopCountry from "./TopCountryFoundry";
import { Box } from "@chakra-ui/react";
import PageTraffics from "./PagesURLPathsFoundry/PageTraffics";
import TopSource from "./TopSourcesFoundry";
import TopDevices from "./TopDevicesFoundry";

const WebsiteMediaMetric = ({ dataW, dataD, dataC, dataP }) => {
  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <Box my={"2rem"} />
        <TopSource className={styles.card} topSources={dataW} />
        <Box my={"2rem"} />
        <PageTraffics data={dataP} />
        <Box my={"2rem"} />
      </div>

      <div className={styles.col} style={{ marginLeft: 20 }}>
        <Box my={"2rem"} />
        <TopCountry className={styles.card} data={dataC} />
        <Box my={"2rem"} />
        <TopDevices data={dataD} />
      </div>
    </div>
  );
};

export default WebsiteMediaMetric;
