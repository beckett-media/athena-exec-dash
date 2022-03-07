import React from "react";
import styles from "./ReceivedChart.module.sass";
import Card from "../../../components/Card";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Mo",
    received: 20,
  },
  {
    name: "Tu",
    received: 60,
  },
  {
    name: "We",
    received: 45,
  },
  {
    name: "Th",
    received: 16,
  },
  {
    name: "Fr",
    received: 20,
  },
  {
    name: "Sa",
    received: 115,
  },
  {
    name: "Su",
    received: 25,
  },
];

const ReceivedChart = () => {
  return (
    <Card
      className={styles.card}
      title="Card Received Per Day"
      classTitle="title-darkblue"
    >
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={500}
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
            barSize={30}
            barGap={8}
          >
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fontWeight: "500", fill: "#6F767E" }}
              padding={{ left: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fontWeight: "500", fill: "#6F767E" }}
              padding={{ top: 10 }}
            />
            <Legend
              verticalAlign="top"
              align="center"
              iconType="circle"
              iconSize={10}
              iconPadding={10}
              itemWidth={10}
              itemHeight={10}
              wrapperStyle={{
                fontSize: "12px",
                fontWeight: "500",
                color: "#6F767E",
                paddingLeft: "10px",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#272B30",
                borderColor: "rgba(255, 255, 255, 0.12)",
                borderRadius: 8,
                boxShadow:
                  "0px 4px 8px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.1), inset 0px 0px 1px #000000",
              }}
              labelStyle={{ fontSize: 12, fontWeight: "500", color: "#fff" }}
              itemStyle={{
                padding: 0,
                textTransform: "capitalize",
                fontSize: 12,
                fontWeight: "600",
                color: "#fff",
              }}
              cursor={{ fill: "#f3f2f3" }}
            />
            <Bar dataKey="received" fill="#2A85FF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ReceivedChart;
