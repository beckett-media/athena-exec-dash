import React, { useState, useRef } from "react";
import styles from "./SentimentAnalysis.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useDarkMode from "use-dark-mode";
import { API } from "aws-amplify";
import moment from "moment";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Box,
  Stack,
  Text,
} from "@chakra-ui/react";
import SocialMessagesType from "../SocialMessageType";

import Dropdown from "../../../components/Dropdown";
import Loading from "../../../components/LottieAnimation/Loading";
import ChartLine from "./PlotlyChart";

const SentimentAnalysis = ({ className }) => {
  const darkMode = useDarkMode(false);
  const [data, setData] = React.useState([]);
  const [sentimentType, setSentimentType] = useState("");
  const [sentimeTotal, setSentimeTotal] = useState(0);
  const [color, setColor] = useState("");
  const [emoji, setEmoji] = useState("");
  const [descBg, setDescBg] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [functionTrigger, setOpen] = useState(false);

  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);
  const isOpen = functionTrigger;

  //api query
  function getData() {
    const apiName = "palentirApi";
    const path = "/socialmedia/socialdata";

    return API.get(apiName, path);
  }

  React.useEffect(() => {
    setIsLoading(true);

    getData().then((res) => {
      setData(res?.data);
    });
    setIsLoading(false);
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {functionTrigger && (
        <>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            size={"md"}
          >
            <DrawerOverlay />
            <DrawerContent
              style={{
                backgroundColor: darkMode.value ? "#1A1D1F" : "#e5eaf0",
              }}
            >
              <Card
                style={{ overflow: "hidden" }}
                title={
                  sentimentType?.charAt(0).toUpperCase() +
                  sentimentType?.slice(1) +
                  " Sentiment" +
                  " " +
                  emoji
                }
                classTitle={cn(color, styles.cardTitle)}
              >
                <DrawerCloseButton m={6} w={100}>
                  <Button
                    flex={1}
                    variant="outline"
                    onClick={onClose}
                    _hover={{
                      backgroundColor: descBg,
                      color: "#1A1D1F",
                    }}
                  >
                    close
                  </Button>
                </DrawerCloseButton>

                <DrawerHeader borderBottomWidth="1px">
                  <Text fontSize="sm" display={"flex"} gap={1}>
                    There are {<SentimentTotal sentiment={sentimentType} />}{" "}
                    messages that have{" "}
                    <span
                      style={{
                        backgroundColor: descBg,
                        paddingRight: 8,
                        paddingLeft: 8,
                        borderRadius: 5,
                        paddingBottom: 2,
                      }}
                    >
                      {" "}
                      {sentimentType}
                    </span>{" "}
                    sentiment
                  </Text>
                </DrawerHeader>
                <DrawerBody>
                  <Stack spacing="24px">
                    <Box>
                      <SocialMessagesType sentimentType={sentimentType} />
                    </Box>
                  </Stack>
                </DrawerBody>
              </Card>
            </DrawerContent>
          </Drawer>
        </>
      )}
      <Card
        className={cn(styles.card, className)}
        title="Social Media Sentiment Around Beckett"
        description={
          "To see all the messages with the same sentiment hover on the graph and select the dots on the sentiment line.  ---🟠---"
        }
        classTitle={cn("title-green", styles.cardTitle)}
        classCardHead={styles.cardHead}
      >
        <ChartLine data={data}  />
        {/* <div className={styles.chart}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={sentiment_analysis}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 30,
              }}
            >
              <Legend
                layout="horizontal"
                align="center"
                horizontalAlign="bottom"
              />
              <CartesianGrid
                strokeDasharray="none"
                stroke={darkMode.value ? "#272B30" : "#EFEFEF"}
                vertical={true}
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fontWeight: "500", fill: "#9A9FA5" }}
                padding={{ left: 10 }}
                tickFormatter={(value) => moment(`${value}`).format("MMM Do")}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#272B30",
                  borderColor: "rgba(255, 255, 255, 0.12)",
                  borderRadius: 8,
                  boxShadow: "15px 30px 40px 5px rgba(0, 0, 0, 0.5)",
                }}
                labelStyle={{ fontSize: 12, fontWeight: "500", color: "#fff" }}
                itemStyle={{
                  padding: 0,
                  textTransform: "capitalize",
                  fontSize: 12,
                  fontWeight: "600",
                }}
                // formar label
                labelFormatter={(value) =>
                  moment(`${value}`).format("MMM Do YYYY")
                }
                // rename dataKey
                formatter={(value, name) => [`${name}:: ${value} `]}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fontWeight: "500", fill: "#9A9FA5" }}
              />
              <Line
                type="monotone"
                dataKey="positive"
                dot={true}
                r={7}
                // get label from data

                activeDot={{
                  onClick: () => {
                    // openmoodal and set sentiment type
                    setOpen(true);
                    setSentimentType("positive");
                    setColor("title-green");
                    setEmoji("😎");
                    setDescBg("#83BF6E");
                    setSentimeTotal(positive[0]);
                  },
                }}
                strokeWidth={3}
                stroke="#83BF6E"
              />
              <Line
                type="monotone"
                dataKey="neutral"
                dot={true}
                strokeWidth={3}
                stroke="#2A85FF"
                r={7}
                activeDot={{
                  onClick: () => {
                    // openmoodal and set sentiment type
                    setOpen(true);
                    setSentimentType("neutral");
                    setColor("title-blue");
                    setEmoji("");
                    setDescBg("#2A85FF");
                  },
                }}
              />
              <Line
                type="monotone"
                dataKey="negative"
                dot={true}
                r={7}
                strokeWidth={3}
                stroke="#FF6A55"
                activeDot={{
                  onClick: () => {
                    // openmoodal and set sentiment type
                    setOpen(true);
                    setSentimentType("negative");
                    setColor("title-red");
                    setEmoji("😡");
                    setDescBg("#FF6A55");
                  },
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div> */}
      </Card>
    </>
  );
};

const SentimentTotal = (sentiment) => {
  const [socialindicators, setData] = React.useState([]);
  const [pos] = React.useState(sentiment?.sentiment);
  const [neg] = React.useState(sentiment?.sentiment);
  const [neu] = React.useState(sentiment?.sentiment);

  function getData() {
    const apiName = "palentirApi";
    const path = "/socialmedia/socialindicators";

    return API.get(apiName, path);
  }

  React.useEffect(() => {
    (async function () {
      const response = await getData();
      setData(response);
    })();
  }, [sentiment]);

  const weekly_indic = socialindicators?.data;

  const positive = [];
  const neutral = [];
  const negative = [];
  const total = [];
  const dates = [];

  if (weekly_indic) {
    const data_analysis = socialindicators?.data;

    for (let key in data_analysis) {
      positive.push(data_analysis[key]?.weekly_positive);
      neutral.push(data_analysis[key]?.weekly_neutral);
      negative.push(data_analysis[key]?.weekly_negative);
      total.push(data_analysis[key]?.weekly_total);
      dates.push(data_analysis[key]?.date);
    }
  }

  if (!sentiment) {
    return <Text>...loading</Text>;
  }

  if (pos === "positive") {
    return (
      <>
        <Text>{positive}</Text>
      </>
    );
  }
  if (neg === "negative") {
    return (
      <>
        <Text>{negative}</Text>
      </>
    );
  }
  if (neu === "neutral") {
    return (
      <>
        <Text>{neutral}</Text>
      </>
    );
  }
  return (
    <>
      <Text>...loading</Text>
    </>
  );
};

export default SentimentAnalysis;
