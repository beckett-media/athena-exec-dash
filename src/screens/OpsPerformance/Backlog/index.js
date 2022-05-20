import React from "react";
import { Progress, Stack, Text } from "@chakra-ui/react";
import { percentageCalc, numberWithCommas } from "../../../utils";
import cn from "classnames";
import Card from "../../../components/Card";
import styles from "./Chart.module.sass";
import useDarkMode from "use-dark-mode";

import { useApiData } from "../../../providers/apiData";

const Backlog = ({ className }) => {
  const backlog = 29000;
  const { timeseries } = useApiData();
  const darkMode = useDarkMode(false);

  let totalGraded = 0;
  for (const log of timeseries) {
    if (new Date(log.date).getTime() >= new Date("2022-05-12").getTime()) {
      totalGraded += log.cardsGradedToday;
    }
  }

  return (
    <Card
      title={"Backlog Progress Since 5/12"}
      className={cn(styles.card, className)}
      classTitle={cn("title-darkblue", styles.cardTitle)}
    >
      <Stack>
        <Text>
          Total Cards Graded Since 5/12: {numberWithCommas(totalGraded)} (
          {percentageCalc(totalGraded, backlog)}%) vs Backlog 29,000
        </Text>
        <Progress
          borderRadius={10}
          colorScheme={"green"}
          value={percentageCalc(totalGraded, backlog)}
          bg={"gray.300"}
          h="10"
        />
      </Stack>
    </Card>
  );
};

export default Backlog;
