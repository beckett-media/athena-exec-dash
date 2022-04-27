import React from "react";
import cn from "classnames";
import styles from "./Overview.module.sass";
import TooltipGlodal from "../../../components/TooltipGlodal";
import Card from "../../../components/Card";
import { Grading_Terms } from "../../../mocks/carddata/grading_terms";
import { numberWithCommas } from "../../../utils";
import { Heading, Text } from "@chakra-ui/react";
import { API } from "aws-amplify";
import getArraySum from "get-array-sum";

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
      const myInit = {};

      const cardsReceived = [];

      const cardsGradedToday = [];

      const cardsShippedToday = [];

      API.get(apiName, path, myInit)
        .then((response) => {
          // Add your code here
          const formdata = response.data.data.data;

          // write a function to get submissionItem from {"data":{"nextPageToken":null,"data":[{"properties":{"submissionItem":"ax1","date":"2011-04-26","cardsReceived":56,"cardsGradedToday":28,"type":"sport_cards","cardsShippedToday":28},"rid":"ri.phonograph2-objects.main.object.0c1797d8-bee4-4553-b8a0-c1ef41d94df0"},{"properties":{"submissionItem":"jk"},"rid":"ri.phonograph2-objects.main.object.90de5c14-9ad3-466d-88ae-09bc4b0cfe1e"},{"properties":{"submissionItem":"jbk","cardsReceived":300,"cardsGradedToday":100,"type":"BGS","cardsShippedToday":25},"rid":"ri.phonograph2-objects.main.object.80bf278a-f160-4ac0-926d-b6acf7dfad77"},{"properties":{"submissionItem":"axf1","date":"2011-04-26","cardsReceived":300,"cardsGradedToday":100,"type":"BGS","cardsShippedToday":25},"rid":"ri.phonograph2-objects.main.object.89b1733c-5df9-46d1-a4aa-89993b322bf9"},{"properties":{"submissionItem":"{BGS RECEIVED-256","date":"2011-04-26","cardsReceived":96,"cardsGradedToday":85,"type":"BGS RECEIVED","cardsShippedToday":65},"rid":"ri.phonograph2-objects.main.object.62f9d510-314c-4c12-86ba-6c98f5e0652f"},{"properties":{"submissionItem":"category-45","date":"2011-04-26","cardsReceived":1,"cardsGradedToday":52,"type":"BGS RECEIVED","cardsShippedToday":35},"rid":"ri.phonograph2-objects.main.object.bcebb64a-89f0-43c4-ba93-b733a93eaf26"},{"properties":{"submissionItem":"21H","date":"2011-04-26","cardsReceived":5555,"cardsGradedToday":555,"type":"BGS RECEIVED","cardsShippedToday":5555},"rid":"ri.phonograph2-objects.main.object.38969616-0a9d-482f-9502-b928b618007c"},{"properties":{"submissionItem":"478E^","date":"2011-04-26","cardsReceived":100,"cardsGradedToday":100,"type":"BGS RECEIVED","cardsShippedToday":100},"rid":"ri.phonograph2-objects.main.object.9f188ba5-c9c8-480d-848b-a7cabe61f00a"},{"properties":{"submissionItem":"119D)","date":"2011-04-26","cardsReceived":0,"cardsGradedToday":0,"type":"BGS RECEIVED","cardsShippedToday":0},"rid":"ri.phonograph2-objects.main.object.d97f3c6a-ecd1-4209-b617-1631e3bd7565"},{"properties":{"submissionItem":"977D!","date":"2011-04-26","cardsReceived":0,"cardsGradedToday":0,"type":"BGS RECEIVED","cardsShippedToday":0},"rid":"ri.phonograph2-objects.main.object.b6bd95f9-bb5c-4163-ab2b-09c70aa6c397"}]},"status":200}

          formdata.forEach((item) => {
            cardsReceived.push(item.properties.cardsReceived);
            cardsGradedToday.push(item.properties.cardsGradedToday);
            cardsShippedToday.push(item.properties.cardsShippedToday);
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
    })();

    setReactData(false);
  }, [reactData]);

  const items = [
    {
      title: "Cards received today (BGS)",
      counter: `${numberWithCommas(received)}`,
      value: 2,
      background: "#DCF341",
    },
    {
      title: "Cards graded today (BGS)",
      counter: `${numberWithCommas(graded)}`,
      background: "#B5E4CA",
    },
    {
      title: "Cards shipped today (BGS)",
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
