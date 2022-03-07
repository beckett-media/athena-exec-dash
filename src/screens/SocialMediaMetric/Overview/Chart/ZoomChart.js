import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import Twitter from "../../../../mocks/test.json";
import styles from "./Chart.module.sass";
import cn from "classnames";
import useDarkMode from "use-dark-mode";

const ZoomChart = () => {
  const darkMode = useDarkMode(false);

  const social = Twitter;

  const data = social.map((item) => {
    const { twitter } = item;
    // add key to data object and number of posts to value object
    const data = Object.keys(twitter).map((key) => {
      return {
        dayofweek: key,
        numPost: twitter[key].numPosts,
      };
    });
    return data;
  });

  const data2 = data[0];

  return (
    <div className={styles.chart}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data2}
          syncId="anyId"
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid
            strokeDasharray="none"
            stroke={darkMode.value ? "#272B30" : "#EFEFEF"}
            vertical={true}
          />
          <XAxis
            dataKey="dayofweek"
            axisLine={false}
            tickLine={true}
            tick={{ fontSize: 12, fontWeight: "500", fill: "#9A9FA5" }}
            padding={{ left: 10 }}
          />
          <YAxis
            axisLine={false}
            tickLine={true}
            tick={{ fontSize: 12, fontWeight: "500", fill: "#9A9FA5" }}
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
              color: "#fff",
            }}
          />
          <Line
            type="monotone"
            dataKey="numPost"
            dot={true}
            strokeWidth={4}
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Brush
            dataKey="dayofweek"
            height={30}
            stroke="#2A85FF"
            fill="#82ca9d"
            startIndex={0}
            endIndex={data2.length - 1}
            tickFormatter={(value) => value}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ZoomChart;
