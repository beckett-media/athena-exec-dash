import React from "react";

import Loading from "../../../../components/LottieAnimation/Loading";
import ChartLine from "./PlotlyChart";

const ZoomChart = ({ socialData }) => {
  if (!socialData) {
    return <Loading />;
  }

  return <ChartLine data={socialData} />;
};

export default ZoomChart;
