import React from "react";
import cn from "classnames";
import styles from "./Overview.module.sass";
import TooltipGlodal from "../../../components/TooltipGlodal";
import Card from "../../../components/Card";


const KPI = ({ className, dataI }) => {
  const positive = [];
  const neutral = [];
  const negative = [];
  const total = [];

  if (dataI) {
    const data_analysis = dataI;

    for (let key in data_analysis) {
      positive.push(data_analysis[key]?.weekly_positive);
      neutral.push(data_analysis[key]?.weekly_neutral);
      negative.push(data_analysis[key]?.weekly_negative);
      total.push(data_analysis[key]?.weekly_total);
    }
  }

  const items = [
    {
      title: "positive mentions",
      counter: `${positive}`,
      background: "#B5E4CA",
    },
    {
      title: "negative mentions",
      counter: `${negative}`,
      value: 2,
      background: "#FF6A55",
    },
    {
      title: "neutral mentions",
      counter: `${neutral}`,
      value: 0,
      background: "#2A85FF",
    },
  ];
  return (
    <>
      <Card
        className={cn(styles.card, className)}
        title="Weekly Brand Health Scorecard"
        description={`${total} posts mentioning Beckett this week`}
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
