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

import { API } from "aws-amplify";

const TopCountry = ({ className }) => {
  const darkMode = useDarkMode(false);

  const [TopCountries, setData] = React.useState([]);

  function getData() {
    const apiName = "palentirApi";
    const path = "/socialmedia/topcountry";

    return API.get(apiName, path);
  }

  React.useEffect(() => {
    (async function () {
      const response = await getData();
      setData(response);
    })();
  }, []);

  const countryData = TopCountries.data;


  const countryName = [];
  const mentions = [];
  const dataObject = [];

  countryData?.map((element) => {
    // Loop through top sources
    if (countryName?.indexOf(element?.country) === -1) {
      // change United States to USA and United Kingdom to UK
      if (element?.country === "United States of America") {
        countryName.push("USA");
      } else if (element?.country === "United Kingdom") {
        countryName.push("UK");
      } else {
        countryName.push(element?.country);
      }
      // If website name is not in name array
      mentions.push(element?.mentions);
    }
  });

  countryName.map((element, index) => {
    dataObject.push({
      name: element,
      mentions: mentions[index],
    });
  });

  const data = dataObject;

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
            data={data}
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
