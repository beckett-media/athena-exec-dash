import React, { useState } from "react";
import styles from "./TopCountry.module.sass";
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
import countries from "../../../mocks/country.json";

const TopCountry = ({ className }) => {
  const darkMode = useDarkMode(false);

  const social = countries;

  const data = social.map((item) => {
    const { country } = item;
    const data = Object.keys(country).map((key) => {
      return {
        name: key,
        mentions: country[key].mentions,
      };
    });
    return data;
  });

  const data2 = data[0];

  return (
    <Card
      className={cn(styles.card, className)}
      title="Geographic Breakdown"
      classTitle="title-purple"
    >
      <div className={styles.chart} style={{ height: "25rem" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data2}
            layout="vertical"
            margin={{
              top: 0,
              right: 0,
              left: 5,
              bottom: 0,
            }}
            barSize={24}
            barGap={8}
          >
            <CartesianGrid
              strokeDasharray="none"
              stroke={darkMode.value ? "#272B30" : "#EFEFEF"}
              horizontal={false}
            />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fontWeight: "500", fill: "#6F767E" }}
            />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fontWeight: "500", fill: "#6F767E" }}
              //show all names of countries
              interval={0}
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
            <Bar dataKey="mentions" fill="#B5E4CA" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TopCountry;
