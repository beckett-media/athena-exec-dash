import React from "react";
import { Progress, Stack, Text } from "@chakra-ui/react";
import { percentageCalc, numberWithCommas } from "../../../utils";
import cn from "classnames";
import Card from "../../../components/Card";
import styles from "./Chart.module.sass";

const Backlog = ({ className }) => {
  const graded = 427;
  const shipped = 1728;
  const backlog = 12039;

  console.log(percentageCalc(graded, backlog));

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
        <Progress value={percentageCalc(graded, backlog)} />
        <Text>
          Shipped {numberWithCommas(shipped)} (
          {percentageCalc(shipped, backlog)}%)
        </Text>
        <Progress value={percentageCalc(shipped, backlog)} />
        <Text>Total backlog {numberWithCommas(backlog)} (100%)</Text>
        <Progress value={100} />
      </Stack>
    </Card>
  );
};

export default Backlog;
