import React, { Suspense, lazy } from "react";
import styles from "./WebsiteMetric.module.sass";
import { Box } from "@chakra-ui/react";
// import TopCountry from "./TopCountryFoundry";
// import PageTraffics from "./PagesURLPathsFoundry/PageTraffics";
// import TopSource from "./TopSourcesFoundry";
// import TopDevices from "./TopDevicesFoundry";

const TopCountry = lazy(() => import("./TopCountryFoundry"));
const PageTraffics = lazy(() => import("./PagesURLPathsFoundry/PageTraffics"));
const TopSource = lazy(() => import("./TopSourcesFoundry"));
const TopDevices = lazy(() => import("./TopDevicesFoundry"));

const WebsiteMediaMetric = () => {
  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <Box my={"2rem"} />
        <TopSource className={styles.card} />
        <Box my={"2rem"} />
        <PageTraffics />
        <Box my={"2rem"} />
      </div>

      <div className={styles.col} style={{ marginLeft: 20 }}>
        <Box my={"2rem"} />
        <TopCountry className={styles.card} />
        <Box my={"2rem"} />
        <TopDevices />
      </div>
    </div>
  );
};

export default WebsiteMediaMetric;
