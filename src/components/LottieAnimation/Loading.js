import React from "react";
import Lottie from "lottie-react";
import dash from "./dash.json";
import loadingChart from "./loading.json";
import { Box, Center } from "@chakra-ui/react";

const Loading = ({ loadingG, comingsoon, width, marginTop }) => {
  if (loadingG === "loadingG") {
    return (
      <Center flex={1}>
        <Lottie
          style={{ width: "15rem", marginTop: 0 }}
          animationData={loadingChart}
          play={"loop"}
          loop
        />
      </Center>
    );
  } else if (comingsoon === "comingsoon") {
    return (
      <div>
        <Lottie
          style={{ width: width, marginTop: marginTop }}
          animationData={dash}
          play={"loop"}
          loop
        />
      </div>
    );
  }
};

export default Loading;
