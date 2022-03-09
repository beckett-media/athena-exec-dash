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

const TopCountry = ({ className, ...props }) => {
  const darkMode = useDarkMode(false);

  const [sorting, setSorting] = React.useState("2022");
  const intervals = ["2022", "2021", "2019"];

  const riOntology =
    "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
  const typeObject = "ExecDashTopCountriesSorted";
  const year = `${sorting}`;
  const propertyID = "p.numberOfUsers";

  const url = `api/${riOntology}/${typeObject}/${year}/${propertyID}`; // URL to fetch data from
  const [data, setData] = React.useState([]);

  function getData() {
    const apiName = "palentirApi";
    const path = `/${url}`;

    return API.get(apiName, path);
  }

  React.useEffect(() => {
    (async function () {
      const response = await getData();
      setData(response);
    })();
  }, [sorting]);

  const liveData = data?.data;
  const dates = [];
  const contries = [];
  const numberOfUsers = [];
  const graphData = [];

  const topCountries = liveData?.slice(0, 10);

  topCountries?.forEach((element) => {
    // Loop through top countries
    if (contries?.indexOf(element?.properties?.countries) === -1) {
      // If country is not in contries array
      contries?.push(element?.properties?.countries); // Push country to contries array

      // get the value of the country
      numberOfUsers?.push(element?.properties?.numberOfUsers); // Push number of users to numberOfUsers array
      // get dates
      dates?.push(element?.properties?.dates); // Push dates to date array
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
      element.name = "UK"; // Change country name to USA
    }
    if (element.name === "Hong_Kong") {
      // If country is United States
      element.name = "HK"; // Change country name to USA
    }
  });

  // if (error) return <div>failed to load 🥺 </div>; // If error
  if (!data) return <div>loading... 😎 </div>; // If data is null

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
              left: 5,
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
