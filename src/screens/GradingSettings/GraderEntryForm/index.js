import React, { useState, useCallback } from "react";
import cn from "classnames";
import styles from "./CardForm.module.sass";
import stylesControl from "./Control.module.sass";
import Card from "../../../components/Card";
import {
  Button,
  Input,
  NumberInput,
  NumberInputField,
  Flex,
  Divider,
  Box,
  useColorModeValue,
  FormLabel,
  Text,
  Spinner,
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
  const [cardsReceived, setCardsReceived] = useState("");
  const [cardsShippedToday, setCardsShippedToday] = useState("");
  const [cardsGradedToday, setCardsGradedToday] = useState("");
  const [categoryType, setCategoryType] = useState(category);
  const [status_code, setStatusCode] = useState(0);
  const [LoadingForm, setLoadingForm] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedDayFormData, setSelectedDayFormData] = useState(
    startingSelectedDayObj
  );
  const [selectedDayServiceLevel, setSelectedDayServiceLevel] =
    useState(startingServiceLevel);
  const [notEditable, setNotEditable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [twoDayPremium, setTwoDayPremium] = useState("");
  const [fiveDayExpress, setFiveDayExpress] = useState("");
  const [tenDayExpress, setTenDayExpress] = useState("");
  const [thirtyDayStandard, setThirtyDayStandard] = useState("");
  const [cardsVerified, setCardsVerified] = useState("");
  const [revenueOfCardsShipped, setRevenueOfCardsShipped] = useState("");
  const [recase, setRecase] = useState("");
  const [newGraderName, setNewGraderName] = useState("");
  const darkMode = useDarkMode(false);
  const startDateFormatted = moment(startDate).format("YYYY-MM-DD");
  const [grader, setGrader] = useState("test");
  const [includesSaturday, setIncludesSaturday] = useState(false);
  const [cardsGraded, setCardsGraded] = useState(0);
  const actions = [
    {
      icon: "calendar",
      action: () => setVisibleModal(true),
    },
  ];

  //FUNCTIONS
  // generate random string
  const randomNumber = (min, max) => {
    const number = Math.floor(Math.random() * (max - min + 1009)) + min;
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 6));
    return `${number}${letter}`;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmit = useCallback(async (e) => {
    alert(`${startDate}, ${grader}, ${cardsGraded}, ${includesSaturday}`);
    setCardsGraded(0);
    setIncludesSaturday(false);
    // const serviceLevel = "/servicelevel";
    // const cardUpdated = "/grading-service-form";
    // const apiName = "palentirApi";
    // setLoading(true);
    // API.post(apiName, cardUpdated, myInit)
    //   .then((response) => {
    //     console.log("response from post", response);
    //     console.log(response.status_code);
    //     setStatusCode(response.status_code);
    //     if (
    //       twoDayPremium ||
    //       fiveDayExpress ||
    //       tenDayExpress ||
    //       thirtyDayStandard ||
    //       recase
    //     ) {
    //       API.post(apiName, serviceLevel, serviceLevelInit)
    //         .then((response) => {
    //           console.log("response from post", response);
    //           console.log(response.status_code);
    //         })
    //         .catch((error) => console.log(error.data));
    //     }
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error.data, "post error");
    //     setLoading(false);
    //   });
  });

  const handleServiceLevelChange = (e, setServiceLevel) => {
    setServiceLevel(e.target.value);
  };
  const checkDisableSubmit = () => {
    if (!(grader && cardsGraded)) return true;
  };

  //DEFINITIONS
  const myInit = {
    body: {
      cards_graded_today: parseInt(cardsGradedToday),
      cards_shipped_today: parseInt(cardsShippedToday),
      cards_received: parseInt(cardsReceived),
      type: "BGS",
      date: startDateFormatted,
      submission_item: `${
        randomNumber(1, 100) +
        randomNumber(1, 100) +
        randomNumber(1, 100) +
        randomNumber(1, 100)
      }`,
    },
  };

  const serviceLevelInit = {
    body: {
      two_day: parseInt(twoDayPremium) || 0,
      five_day: parseInt(fiveDayExpress) || 0,
      ten_day: parseInt(tenDayExpress) || 0,
      thirty_day: parseInt(thirtyDayStandard) || 0,
      verified: cardsVerified.toString() || "0",
      revenueshipped: revenueOfCardsShipped.toString() || "0",
      recase: parseInt(recase) || 0,
      date: startDateFormatted,
      hidden_1: 0,
      total: parseInt(cardsReceived),
      type: "BGS",
      submission_item: `${
        randomNumber(1, 100) +
        randomNumber(1, 100) +
        randomNumber(1, 100) +
        randomNumber(1, 100)
      }`,
    },
  };

  const graders = ["John Smith", "Peter Pan", "Balou the Bear", "P. Sherman"];

  //USE EFFECT
  React.useEffect(() => {
    setCategoryType(category);
  }, [category]);

  React.useEffect(() => {
    setLoadingForm(true);
    if (status_code === 200) {
      setLoadingForm(false);
      setCardsReceived(0);
      setCardsShippedToday(0);
      setCardsGradedToday(0);
    }
  }, [handleSubmit]);

  React.useEffect(() => {
    (async () => {
      const apiName = "palentirApi";
      const path = `/grading-service-form`;
      API.get(apiName, path)
        .then((response) => {
          const formdata = response.data?.data;
          const filteredFormDataByDay = formdata.filter(
            (data) =>
              data.properties.date === moment(startDate).format("YYYY-MM-DD")
          );
          if (filteredFormDataByDay[0]) {
            setSelectedDayFormData(filteredFormDataByDay[0]);
          } else {
            setSelectedDayFormData(startingSelectedDayObj);
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    })();
    (async () => {
      const apiName = "palentirApi";
      const path = "/servicelevel";
      API.get(apiName, path)
        .then((response) => {
          const formdata = response.data?.data;
          const filteredFormDataByDay = formdata.filter(
            (data) =>
              data.properties.date === moment(startDate).format("YYYY-MM-DD")
          );
          if (filteredFormDataByDay[0]) {
            setSelectedDayServiceLevel(filteredFormDataByDay[0]);
          } else {
            setSelectedDayServiceLevel(startingSelectedDayObj);
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    })();
    setNotEditable(true);
  }, [startDate]);

  //CONSOLE LOGS
  console.log(cardsGraded);
  console.log(grader);

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
              onChange={(e) => setCardsGraded(e.target.value)}
              value={cardsGraded}
            ></NumberInputField>
          </NumberInput>
          <Checkbox
            isChecked={includesSaturday}
            onChange={() => setIncludesSaturday(!includesSaturday)}
          >
            Includes Saturday work
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
