import React from "react";

import moment from "moment";
import cn from "classnames";
import styles from "./Chart.module.sass";
import useDarkMode from "use-dark-mode";
import { API } from "aws-amplify";
import Loading from "../../../../components/LottieAnimation/Loading";
import ChartLine from "./PlotlyChart";
import Card from "../../../../components/Card";
import { Text } from "@chakra-ui/react";
import Dropdown from "../../../../components/Dropdown";

const ZoomChart = ({ className }) => {
  const darkMode = useDarkMode(false);

  const [datas, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  function getData() {
    const apiName = "palentirApi";
    const path = "/socialmedia/socialdata";

    return API.get(apiName, path);
  }

  React.useEffect(() => {
    setIsLoading(true);

    getData().then((res) => {
      setData(res?.data);
    });
    setIsLoading(false);
  }, [isLoading]);



  // if (sentimentData.data === undefined) {
  //   return <Loading />;
  // }


  return <ChartLine data={datas} />;
};

export default ZoomChart;
