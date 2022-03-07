import React, { useState } from "react";
import cn from "classnames";
import styles from "./PostPerWeekGraph.module.sass";
import Card from "../../../components/Card";
import PercentOfPostPerWeek from "../../../components/PercentOfPostPerWeek";
import moment from "moment";
import ZoomChart from "./Chart/ZoomChart";
import Twitter from "../../../mocks/sentimentData.json";

const PostPerWeekGraph = ({ className }) => {
  const indicators = Twitter;


  const date = indicators.map((item) => {
    const { indicators } = item;
    // add key to data object and number of posts to value object
    const data = Object.keys(indicators).map((key) => {
      return {
        indicators: key,
        perc_inc: indicators[key],
      };
    });

    return data;
  });

  // get first
  const firstDate = indicators[0].data;
  const firstDateKey = Object.keys(firstDate);

  return (
    <Card
      className={cn(styles.card, className)}
      title="Post Volume Around Beckett"
      classTitle={cn("title-red", styles.cardTitle)}
      classCardHead={styles.cardHead}
    >
      <div className={styles.overview}>
        <div className={styles.details}>
          <div className={styles.line}>
            <PercentOfPostPerWeek
              className={styles.balance}
              value={`${date[0][0].perc_inc}`}
              background
            />
            vs {moment(`${firstDateKey[0]}`).format("MMM Do")}
          </div>
        </div>
        <ZoomChart />
      </div>
    </Card>
  );
};

export default PostPerWeekGraph;
