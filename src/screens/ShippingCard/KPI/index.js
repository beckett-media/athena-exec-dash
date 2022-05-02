import React from "react";
import cn from "classnames";
import styles from "./Overview.module.sass";
import TooltipGlodal from "../../../components/TooltipGlodal";
import Card from "../../../components/Card";
import { Grading_Terms } from "../../../mocks/carddata/grading_terms";
import { numberWithCommas } from "../../../utils";
import { Heading, Text } from "@chakra-ui/react";
import { API } from "aws-amplify";
import moment from "moment";

const KPI = ({ className }) => {
  const [reactData, setReactData] = React.useState(true);
  const [received, setReceived] = React.useState([0]);
  const [shipped, setShipped] = React.useState([0]);
  const [graded, setGraded] = React.useState([0]);
  const [yesterdayDate, setYesterdayDate] = React.useState("");
  const [dataDate, setDataDate] = React.useState(
    moment().subtract(1, "days").format("YYYY-MM-DD")
  );

  const today = moment().format("dddd");

  React.useEffect(() => {
    setReactData(true);
    if (today === "Monday") {
      const currentDate = moment().subtract(3, "days").format("YYYY-MM-DD");
      setYesterdayDate(currentDate);
    }

    (async () => {
      const apiName = "palentirApi";
      const path = `/athenaform/${yesterdayDate}`;
      API.get(apiName, path)
        .then((response) => {
          const formdata = response.data.data;
          const data = formdata.map((item) => item.properties);
          setReceived(data[0].cardsReceived);
          setShipped(data[0].cardsShippedToday);
          setGraded(data[0].cardsGradedToday);
          setDataDate(data[0].date);
        })
        .catch((error) => {
          console.log(error.response);
        });
    })();

    setReactData(false);
  }, [today, yesterdayDate]);

  console.log(dataDate);

  const items = [
    {
      title: "Received (BGS)",
      name: "Received",
      counter: `${
        numberWithCommas(received) <= 0
          ? "not yet added"
          : numberWithCommas(received)
      }`,
      value: yesterdayDate,
      background: "#DCF341",
    },
    {
      title: "Graded (BGS)",
      name: "Graded",
      counter: `${
        numberWithCommas(graded) <= 0
          ? "not yet added"
          : numberWithCommas(graded)
      }`,
      background: "#B5E4CA",
    },
    {
      title: "Shipped (BGS)",
      name: "Shipped",
      counter: `${
        numberWithCommas(shipped) <= 0
          ? "not yet added"
          : numberWithCommas(shipped)
      }`,
      background: "#2A85FF",
    },
  ];
  return (
    <>
      <Card
        className={cn(styles.card, className)}
        title="Daily Inbound / Received KPI"
        // description={`Graded Grand Total`}
        classTitle="title-green"
      >
        <div className={styles.overview}>
          <div className={styles.list}>
            {items.map((x, index) => (
              <div
                className={styles.item}
                key={index}
                style={{ backgroundColor: x.background }}
              >
                <div className={styles.line}>
                  <div className={styles.details}>
                    <Text fontSize="2xl">{x?.title}</Text>
                    {received > 0 && (
                      <Heading as="h3" size="xl">
                        {x?.counter}
                      </Heading>
                    )}

                    <div className={styles.indicator}>
                      <div className={styles.balance} value={x?.value} />
                      {received > 0 && (
                        <span>
                          {x?.name} on {moment(yesterdayDate).format("dddd,")}{" "}
                          {moment(yesterdayDate).format("MMM Do")}
                        </span>
                      )}
                      {received <= 0 && <span>not yet added</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <TooltipGlodal />
    </>
  );
};

export default KPI;
