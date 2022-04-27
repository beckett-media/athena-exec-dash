import React from "react";
import cn from "classnames";
import styles from "./Chart.module.sass";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useDarkMode from "use-dark-mode";

const data = [];

const Chart = () => {
  const darkMode = useDarkMode(false);

  return (
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
            stroke="#2A85FF"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
