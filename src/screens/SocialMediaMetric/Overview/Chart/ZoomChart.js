import React from "react";
import { API } from "aws-amplify";
import Loading from "../../../../components/LottieAnimation/Loading";
import ChartLine from "./PlotlyChart";

const ZoomChart = () => {
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

  if (isLoading) {
    return <Loading />;
  }

  return <ChartLine data={datas} />;
};

export default ZoomChart;
