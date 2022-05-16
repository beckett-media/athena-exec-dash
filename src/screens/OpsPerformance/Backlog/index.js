import React from "react";
import { Progress, Stack, Text } from "@chakra-ui/react";
import { percentageCalc, numberWithCommas } from "../../../utils";
import cn from "classnames";
import Card from "../../../components/Card";
import styles from "./Chart.module.sass";

import { useApiData } from "../../../providers/apiData";

const Backlog = ({ className }) => {
  const backlog = 29000;
  const { timeseries } = useApiData();

  let totalBacklog = backlog;
  for (const log of timeseries) {
    if (new Date(log.date).getTime() >= new Date("2022-05-08").getTime()) {
      totalBacklog += (log.cardsReceived - log.cardsGradedToday);
    }
  }

  console.log('timeseries', timeseries, totalBacklog);

  return (
    <Card
      title={"Backlog progress indicator"}
      className={cn(styles.card, className)}
      classTitle={cn("title-darkblue", styles.cardTitle)}
    >
      <Stack>
        {/* <Text>
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
        <Progress colorScheme={"orange"} value={100} /> */}

        <Text>
          Total backlog  {numberWithCommas(totalBacklog)} (
          {percentageCalc(totalBacklog, backlog)}%)
        </Text>
        <Progress colorScheme={"blue"} value={percentageCalc(totalBacklog, backlog)} />
      </Stack>
    </Card>
  );
};

export default Backlog;
