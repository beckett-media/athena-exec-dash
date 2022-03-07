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

const legend = [
  {
    title: "Search",
    color: "#0353A4",
  },
  {
    title: "Direct",
    color: "#2A85FF",
  },
  {
    title: "Referral",
    color: "#83BF6E",
  },
  {
    title: "Social",
    color: "#B1E5FC",
  },
  {
    title: "Other",
    color: "#FF6A55",
  },
];

const data = [
  {
    name: "Jan 25",
    other: 13,
    social: 96,
    referral: 287,
    direct: 26000,
    search: 35000,
  },
  {
    name: "Jan 26",
    search: 33000,
    direct: 25000,
    referral: 270,
    social: 94,
    other: 9,
  },
  {
    name: "Jan 27",
    search: 33000,
    direct: 34000,
    referral: 255,
    social: 124,
    other: 9,
  },
  {
    name: "Jan 28",
    search: 29000,
    direct: 28000,
    referral: 246,
    social: 197,
    other: 15,
  },
  {
    name: "Jan 29",
    search: 28000,
    direct: 21000,
    referral: 207,
    social: 91,
    other: 12,
  },
  {
    name: "Jan 30",
    search: 28000,
    direct: 2000,
    referral: 243,
    social: 120,
    other: 12,
  },
  {
    name: "Jan 31",
    search: 34000,
    direct: 28000,
    referral: 298,
    social: 89,
    other: 12,
  },
];

const TrafficChannel = ({ className }) => {
  const darkMode = useDarkMode(false);

  return (
    <Card
      className={cn(styles.card, className)}
      title="Beckett website traffic"
      classTitle="title-purple"
    >
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 0,
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
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fontWeight: "500", fill: "#6F767E" }}
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
            <Bar dataKey="search" stackId="a" fill="#0353A4" />
            <Bar dataKey="direct" stackId="a" fill="#2A85FF" />
            <Bar dataKey="referral" stackId="a" fill="#83BF6E" />
            <Bar dataKey="social" stackId="a" fill="#B1E5FC" />
            <Bar dataKey="other" stackId="a" fill="#FF6A55" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.legend}>
        {legend.map((x, index) => (
          <div className={styles.indicator} key={index}>
            <div
              className={styles.color}
              style={{ backgroundColor: x.color }}
            ></div>
            {x.title}
          </div>
        ))}
      </div>
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
