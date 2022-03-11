import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";

import styles from "./Chart.module.sass";
import useDarkMode from "use-dark-mode";
import { API } from "aws-amplify";

const ZoomChart = () => {
  const darkMode = useDarkMode(false);
  const [sentimentData, setData] = React.useState([]);

  function getData() {
    const apiName = "palentirApi";
    const path = "/socialmedia/socialdata";

    return API.get(apiName, path);
  }

  React.useEffect(() => {
    (async function () {
      const response = await getData();
      setData(response);
    })();
  }, []);

  const positive = [];
  const neutral = [];
  const negative = [];
  const numPosts = [];
  const date = [];
  const sentiment_analysis = [];
  const social2 = sentimentData.data;

  // make social2 into an array of objects like social
  for (let key in social2) {
    positive.push(social2[key].positive);
    neutral.push(social2[key].neutral);
    negative.push(social2[key].negative);
    numPosts.push(social2[key].numposts);
    date.push(social2[key].date);
  }

  // change to {'03/04/2022': positive: 0, neutral: 25, negative: 0, numposts: 0}
  for (let i = 0; i < date.length; i++) {
    sentiment_analysis.push({
      dayofweek: date[i],
      numPost: numPosts[i],
    });
  }

  return (
    <div className={styles.chart}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={sentiment_analysis}
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
            tickFormatter={(value) => moment(`${value}`).format("MMM Do")}
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
            r={5}
            strokeWidth={4}
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          {/* <Brush
            dataKey="dayofweek"
            height={30}
            stroke="#2A85FF"
            fill="#82ca9d"
            startIndex={1}
            endIndex={sentiment_analysis.length - 2}
            tickFormatter={(value) => {
              return moment(value, "MM/DD/YYYY").format("MMM DD");
            }}
          /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ZoomChart;
