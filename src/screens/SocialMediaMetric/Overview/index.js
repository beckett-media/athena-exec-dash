import React from "react";
import cn from "classnames";
import styles from "./PostPerWeekGraph.module.sass";
import Card from "../../../components/Card";
import PercentOfPostPerWeek from "../../../components/PercentOfPostPerWeek";
import moment from "moment";
import ZoomChart from "./Chart/ZoomChart";
import Loading from "../../../components/LottieAnimation/Loading";

const BeginingOfWeek = ({ socialData, dataI }) => {
  const positive = [];
  const neutral = [];
  const negative = [];
  const numPosts = [];
  const date = [];
  const sentiment_analysis = [];

  if (socialData) {
    const data_analysis = socialData;

    for (let key in data_analysis) {
      positive.push(data_analysis[key]?.positive);
      neutral.push(data_analysis[key]?.neutral);
      negative.push(data_analysis[key]?.negative);
      numPosts.push(data_analysis[key]?.numposts);

      date.push(data_analysis[key]?.date);
    }

    for (let i = 0; i < date?.length; i++) {
      sentiment_analysis?.push({
        name: date[i],
        positive: positive[i],
        neutral: neutral[i],
        negative: negative[i],
      });
    }
  }

  return (
    <>
      <PercentOfPostPerWeek
        className={styles.balance}
        value={dataI}
        background
      />
      {sentiment_analysis[0]?.name !== undefined && (
        <>vs {moment(`${sentiment_analysis[0]?.name}`).format("MMM Do")}</>
      )}
    </>
  );
};

const PostPerWeekGraph = ({ className, dataI, socialData }) => {
  const percent_indicators = [];

  if (dataI) {
    const data_analysis = dataI;

    for (let key in data_analysis) {
      percent_indicators.push({
        perc_inc: data_analysis[key]?.perc_inc,
      });
    }
  }

  if (!dataI) {
    return <Loading />;
  }

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
            {percent_indicators[0]?.perc_inc !== undefined && (
              <BeginingOfWeek
                socialData={socialData}
                dataI={(percent_indicators[0]?.perc_inc).toFixed(2)}
              />
            )}
          </div>
        </div>
        <ZoomChart socialData={socialData} />
      </div>
    </Card>
  );
};

export default PostPerWeekGraph;
