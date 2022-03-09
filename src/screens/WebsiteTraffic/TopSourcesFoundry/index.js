import React from "react";
import styles from "./TopSource.module.sass";
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
import Loading from "../../../components/LottieAnimation/Loading";
import { Box, Input, Text } from "@chakra-ui/react";
import Dropdown from "../../../components/Dropdown";

const TopSource = ({ className, ...props }) => {
  const darkMode = useDarkMode(false); // default to light mode
  const [sorting, setSorting] = React.useState("2022");
  const intervals = ["2022", "2021", "2019"];

  const riOntology =
    "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
  const typeObject = "ExecDashTopSourcesSorted";
  const year = `${sorting}`;
  const propertyID = "p.numberOfUsers";

  const url = `api/${riOntology}/${typeObject}/${year}/${propertyID}`;

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

  const liveData = data?.data; // data from the endpoint

  const topSources = liveData?.slice(0, 5);

  const name = [];
  const numberOfUsers = [];
  const graphData = [];

  topSources?.map((element) => {
    // Loop through top sources
    if (name?.indexOf(element?.properties?.websiteName) === -1) {
      // If website name is not in name array
      name?.push(element?.properties?.websiteName); // Push website name to name array
      // get the value of the website name
      numberOfUsers?.push(element?.properties?.numberOfUsers); // Push number of users to numberOfUsers array
    }
  });

  name?.forEach((element, index) => {
    // Loop through name array to get top 10 users
    graphData.push({
      // Push data to graphData array
      name: element, // Website name
      users: numberOfUsers[index], // Get value of website name
    });
  });

  if (!data) return <div>loading... 😎 </div>;

  return (
    <Card
      className={cn(styles.card, className)}
      title={`Top ${graphData.length} sources of website visitors`}
      description="The graph below highlights the top 5 sources of website traffic for Beckett's website."
      classTitle="title-purple"
      head={
        <>
          <Text mr={3}>Filter</Text>
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
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          {graphData.length === 0 ? (
            <Loading loadingG={"loadingG"} marginTop={0} width={"15rem"} />
          ) : (
            <BarChart
              width={500}
              height={400}
              data={graphData} // data entries
              barSize={24}
            >
              <CartesianGrid
                strokeDasharray="none"
                stroke={darkMode.value ? "#272B30" : "#EFEFEF"}
                horizontal={true}
              />
              <YAxis
                dataKey="users"
                type="number"
                // set domain to the greatest value in the dataset
                domain={[1000, Math.max(...numberOfUsers)]}
                axisLine={true}
                tickLine={true}
                tick={{ fontSize: 12, fontWeight: "500", fill: "#6F767E" }}
                tickFormatter={(value) => {
                  // if value is 1000000 or greater, return 1 million or < 1 K < 500
                  if (value >= 1000000) {
                    return `${(value / 1000000).toFixed(1)}M`;
                  } else if (value >= 500) {
                    return `${(value / 1000).toFixed(1)}K`;
                  } else {
                    return value;
                  }
                }}
              />
              <XAxis
                dataKey="name" // dataKey is the name of the data entry
                axisLine={true}
                tickLine={true}
                tick={{ fontSize: 12, fontWeight: "500", fill: "#6F767E" }}
                interval={0}
              />
              <Tooltip
                formatter={(value) => {
                  // format the tooltip
                  if (value > 1000000) {
                    return `${(value / 1000000).toFixed(1)}M`;
                  }
                  if (value > 1000) {
                    return `${(value / 1000).toFixed(1)}K`;
                  }
                }}
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

              <Bar
                dataKey="users" // dataKey is the name of the data entry
                // random color for each bar
                fill={"#36A2EB"}
                barSize={45}
                // stack
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TopSource;
