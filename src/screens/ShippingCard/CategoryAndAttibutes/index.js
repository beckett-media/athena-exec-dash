import React, { useState, useCallback } from "react";
import cn from "classnames";
import styles from "./CategoryAndAttibutes.module.sass";
import stylesControl from "./Control.module.sass";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import {
  Button,
  NumberInput,
  NumberInputField,
  Flex,
  Divider,
  Box,
  useColorModeValue,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import Control from "./Control";
import moment from "moment";
import { API } from "aws-amplify";
// darkmode
import useDarkMode from "use-dark-mode";
import Modal from "../../../components/Modal";
import Schedule from "../../../components/Schedule";
import Icon from "../../../components/Icon";

const CategoryAndAttibutes = ({ className, ...props }) => {
  // const [category, setCategory] = useState(optionsCategory[0]);
  const [category, setCategory] = useState("BGS");
  //cardsReceived, cardsShippedToday, cardsGradedToday, submissionItem, type, date
  const [cardsReceived, setCardsReceived] = useState(0);
  const [cardsShippedToday, setCardsShippedToday] = useState(0);
  const [cardsGradedToday, setCardsGradedToday] = useState(0);
  const [categoryType, setCategoryType] = useState(category);
  const [status_code, setStatusCode] = useState(0);
  const [LoadingForm, setLoadingForm] = useState(false);

  const darkMode = useDarkMode(false);

  const [startDate, setStartDate] = useState(new Date());

  console.log(startDate);
  // convert startDate to YYYY-MM-DD format
  const startDateFormatted = moment(startDate).format("YYYY-MM-DD");
  console.log(startDateFormatted);

  const [visibleModal, setVisibleModal] = useState(false);

  const actions = [
    {
      icon: "calendar",
      action: () => setVisibleModal(true),
    },
  ];

  React.useEffect(() => {
    setCategoryType(category);
  }, [category]);

  // generate random string
  const randomNumber = (min, max) => {
    const number = Math.floor(Math.random() * (max - min + 1009)) + min;
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 6));
    return `${number}${letter}`;
  };

  const path = "/athenaform";
  const apiName = "palentirApi";
  const myInit = {
    body: {
      cards_graded_today: parseInt(cardsGradedToday),
      cards_shipped_today: parseInt(cardsShippedToday),
      cards_received: parseInt(cardsReceived),
      type: "BGS RECEIVED",
      date: startDateFormatted,
      submission_item: `${
        randomNumber(1, 100) +
        randomNumber(1, 100) +
        randomNumber(1, 100) +
        randomNumber(1, 100)
      }`,
    },
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    API.post(apiName, path, myInit)
      .then((response) => {
        console.log(response.status_code);
        setStatusCode(response.status_code);
      })
      .catch((error) => {
        console.log(error.response);
      });
  });

  React.useEffect(() => {
    setLoadingForm(true);
    if (status_code === 200) {
      setLoadingForm(false);
      setCardsReceived(0);
      setCardsShippedToday(0);
      setCardsGradedToday(0);
    }
  }, [handleSubmit]);

  return (
    <Card
      className={cn(styles.card, className)}
      title="Daily Inbound / Received Form"
      classTitle="title-green"
    >
      <div className={styles.images}>
        <Box mb={25}>
          <FormLabel>Select Date</FormLabel>
          <div className={cn(stylesControl.control, className)}>
            {actions.map((x, index) => (
              <button
                className={stylesControl.button}
                key={index}
                onClick={x.action}
              >
                <Icon name={x.icon} size="36" />
              </button>
            ))}
            <Text>{startDateFormatted}</Text>
          </div>
        </Box>
        <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
          <Schedule
            startDate={startDate}
            setStartDate={setStartDate}
          />
        </Modal>

        <NumberInput>
          <FormLabel>Cards graded today</FormLabel>
          <NumberInputField
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
            borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
            borderRadius={12}
            value={cardsGradedToday}
            border={`2px solid transparent`}
            mb={25}
            size="lg"
            label="Cards graded today"
            type="number"
            placeholder="0"
            onChange={(e) => setCardsGradedToday(e.target.value)}
          />
        </NumberInput>
        <NumberInput>
          <FormLabel>Cards shipped today</FormLabel>
          <NumberInputField
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
            borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
            borderRadius={12}
            border={`2px solid transparent`}
            mb={25}
            value={0}
            defaultValue={0}
            size="lg"
            label="Cards shipped today"
            type="number"
            placeholder="0"
            onChange={(e) => setCardsShippedToday(e.target.value)}
            // tooltip="Maximum 100 characters. No HTML or emoji allowed"
          />
        </NumberInput>
        <NumberInput>
          <FormLabel>Cards received today</FormLabel>
          <NumberInputField
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
            borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
            borderRadius={12}
            border={`2px solid transparent`}
            mb={35}
            value={cardsReceived}
            size="lg"
            label="Cards received today"
            type="number"
            placeholder="0"
            onChange={(e) => setCardsReceived(e.target.value)}
          />
        </NumberInput>
        <Box bg="bg-surface" borderRadius="lg" flex="1" {...props}>
          <Divider />
          <Flex direction="row-reverse" py="4" px={{ base: "4", md: "6" }}>
            <Button
              type="submit"
              variantColor="purple"
              variant="ghost"
              mt={15}
              onClick={handleSubmit}
              size="lg"
              px="8"
              bg={"#83BF6E"}
              _hover={{ bg: useColorModeValue("gray.600", "gray.500") }}
              _active={{ bg: useColorModeValue("gray.700", "gray.500") }}
              color="white"
              disabled={
                !(cardsGradedToday && cardsShippedToday && cardsReceived)
              }
            >
              Save submission
            </Button>
          </Flex>
        </Box>
      </div>
    </Card>
  );
};

export default CategoryAndAttibutes;
