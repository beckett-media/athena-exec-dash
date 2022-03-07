import React, { useState } from "react";
import cn from "classnames";
import styles from "./Overview.module.sass";
import TooltipGlodal from "../../../components/TooltipGlodal";
import Card from "../../../components/Card";
import Balance from "../../../components/PercentOfPostPerWeek";
import { SocialMedia } from "../../../mocks/social_media_messages";
import sentimentData from "../../../mocks/sentimentData.json";

const items = [
  {
    title: "positive mentions",
    counter: `${sentimentData[0].indicators.weekly_positive}`,
    value: 0,
    background: "#B5E4CA",
  },
  {
    title: "negative mentions",
    counter: `${sentimentData[0].indicators.weekly_negative}`,
    value: 2,
    background: "#FF6A55",
  },
  {
    title: "neutral mentions",
    counter: `${sentimentData[0].indicators.weekly_neutral}`,
    value: 0,
    background: "#2A85FF",
  },
];

const KPI = ({ className }) => {
  return (
    <>
      <Card
        className={cn(styles.card, className)}
        title="Weekly Brand Health Scorecard"
        description={`${sentimentData[0].indicators.weekly_total} posts mentioning Beckett this week`}
        classTitle="title-purple"
      >
        <div className={styles.overview}>
          <div className={styles.list}>
            {items.map((x, index) => (
              <div
                className={styles.item}
                key={index}
                style={{ backgroundColor: x.background }}
              >
                <div className={styles.line}>
                  <div className={styles.details}>
                    <div className={styles.category}>{x.title}</div>
                    <div className={styles.counter}>{x.counter}</div>
                    {/* {x.value !== 0 && (
                      <div className={styles.indicator}>
                        <Balance className={styles.balance} value={x.value} />
                        <span>change</span>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <TooltipGlodal />
    </>
  );
};

export default KPI;
