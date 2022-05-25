import React, { useState, useCallback } from "react";
import cn from "classnames";
import styles from "./CardForm.module.sass";
import stylesControl from "./Control.module.sass";
import Card from "../../../components/Card";
import {
  Button,
  NumberInput,
  NumberInputField,
  Flex,
  Box,
  useColorModeValue,
  FormLabel,
  Text,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import Control from "./Control";
import moment from "moment";
import { API } from "aws-amplify";
// darkmode
import useDarkMode from "use-dark-mode";
import Modal from "../../../components/Modal";
import Schedule from "../../../components/Schedule";
import Icon from "../../../components/Icon";
import useGraders from "../../../hooks/data/useGraders";
import useGraderEntry from "../../../hooks/data/useGraderEntry";

const startingSelectedDayObj = {
  properties: {
    cardsGradedToday: "",
    cardsReceived: "",
    cardsShippedToday: "",
  },
};
const startingServiceLevel = {
  properties: {
    fiveDayExpress: "",
    recase: "",
    tenDayExpress: "",
    thirtyDayStandard: "",
    twoDayPremium: "",
    revenueShipped: "",
    numCardVerified: "",
  },
};

const GraderEntryForm = ({ className, ...props }) => {
  //STATE DECLARATIONS
  const [category, setCategory] = useState("BGS");
  const [status_code, setStatusCode] = useState(0);
  const [status_code_edit, setStatusCodeEdit] = useState(0);
  const [LoadingForm, setLoadingForm] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedDayFormData, setSelectedDayFormData] = useState(
    startingSelectedDayObj
  );
  const [loading, setLoading] = useState(false);
  const darkMode = useDarkMode(false);
  const [grader, setGrader] = useState("");
  const [includesSaturday, setIncludesSaturday] = useState(false);
  const [cardsGraded, setCardsGraded] = useState(0);
  const actions = [
    {
      icon: "calendar",
      action: () => setVisibleModal(true),
    },
  ];

  // const {
  //   graders,
  //   isLoading: gradersLoading,
  //   isError: gradersError,
  // } = useGraders();

  const {
    graderEntry,
    isLoading: graderEntryLoading,
    isError: graderEntryError,
  } = useGraderEntry("asc");

  const graders = [];

  (function () {
    graderEntry.forEach((i) => graders.push(i.grader));
  })();

  console.log(graders);

  const startDateFormatted = moment(startDate).format("YYYY-MM-DD");
  const startWeek = findWeekStart(startDate);
  // const weekEnd = startWeek;
  // weekEnd.setDate(weekEnd.getDate() + 4);
  const startWeekFormatted = moment(startWeek).format("YYYY-MM-DD");
  // const weekEndFormatted = moment(weekEnd).format("YYYY-MM-DD");
  const filteredData = graderEntry.filter(filterDate).filter(filterGrader);

  function filterDate(i) {
    return Object.values(i).indexOf(startWeekFormatted) > -1;
  }

  function filterGrader(i) {
    return Object.values(i).indexOf(grader) > -1;
  }

  console.log(graderEntry);
  console.log(startWeek);
  console.log(startWeekFormatted);
  console.log(grader);
  console.log(filteredData);
  // console.log(filteredData[0].monday);

  function subtractDays(date, days) {
    date.setDate(date.getDate() - days);
    return date;
  }

  function findWeekStart(date) {
    const subtract = date.getDay() - 1;
    return subtractDays(date, subtract);
  }

  function isWeekday(date) {
    return date.getDay() !== 6 && date.getDay() !== 7;
  }

  function isNotFriday(date) {
    return date.getDay() !== 5;
  }

  //DEFINITIONS
  const myPost = {
    body: {
      AthenaGraderEntry: "test",
      grader,
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      includes_saturday: false,
      start_date_formatted: startWeekFormatted,
      // end_date_formatted: weekEndFormatted,
    },
  };

  const myPut = {
    body: {
      AthenaGraderEntry: "test",
      grader,
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      includes_saturday: false,
      start_date_formatted: startWeekFormatted,
      // end_date_formatted: weekEndFormatted,
    },
  };

  //FUNCTIONS

  const handleSubmit = useCallback(async (e) => {
    // alert(JSON.stringify(myInit));
    const key = "/graderEntry";
    const apiName = "palentirApi";
    setLoading(true);
    API.post(apiName, key, myPost)
      .then((response) => {
        console.log("response from post", response);
        console.log(response.status_code);
        setStatusCode(response.status_code);
        setLoading(false);
        status_code === 200 && alert(status_code);
      })
      .catch((error) => {
        console.log(error.data, "post error");
        alert(error.data);
        setLoading(false);
      });
  });

  const handleUpdate = useCallback(async (e) => {
    // alert(JSON.stringify(myUpdate));
    const key = "/gradersentry";
    const apiName = "palentirApi";
    setLoading(true);
    API.put(apiName, key, myPut)
      .then((response) => {
        console.log("response from post", response);
        console.log(response.status_code);
        setStatusCodeEdit(response.status_code);
        setLoading(false);
        status_code_edit === 200 && alert(status_code_edit);
      })
      .catch((error) => {
        console.log(error.data, "post error");
        alert(error.data);
        setLoading(false);
      });
  });

  const checkDisableSubmit = () => {
    if (!(grader && cardsGraded && isWeekday(startDate))) return true;
  };

  return (
    <Card
      className={cn(styles.card, className)}
      title="Add Grader Entry"
      classTitle="title-green"
    >
      <div className={styles.images}>
        <Box mb={25}>
          <FormLabel>Select Date</FormLabel>
          <div className={cn(stylesControl.control, className)}>
            {actions.map((x, index) => (
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  width: "20%",
                }}
                key={index}
                onClick={x.action}
              >
                <Icon fill={"#33383F"} name={x.icon} size="36" />
                <Text ml={5}>{startDateFormatted}</Text>
              </button>
            ))}
          </div>
        </Box>
        <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
          <Schedule startDate={startDate} setStartDate={setStartDate} />
        </Modal>
        <Flex>
          <NumberInput mr={3}>
            <FormLabel>Select grader</FormLabel>
            <Select onChange={(e) => setGrader(e.target.value)}>
              <option value="">Select</option>
              {/* TODO : Add options here */}
              {graders.map((x, index) => (
                <option value={x}>{x}</option>
              ))}
            </Select>
          </NumberInput>
          <NumberInput mr={3}>
            <FormLabel>Enter cards graded</FormLabel>
            <NumberInputField
              focusBorderColor={useColorModeValue("blue.500", "blue.200")}
              borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
              borderRadius={12}
              mb={3}
              border={`2px solid transparent`}
              label="Grader entries"
              type="number"
              placeholder={cardsGraded}
              value={cardsGraded}
              onChange={(e) => setCardsGraded(e.target.value)}
            ></NumberInputField>
          </NumberInput>
          <Checkbox
            isChecked={includesSaturday}
            isDisabled={isNotFriday(startDate)}
            onChange={() => setIncludesSaturday(!includesSaturday)}
          >
            Includes Saturday work (for Friday only)
          </Checkbox>
        </Flex>
        <Box bg="bg-surface" borderRadius="lg" flex="1" {...props}>
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
              // eslint-disable-next-line react-hooks/rules-of-hooks
              _hover={{ bg: useColorModeValue("gray.600", "gray.500") }}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              _active={{ bg: useColorModeValue("gray.700", "gray.500") }}
              color="white"
              disabled={checkDisableSubmit()}
            >
              Save submission
            </Button>
            {status_code === 200 && (
              <Text
                fontSize="lg"
                color="green.500"
                fontWeight="bold"
                margin={6}
              >
                Submission saved successfully
              </Text>
            )}
          </Flex>
        </Box>
      </div>
    </Card>
  );
};

export default GraderEntryForm;
