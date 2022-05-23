import React from "react";
import styles from "./WebsiteMetric.module.sass";
import TopCountry from "./TopCountryFoundry";
import { Box } from "@chakra-ui/react";
import PageTraffics from "./PagesURLPathsFoundry/PageTraffics";
import TopSource from "./TopSourcesFoundry";
import TopDevices from "./TopDevicesFoundry";
import { useApiData } from "../../providers/apiData";

const WebsiteMediaMetric = () => {
  const { trafficData, deviceData , countriesData, pagesData, isLoading, status} =
    useApiData();
  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <Box my={"2rem"} />
        <TopSource
          className={styles.card}
          topSources={trafficData}
          isLoading={isLoading}
          status={status}
        />
        <Box my={"2rem"} />
        <PageTraffics data={pagesData} />
        <Box my={"2rem"} />
      </div>

      <div className={styles.col} style={{ marginLeft: 20 }}>
        <Box my={"2rem"} />
        <TopCountry className={styles.card} data={countriesData} />
        <Box my={"2rem"} />
        <TopDevices data={deviceData} />
      </div>
    </div>
  );
};

export default WebsiteMediaMetric;
