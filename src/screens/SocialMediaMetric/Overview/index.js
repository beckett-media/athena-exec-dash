import React, { useState } from "react";
import cn from "classnames";
import styles from "./PostPerWeekGraph.module.sass";
import Card from "../../../components/Card";
import PercentOfPostPerWeek from "../../../components/PercentOfPostPerWeek";
import moment from "moment";
import ZoomChart from "./Chart/ZoomChart";
import { API } from "aws-amplify";
import Loading from "../../../components/LottieAnimation/Loading";

const BeginingOfWeek = (props) => {
  const [sentimentData, setData] = useState([]);

  function getData() {
    const apiName = "palentirApi";
    const path = "/socialmedia/socialdata";

    return API.get(apiName, path);
  }

  React.useEffect(() => {
    (async function () {
      const response = await getData();
      setData(response);
    })();
  }, []);

  const positive = [];
  const neutral = [];
  const negative = [];
  const numPosts = [];
  const date = [];
  const sentiment_analysis = [];

  if (sentimentData) {
    const data_analysis = sentimentData?.data;

    for (let key in data_analysis) {
      positive.push(data_analysis[key]?.positive);
      neutral.push(data_analysis[key]?.neutral);
      negative.push(data_analysis[key]?.negative);
      numPosts.push(data_analysis[key]?.numposts);

      date.push(data_analysis[key]?.date);
    }

    // change to {name: '03/04/2022', positive: 0, neutral: 25, negative: 0}
    for (let i = 0; i < date?.length; i++) {
      sentiment_analysis.push({
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
        value={props.value}
        background
      />
      {sentiment_analysis[0]?.name !== undefined && (
        <>vs {moment(`${sentiment_analysis[0]?.name}`).format("MMM Do")}</>
      )}
    </>
  );
};

const PostPerWeekGraph = ({ className }) => {
  const [socialindicators, setData] = useState([]);
  function getData() {
    const apiName = "palentirApi";
    const path = "/socialmedia/socialindicators";

    return API.get(apiName, path);
  }

  React.useEffect(() => {
    (async function () {
      const response = await getData();
      setData(response);
    })();
  }, []);

  const percent_indicators = [];

  if (socialindicators) {
    const data_analysis = socialindicators?.data;

    for (let key in data_analysis) {
      percent_indicators.push({
        perc_inc: data_analysis[key]?.perc_inc,
      });
    }
  }

  if (socialindicators?.data === undefined) {
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
                value={`${(percent_indicators[0]?.perc_inc).toFixed(2)}`}
              />
            )}
          </div>
        </div>
        <ZoomChart />
      </div>
    </Card>
  );
};

export default PostPerWeekGraph;
