import React, { useState } from "react";
import styles from "./CampanySales.module.sass";
import cn from "classnames";
import Card from "../../../../components/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useDarkMode from "use-dark-mode";
import moment from "moment";

const AverageSellingGraph = ({ className }) => {
  const darkMode = useDarkMode(false);

  return (
    <Card
      className={cn(styles.card, className)}
      title="Company Sales"
      classTitle="title-purple"
    >
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          {/* <LineChart
            width={500}
            height={300}
            data={average_selling_price}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 30,
            }}
          >
            <Legend
              layout="horizontal"
              align="center"
              horizontalAlign="bottom"
            />
            <CartesianGrid
              strokeDasharray="none"
              stroke={darkMode.value ? "#272B30" : "#EFEFEF"}
              vertical={true}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fontWeight: "500", fill: "#9A9FA5" }}
              padding={{ left: 10 }}
              tickFormatter={(value) => moment(`${value}`).format("MMM Do")}
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
              // formar label
              labelFormatter={(value) =>
                moment(`${value}`).format("MMM Do YYYY")
              }
              // rename dataKey
              formatter={(value, name) => [`${name}:: ${value} `]}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fontWeight: "500", fill: "#9A9FA5" }}
            />
            <Line
              type="monotone"
              dataKey="name"
              dot={true}
              r={7}
              // get label from data

              //   activeDot={{
              //     onClick: () => {
              //       // openmoodal and set sentiment type
              //       setOpen(true);
              //       setSentimentType("positive");
              //       setColor("title-green");
              //       setEmoji("😎");
              //       setDescBg("#83BF6E");
              //       setSentimeTotal(positive[0]);
              //     },
              //   }}
              strokeWidth={3}
              stroke="#83BF6E"
            />
            <Line
              type="monotone"
              dataKey="neutral"
              dot={true}
              strokeWidth={3}
              stroke="#2A85FF"
              r={7}
              //   activeDot={{
              //     onClick: () => {
              //       // openmoodal and set sentiment type
              //       setOpen(true);
              //       setSentimentType("neutral");
              //       setColor("title-blue");
              //       setEmoji("");
              //       setDescBg("#2A85FF");
              //     },
              //   }}
            />
            <Line
              type="monotone"
              dataKey="negative"
              dot={true}
              r={7}
              strokeWidth={3}
              stroke="#FF6A55"
              //   activeDot={{
              //     onClick: () => {
              //       // openmoodal and set sentiment type
              //       setOpen(true);
              //       setSentimentType("negative");
              //       setColor("title-red");
              //       setEmoji("😡");
              //       setDescBg("#FF6A55");
              //     },
              //   }}
            />
          </LineChart> */}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default AverageSellingGraph;
