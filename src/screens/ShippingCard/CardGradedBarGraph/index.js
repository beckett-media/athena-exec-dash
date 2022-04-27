import React, { useState } from "react";
import styles from "./TrafficChannel.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useDarkMode from "use-dark-mode";
import { numberWithCommas } from "../../../utils";
import { Grading_Terms } from "../../../mocks/carddata/grading_terms";

const TrafficChannel = ({ className }) => {
  const darkMode = useDarkMode(false);

  return (
    <Card
      className={cn(styles.card, className)}
      title="Graded - Service Type"
      classTitle="title-green"
    >
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={Grading_Terms}
            margin={{
              top: 0,
              right: 0,
              left: 12,
              bottom: 0,
            }}
            barSize={76}
            barGap={8}
          >
            <CartesianGrid
              strokeDasharray="none"
              stroke={darkMode.value ? "#272B30" : "#EFEFEF"}
              vertical={false}
            />
            <XAxis
              dataKey="Unique_Customers"
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fontWeight: "500", fill: "#6F767E" }}
              // make to k
              tickFormatter={(value) => {
                if (value >= 1000000) {
                  return `${(value / 1000000).toFixed(1)}M`;
                } else if (value >= 1000) {
                  return `${(value / 1000).toFixed(1)}K`;
                } else {
                  return value;
                }
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#272B30",
                borderColor: "rgba(255, 255, 255, 0.12)",
                borderRadius: 8,
                boxShadow: "15px 30px 40px 5px rgba(0, 0, 0, 0.5)",
              }}
              labelStyle={{ fontSize: 12, fontWeight: "500", color: "#fff" }}
              itemStyle={{
                padding: 0,
                textTransform: "capitalize",
                fontSize: 12,
                fontWeight: "600",
              }}
            />
            <Bar dataKey="January" stackId="a" fill="#C48CF4" />
            <Bar dataKey="February" stackId="a" fill="#2A85FF" />
            <Bar dataKey="March" stackId="a" fill="#83BF6E" />
            <Bar dataKey="May" stackId="a" fill="#B1E5FC" />
            <Bar dataKey="June" stackId="a" fill="#FF6A55" />
            <Bar dataKey="July" stackId="a" fill="#FFB959" />
            <Bar dataKey="August" stackId="a" fill="#DCF341" />
            <Bar dataKey="September" stackId="a" fill="#FFACAC" />
            <Bar dataKey="October" stackId="a" fill="#7353ea" />
            <Bar dataKey="November" stackId="a" fill="#ea7153" />
            <Bar dataKey="December" stackId="a" fill="#FFE959" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* <div className={styles.legend}>
        {legend.map((x, index) => (
          <div className={styles.indicator} key={index}>
            <div
              className={styles.color}
              style={{ backgroundColor: x.color }}
            ></div>
            {x.Unique_Customers}
          </div>
        ))}
      </div> */}
    </Card>
  );
};

export default TrafficChannel;

//tootip custom content

const tooltipContent = (props) => {
  const { payload, label } = props;

  return (
    <div
      style={{
        borderRadius: "8px",
        color: "white",
        padding: "1rem",
        boxShadow: "15px 30px 40px 5px rgba(0, 0, 0, 0.5)",
        textAlign: "center",
        backgroundColor: "#272B30",
      }}
    >
      <p className="label">{`${label}`}</p>
      <div className="payload">
        {payload.map((entry, index) => (
          <div
            key={`item-${index}`}
            className="item"
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >
            <div
              className="color"
              style={{
                backgroundColor: entry.fill,
                width: "3rem",
                height: "1rem",
                marginRight: "0.5rem",
              }}
            ></div>
            <div className="value">{`${numberWithCommas(entry.value)}`}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
