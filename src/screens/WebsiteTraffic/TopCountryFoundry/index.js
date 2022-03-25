import React from "react";
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
import Dropdown from "../../../components/Dropdown";

const TopCountry = ({ className, data }) => {
  const darkMode = useDarkMode(false);

  const [sorting, setSorting] = React.useState("2022");
  const intervals = ["2022", "2021", "2020", "2019"];
  const dataSorted = data.filter((d) => d?.dates === sorting);

  const dates = [];
  const contries = [];
  const numberOfUsers = [];
  const graphData = [];

  const topCountries = dataSorted?.slice(0, 10);

  topCountries?.forEach((element) => {
    // Loop through top countries
    if (contries?.indexOf(element?.countries) === -1) {
      // If country is not in contries array
      contries?.push(element?.countries); // Push country to contries array

      // get the value of the country
      numberOfUsers?.push(element?.numberOfUsers); // Push number of users to numberOfUsers array
      // get dates
      dates?.push(element?.dates); // Push dates to date array
    }
  });

  contries?.forEach((element, index) => {
    // Loop through contries  array to get top 5 users

    graphData.push({
      // Push data to graphData array
      name: element, // Country name
      users: numberOfUsers[index], // Get value of country
    });
  });

  graphData.forEach((element) => {
    // Loop through graphData array
    if (element.name === "United_States") {
      // If country is United States
      element.name = "USA"; // Change country name to USA
    }
    if (element.name === "United_Kingdom") {
      // If country is United States
      element.name = "UK."; // Change country name to USA
    }
    if (element.name === "Hong_Kong") {
      // If country is United States
      element.name = "Hong K."; // Change country name to USA
    }
  });

  return (
    <Card
      className={cn(styles.card, className)}
      title={`Top ${graphData.length} countries`}
      description="This section shows where Beckett's website visitors are locate."
      classTitle="title-purple"
      head={
        <>
          <Dropdown
            className={styles.dropdown}
            classDropdownHead={styles.dropdownHead}
            value={sorting}
            setValue={setSorting}
            options={intervals}
            small
          />
        </>
      }
    >
      <div className={styles.chart} style={{ height: "19rem" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart // Chart
            width={500}
            height={300}
            data={graphData} // Data to be displayed in chart
            layout="vertical"
            margin={{
              top: 0,
              right: 0,
              left: 16,
              bottom: 0,
            }}
            barSize={24}
            barGap={8}
          >
            <CartesianGrid // Grid lines
              strokeDasharray="none"
              stroke={darkMode.value ? "#272B30" : "#EFEFEF"}
              horizontal={false}
            />
            <XAxis // X Axis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fontWeight: "500", fill: "#6F767E" }}
              padding={{ left: 10 }}
              domain={[500, Math.max(...numberOfUsers)]}
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
            <YAxis // Y Axis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fontWeight: "500", fill: "#6F767E" }}
              interval={0}
            />
            <Tooltip // Tooltip
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
              // tooltip formatter number with commas
              formatter={(value, name, props) => {
                if (value >= 1000000) {
                  return `${(value / 1000000).toFixed(1)}M`;
                } else if (value >= 1000) {
                  return `${(value / 1000).toFixed(1)}K`;
                } else {
                  return value;
                }
              }}
            />
            <Bar dataKey="users" fill="#B5E4CA" />
            {/* Fill color for the graph */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TopCountry;
