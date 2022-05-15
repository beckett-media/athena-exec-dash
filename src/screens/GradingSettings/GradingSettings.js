import React from "react";
import styles from "./GradingSettings.module.sass";
import { Box } from "@chakra-ui/react";
// import PostPerWeekGraph from "./Overview";
// import SentimentAnalysis from "./Sentiment/SentimentAnalysis";
// import TopCountry from "./TopCountry";
// import SocialMessages from "./SocialMessage";
// import KPI from "./KPI";
import ComingSoon from "../CominSoon/ComingSoon";

const Settings = ({ dataI, socialData, socialMessage }) => {
  return (
    <>
      {/* <div className={styles.row}>
        <div className={styles.col}>
          <KPI className={styles.card} dataI={dataI} />
          <Box my={"2rem"} />
          <PostPerWeekGraph
            className={styles.card}
            dataI={dataI}
            socialData={socialData}
          />
          <Box my={"2rem"} />
          <SentimentAnalysis
            socialData={socialData}
            dataI={dataI}
            socialMessage={socialMessage}
          />
          <Box my={"2rem"} />
        </div>
        <div className={styles.col} style={{ marginLeft: 20 }}>
          <SocialMessages socialMessage={socialMessage} />
          <Box my={"2rem"} />
          <TopCountry className={styles.card} />
        </div>
      </div> */}
      <ComingSoon />
    </>
  );
};

export default Settings;
