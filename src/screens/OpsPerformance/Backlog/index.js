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

  let totalGraded = 0;
  for (const log of timeseries) {
    if (new Date(log.date).getTime() >= new Date("2022-05-12").getTime()) {
      totalGraded += log.cardsGradedToday;
    }
  }

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
          Total card graded {numberWithCommas(totalGraded)} (
          {percentageCalc(totalGraded, backlog)}%) vs Backlog 29,000 (100%)
        </Text>
        <Progress  borderRadius={10} colorScheme={"green"} value={percentageCalc(totalGraded, backlog)} bg={"red.300"} h="10" />
      </Stack>
    </Card>
  );
};

export default Backlog;
