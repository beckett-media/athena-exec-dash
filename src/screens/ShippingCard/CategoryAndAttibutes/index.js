import React, { useState } from "react";
import cn from "classnames";
import styles from "./CategoryAndAttibutes.module.sass";
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
} from "@chakra-ui/react";
import moment from "moment";
import { API } from "aws-amplify";
// darkmode
import useDarkMode from "use-dark-mode";
import * as mutations from "../../../graphql/mutations";

const optionsCategory = [
  "Select category",
  "BGS MAIL RECEIVED",
  "BGS RECEIVED",
  "CBCS RECEIVED",
  "OTHERS",
];

const CategoryAndAttibutes = ({ className, ...props }) => {
  // const [category, setCategory] = useState(optionsCategory[0]);
  const [category, setCategory] = useState("BGS");
  //cardsReceived, cardsShippedToday, cardsGradedToday, submissionItem, type, date
  const [cardsReceived, setCardsReceived] = useState(0);
  const [cardsShippedToday, setCardsShippedToday] = useState(0);
  const [cardsGradedToday, setCardsGradedToday] = useState(0);
  const [categoryType, setCategoryType] = useState(category);

  const date = new Date(2011, 3, 26).toISOString();
  const dateFormat = moment(date).format("YYYY-MM-DD");
  const todayDate = dateFormat;

  const darkMode = useDarkMode(false);

  React.useEffect(() => {
    setCategoryType(category);
  }, [category]);

  // generate random string
  const randomNumber = (min, max) => {
    const number = Math.floor(Math.random() * (max - min + 1009)) + min;
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 6));
    const symboles = "!@#$%^&*()_+";
    const randomSymbole = symboles[Math.floor(Math.random() * symboles.length)];
    return `${number}${letter}${randomSymbole}`;
  };

  const path = "/athenaform";
  const apiName = "palentirApi";
  const myInit = {
    body: {
      cards_graded_today: parseInt(cardsGradedToday),
      cards_shipped_today: parseInt(cardsShippedToday),
      cards_received: parseInt(cardsReceived),
      type: "BGS RECEIVED",
      date: todayDate,
      submission_item: `${randomNumber(1, 100)}`,
    },
  };

  const graphQLSubmit = async () => {
    const formDetails = {
      id: `${randomNumber(1, 100)}`,
      cardsshipped: parseInt(cardsGradedToday),
      cardsreceived: parseInt(cardsShippedToday),
      cardsgraded: parseInt(cardsGradedToday),
      type: String(categoryType),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      date: todayDate,
    };

    await API.graphql({
      query: mutations.createCards,
      variables: { input: formDetails },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async () => {
    API.post(apiName, path, myInit)
      .then((response) => {
        console.log(response.status_code);
        // Add your code here
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <Card
      className={cn(styles.card, className)}
      title="Daily Inbound / Received Form"
      classTitle="title-green"
    >
      <div className={styles.images}>
        {/* <Dropdown
          className={styles.field}
          label="Category"
          tooltip="Select your category"
          value={category}
          setValue={setCategory}
          options={optionsCategory}
        /> */}

        <NumberInput>
          <FormLabel>Cards graded today</FormLabel>
          <NumberInputField
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
            borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
            borderRadius={12}
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
              bg={useColorModeValue("gray.500", "gray.600")}
              _hover={{ bg: useColorModeValue("gray.600", "gray.500") }}
              _active={{ bg: useColorModeValue("gray.700", "gray.500") }}
              color="white"
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
