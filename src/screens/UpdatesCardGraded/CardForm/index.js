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
  Divider,
  Box,
  useColorModeValue,
  FormLabel,
  Text,
} from "@chakra-ui/react";
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
    fiveDay: "",
    recase: "",
    tenDay: "",
    thirtyDay: "",
    twoDay: "",
    revenueshipped: "",
    verified: "",
  },
};
const CardForm = ({ className, ...props }) => {
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
  const [twoDay, setTwoDay] = useState("");
  const [fiveDay, setFiveDay] = useState("");
  const [tenDay, setTenDay] = useState("");
  const [thirtyDay, setThirtyDay] = useState("");
  const [verified, setVerified] = useState("");
  const [revenueshipped, setRevenueShipped] = useState("");
  const [recase, setRecase] = useState("");
  const darkMode = useDarkMode(false);
  const startDateFormatted = moment(startDate).format("YYYY-MM-DD");
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
      two_day: parseInt(twoDay) || 0,
      five_day: parseInt(fiveDay) || 0,
      ten_day: parseInt(tenDay) || 0,
      thirty_day: parseInt(thirtyDay) || 0,
      verified: verified.toString() || "0",
      revenueshipped: revenueshipped.toString() || "0",
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmit = useCallback(async (e) => {
    const serviceLevel = "/servicelevel";
    const cardUpdated = "/grading-service-form";
    const apiName = "palentirApi";
    setLoading(true);
    API.post(apiName, cardUpdated, myInit)
      .then((response) => {
        console.log("response from post", response);
        console.log(response.status_code);
        setStatusCode(response.status_code);
        if (twoDay || fiveDay || tenDay || thirtyDay || recase) {
          API.post(apiName, serviceLevel, serviceLevelInit)
            .then((response) => {
              console.log("response from post", response);
              console.log(response.status_code);
            })
            .catch((error) => console.log(error.data));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.data, "post error");
        setLoading(false);
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
            setNotEditable(true);
          } else {
            setSelectedDayFormData(startingSelectedDayObj);
            setNotEditable(false);
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

    setTwoDay("");
    setFiveDay("");
    setTenDay("");
    setThirtyDay("");
    setVerified("");
    setRevenueShipped("");
    setRecase("");
    setCardsGradedToday("");
    setCardsShippedToday("");
    setCardsReceived("");
  }, [startDate]);

  const handleServiceLevelChange = (e, setServiceLevel) => {
    setServiceLevel(e.target.value);
  };
  const checkDisableSubmit = () => {
    if (
      !(cardsGradedToday && cardsShippedToday && cardsReceived && !notEditable)
    )
      return true;
    return checkSumServiceLevel();
  };
  const checkSumServiceLevel = () => {
    if (notEditable) {
      return false;
    }
    const two =
      selectedDayServiceLevel.properties.twoDay || parseInt(twoDay) || 0;
    const five =
      selectedDayServiceLevel.properties.fiveDay || parseInt(fiveDay) || 0;
    const ten =
      selectedDayServiceLevel.properties.tenDay || parseInt(tenDay) || 0;
    const thirty =
      selectedDayServiceLevel.properties.thirtyDay || parseInt(thirtyDay) || 0;
    const re =
      selectedDayServiceLevel.properties.recase || parseInt(recase) || 0;
    if (two === 0 && five === 0 && ten === 0 && thirty === 0 && re === 0)
      return false;
    const totalServiceLevelSum = two + five + ten + thirty + re;
    if (totalServiceLevelSum !== parseInt(cardsReceived)) return true;
  };
  return (
    <Card
      className={cn(styles.card, className)}
      title="Cards Received, Graded, & Shipped Input Form"
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
        <NumberInput
          value={
            selectedDayFormData.properties.cardsGradedToday || cardsGradedToday
          }
        >
          <FormLabel>Cards graded today</FormLabel>
          <NumberInputField
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
            borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
            borderRadius={12}
            value={cardsGradedToday}
            disabled={
              selectedDayFormData.properties.cardsGradedToday && notEditable
            }
            border={`2px solid transparent`}
            mb={25}
            size="lg"
            label="Cards graded today"
            type="number"
            placeholder="0"
            onChange={(e) => {
              setCardsGradedToday(e.target.value);
            }}
          />
        </NumberInput>
        <NumberInput
          value={
            selectedDayFormData.properties.cardsShippedToday ||
            cardsShippedToday
          }
        >
          <FormLabel>Cards shipped today</FormLabel>
          <NumberInputField
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
            borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
            borderRadius={12}
            border={`2px solid transparent`}
            disabled={
              selectedDayFormData.properties.cardsShippedToday && notEditable
            }
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
        <NumberInput
          value={selectedDayFormData.properties.cardsReceived || cardsReceived}
        >
          <FormLabel>Cards received today</FormLabel>
          <NumberInputField
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
            borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
            borderRadius={12}
            border={`2px solid transparent`}
            disabled={
              selectedDayFormData.properties.cardsReceived && notEditable
            }
            mb={35}
            value={cardsReceived}
            size="lg"
            label="Cards received today"
            type="number"
            placeholder="0"
            onChange={(e) => setCardsReceived(e.target.value)}
          />
        </NumberInput>
        <Flex>
          <FormLabel mb={3}>
            Cards Recieved By Service Level (Optional):
          </FormLabel>
          {checkSumServiceLevel() && (
            <FormLabel color={"red"}>
              Cards Recieved Today Must Equal The Sum Of The Cards In Service
              Levels
            </FormLabel>
          )}
        </Flex>
        <Flex>
          <NumberInput
            mr={3}
            value={selectedDayServiceLevel.properties.twoDay || twoDay}
          >
            <NumberInputField
              focusBorderColor={useColorModeValue("blue.500", "blue.200")}
              borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
              borderRadius={12}
              mb={3}
              disabled={
                (selectedDayServiceLevel.properties.twoDay ||
                  selectedDayServiceLevel.properties.fiveDay ||
                  selectedDayServiceLevel.properties.tenDay ||
                  selectedDayServiceLevel.properties.thirtyDay ||
                  selectedDayServiceLevel.properties.recase) &&
                notEditable
              }
              border={`2px solid transparent`}
              label="Two Day"
              type="number"
              placeholder="0"
              onChange={(e) => handleServiceLevelChange(e, setTwoDay)}
            ></NumberInputField>
            <FormLabel mb={5} textAlign={"center"}>
              {" "}
              Two Day{" "}
            </FormLabel>
          </NumberInput>
          <NumberInput
            mr={3}
            value={selectedDayServiceLevel.properties.fiveDay || fiveDay}
          >
            <NumberInputField
              focusBorderColor={useColorModeValue("blue.500", "blue.200")}
              borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
              borderRadius={12}
              mb={3}
              border={`2px solid transparent`}
              disabled={
                (selectedDayServiceLevel.properties.twoDay ||
                  selectedDayServiceLevel.properties.fiveDay ||
                  selectedDayServiceLevel.properties.tenDay ||
                  selectedDayServiceLevel.properties.thirtyDay ||
                  selectedDayServiceLevel.properties.recase) &&
                notEditable
              }
              label="Five Day"
              type="number"
              placeholder="0"
              onChange={(e) => handleServiceLevelChange(e, setFiveDay)}
            ></NumberInputField>
            <FormLabel textAlign={"center"}> Five Day </FormLabel>
          </NumberInput>
          <NumberInput
            mr={3}
            value={selectedDayServiceLevel.properties.tenDay || tenDay}
          >
            <NumberInputField
              focusBorderColor={useColorModeValue("blue.500", "blue.200")}
              borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
              borderRadius={12}
              mb={3}
              border={`2px solid transparent`}
              disabled={
                (selectedDayServiceLevel.properties.twoDay ||
                  selectedDayServiceLevel.properties.fiveDay ||
                  selectedDayServiceLevel.properties.tenDay ||
                  selectedDayServiceLevel.properties.thirtyDay ||
                  selectedDayServiceLevel.properties.recase) &&
                notEditable
              }
              label="Ten Day"
              type="number"
              placeholder="0"
              onChange={(e) => handleServiceLevelChange(e, setTenDay)}
            ></NumberInputField>
            <FormLabel textAlign={"center"}> Ten Day </FormLabel>
          </NumberInput>
          <NumberInput
            mr={3}
            value={selectedDayServiceLevel.properties.thirtyDay || thirtyDay}
          >
            <NumberInputField
              focusBorderColor={useColorModeValue("blue.500", "blue.200")}
              borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
              borderRadius={12}
              mb={3}
              border={`2px solid transparent`}
              disabled={
                (selectedDayServiceLevel.properties.twoDay ||
                  selectedDayServiceLevel.properties.fiveDay ||
                  selectedDayServiceLevel.properties.tenDay ||
                  selectedDayServiceLevel.properties.thirtyDay ||
                  selectedDayServiceLevel.properties.recase) &&
                notEditable
              }
              label="Thirty Day"
              type="number"
              placeholder="0"
              onChange={(e) => handleServiceLevelChange(e, setThirtyDay)}
            ></NumberInputField>
            <FormLabel textAlign={"center"}> Thirty Day </FormLabel>
          </NumberInput>
          <NumberInput
            mr={3}
            value={selectedDayServiceLevel.properties.recase || recase}
          >
            <NumberInputField
              focusBorderColor={useColorModeValue("blue.500", "blue.200")}
              borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
              borderRadius={12}
              mb={3}
              border={`2px solid transparent`}
              disabled={
                (selectedDayServiceLevel.properties.twoDay ||
                  selectedDayServiceLevel.properties.fiveDay ||
                  selectedDayServiceLevel.properties.tenDay ||
                  selectedDayServiceLevel.properties.thirtyDay ||
                  selectedDayServiceLevel.properties.recase) &&
                notEditable
              }
              label="Recase"
              type="number"
              placeholder="0"
              onChange={(e) => handleServiceLevelChange(e, setRecase)}
            ></NumberInputField>
            <FormLabel textAlign={"center"}> Recase </FormLabel>
          </NumberInput>
        </Flex>
        <NumberInput
          value={
            selectedDayServiceLevel.properties.revenueshipped || revenueshipped
          }
        >
          <FormLabel>Revenue Of Cards Shipped</FormLabel>
          <NumberInputField
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
            borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
            borderRadius={12}
            value={cardsGradedToday}
            disabled={
              selectedDayFormData.properties.cardsGradedToday && notEditable
            }
            border={`2px solid transparent`}
            mb={25}
            size="lg"
            label="Revenue Of Cards Shipped"
            type="number"
            placeholder="0"
            onChange={(e) => {
              setRevenueShipped(e.target.value);
            }}
          />
        </NumberInput>
        <NumberInput
          value={selectedDayServiceLevel.properties.verified || verified}
        >
          <FormLabel>Cards Verified</FormLabel>
          <NumberInputField
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
            borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
            borderRadius={12}
            value={cardsGradedToday}
            disabled={
              selectedDayFormData.properties.cardsGradedToday && notEditable
            }
            border={`2px solid transparent`}
            mb={25}
            size="lg"
            label="Cards Verified"
            type="number"
            placeholder="0"
            onChange={(e) => {
              setVerified(e.target.value);
            }}
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
              // eslint-disable-next-line react-hooks/rules-of-hooks
              _hover={{ bg: useColorModeValue("gray.600", "gray.500") }}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              _active={{ bg: useColorModeValue("gray.700", "gray.500") }}
              color="white"
              disabled={checkDisableSubmit()}
            >
              Save submission
            </Button>
            {/* { selectedDayFormData.properties.cardsGradedToday && 
                <Button                
                  variantColor="purple"
                  variant="ghost"
                  mt={15}
                  onClick={() => setNotEditable(false)}
                  size="lg"
                  px="8"
                  mr={10}
                  bg={"#83BF6E"}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  _hover={{ bg: useColorModeValue("gray.600", "gray.500") }}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  _active={{ bg: useColorModeValue("gray.700", "gray.500") }}
                  color="white"
              > Edit
              </Button>} */}
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

export default CardForm;
