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

  React.useEffect(() => {
    setReactData(true);
    (async () => {
      const apiName = "palentirApi";
      const path = `/athenaform`;

      API.get(apiName, path)
        .then((response) => {
          const formdata = response.data.data;
          const data = formdata.map((item) => item.properties);
          setReceived(data[0].cardsReceived);
          setShipped(data[0].cardsShippedToday);
          setGraded(data[0].cardsGradedToday);
        })
        .catch((error) => {
          console.log(error.response);
        });
    })();

    setReactData(false);
  }, []);

  const items = [
    {
      title: "Received yesterday (BGS)",
      counter: `${numberWithCommas(received)}`,
      background: "#DCF341",
    },
    {
      title: "Graded yesterday (BGS)",
      counter: `${numberWithCommas(graded)}`,
      background: "#B5E4CA",
    },
    {
      title: "Shipped yesterday (BGS)",
      counter: `${numberWithCommas(shipped)}`,
      background: "#2A85FF",
    },
  ];
  return (
    <>
      <Card
        className={cn(styles.card, className)}
        title="Weekly Inbound/Received"
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
                    <Text fontSize="2xl">{x.title}</Text>
                    <Heading as="h3" size="xl">
                      {x.counter}
                    </Heading>
                    {/* {x.value !== 0 && (
                      <div className={styles.indicator}>
                        <Balance className={styles.balance} value={x.value} />
                        <span>change</span>
                      </div>
                    )} */}
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
