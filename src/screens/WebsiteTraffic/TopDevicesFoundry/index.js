import React from "react";
import { API } from "aws-amplify";

import styles from "./TopDevice.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";

import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { numberWithCommas } from "../../../utils";
import Loading from "../../../components/LottieAnimation/Loading";
import Dropdown from "../../../components/Dropdown";

const TopDevices = ({ data }) => {
  return (
    <div style={{ width: "100%", height: "95%" }}>
      <Displaydevices dataD={data} />
    </div>
  );
};

function Displaydevices({ className, dataD }) {
  const [sorting, setSortings] = React.useState("2022");
  const intervals = ["2022", "2021", "2020", "2019"];
  const liveData = dataD.filter((d) => d?.dates === sorting);

  const colors = ["#8E59FF", "#83BF6E", "#2A85FF"]; // colors for the graph
  const LegendData = [];
  const Colors = [];
  const PieChartData = [];

  liveData?.forEach((element, index) => {
    // Loop through top devices
    if (LegendData?.indexOf(element?.devicesType) === -1) {
      // If device is not in LegendData array
      LegendData?.push(element?.devicesType); // Push device to LegendData array
      Colors?.push(colors[index]); // Push color to Colors array

      PieChartData?.push({
        // Push data to PieChartData array
        name: element?.devicesType, // Device name
        value: element?.numberOfUsers, // Get value of device
      });
    }
  });

  const data = [
    {
      name: "Mobile",
      value: parseInt(PieChartData[0]?.value),
      color: Colors[0],
    },
    {
      name: "Desktop",
      value: parseInt(PieChartData[1]?.value),
      color: Colors[1],
    },
    {
      name: "Tablet",
      value: parseInt(PieChartData[2]?.value),
      color: Colors[2],
    },
  ];

  // total users
  const totalUsers = data.reduce((acc, curr) => {
    return acc + curr.value;
  }, 0);

  const dataForPieChart = LegendData?.map((name, index) => ({
    name,
    // value in K and M
    value: ((PieChartData[index]?.value / totalUsers) * 100).toFixed(2),
    color: Colors[index],
  }));

  // if (loading) {
  //   return <p>loading...</p>;
  // }

  return (
    <>
      <Card
        className={cn(styles.card, className)}
        title="Top devices"
        classTitle="title-blue"
        description={`This shows the devices used by Beckett's visitors`}
        head={
          <>
            <Dropdown
              className={styles.dropdown}
              classDropdownHead={styles.dropdownHead}
              value={sorting}
              setValue={setSortings}
              options={intervals}
              small
            />
          </>
        }
      >
        <div className={styles.chart}>
          <ResponsiveContainer width="100%" height="100%">
            {data === 0 ? (
              <Loading loadingG={"loadingG"} marginTop={0} width={"1rem"} />
            ) : (
              <PieChart width={400} height={400}>
                <Tooltip
                  formatter={(value) => [`${numberWithCommas(value)} devices`]}
                  contentStyle={{
                    backgroundColor: "#272B30",
                    borderColor: "rgba(255, 255, 255, 0.12)",
                    borderRadius: 8,
                    boxShadow:
                      "0px 4px 8px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.1), inset 0px 0px 1px #000000",
                  }}
                  labelStyle={{
                    fontSize: 12,
                    fontWeight: "500",
                    color: "#fff",
                  }}
                  itemStyle={{
                    padding: 0,
                    textTransform: "capitalize",
                    fontSize: 12,
                    fontWeight: "600",
                    color: "#fff",
                  }}
                />
                <Pie
                  data={data} // data property is the data array from PieChartData array
                  cx={140}
                  cy={110}
                  innerRadius={88}
                  outerRadius={110}
                  fill="#8884d8"
                  paddingAngle={1}
                  dataKey="value"

                  // format with k and m
                >
                  {PieChartData.map(
                    (
                      entry,
                      index // map data array to PieChart component with name and value properties and fill property is the color of the element in Colors array
                    ) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                        //formater for the value
                      />
                    )
                  )}
                </Pie>
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
        <div className={styles.legend}>
          {dataForPieChart.map(
            (
              x,
              index // map dataForPieChart array to legend array with name and value properties and index property
            ) => (
              <div className={styles.indicator} key={index}>
                <div className={styles.title}>{x?.name}</div>
                <div style={{ color: x.color }}>{x.value}</div>
              </div>
            )
          )}
        </div>
      </Card>
    </>
  );
}

export default TopDevices;
