import React, { useState } from "react";
import styles from "./SentimentAnalysis.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import { Text } from "@chakra-ui/react";
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
import sentimentData from "../../../mocks/sentimentData.json";
import moment from "moment";

const dataAnalysis = sentimentData;

const sentiment = dataAnalysis.map((item) => {
  const { data } = item;
  const sent_Analysis = Object.keys(data).map((key) => {
    return {
      name: key,
      positive: data[key].positive,
      neutral: data[key].neutral,
      negative: data[key].negative,
    };
  });
  return sent_Analysis;
});

const data = sentiment[0];

const SentimentAnalysis = ({ className }) => {
  const darkMode = useDarkMode(false);

  return (
    <Card
      className={cn(styles.card, className)}
      title="Social Media Sentiment Around Beckett"
      classTitle={cn("title-green", styles.cardTitle)}
      classCardHead={styles.cardHead}
    >
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
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
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fontWeight: "500", fill: "#9A9FA5" }}
            />
            <Line
              type="monotone"
              dataKey="positive"
              dot={true}
              strokeWidth={3}
              stroke="#83BF6E"
            />
            <Line
              type="monotone"
              dataKey="neutral"
              dot={true}
              strokeWidth={3}
              stroke="#2A85FF"
            />
            <Line
              type="monotone"
              dataKey="negative"
              dot={true}
              strokeWidth={3}
              stroke="#FF6A55"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SentimentAnalysis;
