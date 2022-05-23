import React from "react";
import cn from "classnames";
import styles from "./KPI.module.sass";
import TooltipGlodal from "../../../components/TooltipGlodal";
import Card from "../../../components/Card";
import { numberWithCommas } from "../../../utils";
import { Heading, Text } from "@chakra-ui/react";
import { API } from "aws-amplify";
import moment from "moment";

const KPI = ({ className }) => {
  const [loading, setLoading] = React.useState(true);
  const [received, setReceived] = React.useState("0");
  const [shipped, setShipped] = React.useState("0");
  const [graded, setGraded] = React.useState("0");
  const [verified, setVerified] = React.useState("0");

  const [yesterdayDate, setYesterdayDate] = React.useState(
    moment().subtract(1, "days").format("YYYY-MM-DD")
  );

  const today = moment().format("dddd");

  React.useEffect(() => {
    setLoading(true);
    (async () => {
      if (today === "Monday") {
        const currentDate = moment().subtract(3, "days").format("YYYY-MM-DD");
        setYesterdayDate(currentDate);
      } else if (today === "Sunday") {
        const currentDate = moment().subtract(2, "days").format("YYYY-MM-DD");
        setYesterdayDate(currentDate);
      } else {
        const currentDate = moment().subtract(1, "days").format("YYYY-MM-DD");
        setYesterdayDate(currentDate);
      }
      const apiName = "palentirApi";
      const path = `/grading-service-form/${yesterdayDate}`;
      const servicePath = `/servicelevel/${yesterdayDate}`;
      API.get(apiName, path)
        .then((response) => {
          const formdata = response.data.data;
          const data = formdata.map((item) => item.properties);
          setReceived(data[0].cardsReceived);
          setShipped(data[0].cardsShippedToday);
          setGraded(data[0].cardsGradedToday);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.response);
        });
        API.get(apiName, servicePath)
        .then((response) => {
          const formdata = response.data.data;
          const data = formdata.map((item) => item.properties);
          setVerified(data[0].verified);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.response);
        });
    })();
  }, [yesterdayDate, today]);

  const items = [
    {
      title: "Received (BGS)",
      counter: `${
        numberWithCommas(received) === "0"
          ? "Data Not Received Recently"
          : numberWithCommas(received)
      }`,
      background: "#DCF341",
    },
    {
      title: "Verified (BGS)",
      counter: `${
        numberWithCommas(verified) === "0"
          ? "Data Not Received Recently"
          : numberWithCommas(verified)
      }`,
      background: "#8E59FF",
    },
    {
      title: "Graded (BGS)",
      counter: `${
        numberWithCommas(graded) === "0"
          ? "Data Not Received Recently"
          : numberWithCommas(graded)
      }`,
      background: "#B5E4CA",
    },
    {
      title: "Shipped (BGS)",
      counter: `${
        numberWithCommas(shipped) === "0"
          ? "Data Not Received Recently"
          : numberWithCommas(shipped)
      }`,
      background: "#2A85FF",
    },
  ];
  return (
    <>
      <Card
        className={cn(styles.card, className)}
        title={`Cards Received, Graded, & Shipped on ${moment(
          yesterdayDate
        ).format("dddd, MMMM Do")} `}
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
                    <div className={styles.indicator}>
                      <div className={styles.balance} value={x?.value} />
                    </div>
                    <Text fontSize="2xl">{x?.title}</Text>
                    <Text fontSize={25} fontWeight={"bold"}>
                      {x?.counter}
                    </Text>
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
