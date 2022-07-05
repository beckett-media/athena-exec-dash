import React from "react";
import { Progress, Stack, Text } from "@chakra-ui/react";
import { percentageCalc, numberWithCommas } from "../../../utils";
import cn from "classnames";
import Card from "../../../components/Card";
import styles from "./Chart.module.sass";
import useTimeseries from "../../../hooks/data/useTimeseries";
import useDarkMode from "use-dark-mode";
import useGraderEntry from "../../../hooks/data/useGraderEntry";
import moment from "moment";

const Backlog = ({ className }) => {
  const backlog = 29000;
  const { timeseries } = useTimeseries();
  const data = useGraderEntry("asc");
  const darkMode = useDarkMode(false);

  let totalGraded = 0;
  for (const log of timeseries) {
    if (new Date(log.date).getTime() >= new Date("2022-05-12").getTime()) {
      totalGraded += log.cardsGradedToday;
    }
  }

  // ##########################################################################

  let WeeklyCardBacklog = 0;
  // Card Backlog from 5/17 [29,000 cards]
  let BaseBacklogOfMay2022 = 29151;
  //Cards Graded from 5/17 to Latest Data Entry Date
  let TotalCardReceiveFromMay2022ToLatestDataEntryDate = 0;
  //Cards Received from 5/17 to Latest Data Entry Date
  let TotalCardGradedFromMay2022ToLatestDataEntryDate = 0;

  for (const log of timeseries) {
    if (new Date(log.date).getTime() >= new Date().getTime()) {
      TotalCardReceiveFromMay2022ToLatestDataEntryDate += log.cardsReceived;
      TotalCardGradedFromMay2022ToLatestDataEntryDate += log.cardsGradedToday;
    }
  }



  //   "Cards Graded" = (Cards Graded from start of week date [Day used by Card Backlog])
  // This number is calculated daily, each time card grading data is entered
  // This value should increase throughout the week, then reset to 0 when the backlog value is reset

  // const curr = new Date(); // get current date
  const curr = new Date("2022-06-16");
  const first = curr?.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  const last = first + 6; // last day is the first day + 6

  const firstday = new Date(curr.setDate(first));
  const lastday = new Date(curr.setDate(last));

  let CardsGradedThisWeek = 0;
  // let CardsReceivedThisWeek = 0;

  for (const log of timeseries) {
    if (
      new Date(log.date).getTime() >= firstday.getTime() &&
      new Date(log.date).getTime() <= lastday.getTime()
    ) {
      CardsGradedThisWeek = log.cardsGradedToday + CardsGradedThisWeek;
      console.log(CardsGradedThisWeek);
      // CardsReceivedThisWeek += log.cardsReceived;
    }
  }

  //"Weekly Card Backlog" = (Card Backlog from 5/17 [29,000 cards]) + (Cards Received from 5/17 to Latest Data Entry Date) - (Cards Graded from 5/17 to Latest Data Entry Date)
  WeeklyCardBacklog =
    BaseBacklogOfMay2022 +
    TotalCardReceiveFromMay2022ToLatestDataEntryDate -
    TotalCardGradedFromMay2022ToLatestDataEntryDate;

  const TotalBacklog = CardsGradedThisWeek / WeeklyCardBacklog;

  // console.log(TotalBacklog);

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
