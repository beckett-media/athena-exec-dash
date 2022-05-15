import React from "react";
import { Progress, Stack, Text } from "@chakra-ui/react";
import { percentageCalc, numberWithCommas } from "../../../utils";
import cn from "classnames";
import Card from "../../../components/Card";
import styles from "./Chart.module.sass";
import { API } from "aws-amplify";

const Backlog = ({ className }) => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(0);

  const graded = data?.totalGraded || 0;
  const shipped = data?.totalShipped || 0;
  const backlog = 28000;

  React.useEffect(() => {
    setLoading(true);
    (async () => {
      const apiName = "palentirApi";
      const path = `/timeserie`;

      API.get(apiName, path)
        .then((response) => {
          const formdata = response?.data?.stats;
          setData(formdata);
        })
        .catch((error) => {
          console.log(error.response);
        });
    })();
    setLoading(false);
  }, []);

  // console.log(percentageCalc(graded, backlog));

  return (
    <Card
      title={"Backlog progress indicator"}
      className={cn(styles.card, className)}
      classTitle={cn("title-darkblue", styles.cardTitle)}
    >
      <Stack>
        <Text>
          Graded {numberWithCommas(graded)} ({percentageCalc(graded, backlog)}%)
        </Text>
        <Progress
          colorScheme={"purple"}
          value={percentageCalc(graded, backlog)}
        />
        <Text>
          Shipped {numberWithCommas(shipped)} (
          {percentageCalc(shipped, backlog)}%)
        </Text>
        <Progress colorScheme={"blue"} value={percentageCalc(shipped, backlog)} />
        <Text>Total backlog {numberWithCommas(backlog)} (100%)</Text>
        <Progress colorScheme={"orange"} value={100} />
      </Stack>
    </Card>
  );
};

export default Backlog;
