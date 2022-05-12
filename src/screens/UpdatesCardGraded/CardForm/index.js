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
  Spinner,
} from "@chakra-ui/react";
import Control from "./Control";
import moment from "moment";
import { API } from "aws-amplify";
// darkmode
import useDarkMode from "use-dark-mode";
import Modal from "../../../components/Modal";
import Schedule from "../../../components/Schedule";
import Icon from "../../../components/Icon";

const CardForm = ({ className,  ...props }) => {
  const [category, setCategory] = useState("BGS");
  const [cardsReceived, setCardsReceived] = useState(0);
  const [cardsShippedToday, setCardsShippedToday] = useState(0);
  const [cardsGradedToday, setCardsGradedToday] = useState(0);
  const [categoryType, setCategoryType] = useState(category);
  const [status_code, setStatusCode] = useState(0);
  const [LoadingForm, setLoadingForm] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [visibleModal, setVisibleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [twoDay, setTwoDay] = useState(0);
  const [fiveDay, setFiveDay] = useState(0);
  const [tenDay, setTenDay] = useState(0);
  const [thirtyDay, setThirtyDay] = useState(0);
  const [recase, setRecase] = useState(0);
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

  const path = "/servicelevel";
  const apiName = "palentirApi";
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
      two_day_premium: parseInt(twoDay),
      five_day_express: parseInt(fiveDay),
      ten_day_express: parseInt(tenDay),
      thirty_day_standard: parseInt(thirtyDay),
      recase: (parseInt(recase)),
      date: startDateFormatted,
      hidden:0,
      total: cardsReceived,
      type: "BGS"
    }
  }
  //"date": req.body.date,
  // "10_day_express" : req.body.ten_day_express,
  // "30_day_standard" : req.body.thirty_day_standard,
  // "total":  req.body.total,
  // "hidden": req.body.hidden,
  // "recase": req.body.recase,
  // "5_day_express": req.body.five_day_express,
  // "type": req.body.type,
  // "2_day_premium": req.body.two_day_premium,

  // /servicelevel
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmit = useCallback(async (e) => {
    // setLoading(true);
    // API.post(apiName, path, serviceLevelInit)
    //   .then((response) => {
    //     console.log(response.status_code);
    //     setStatusCode(response.status_code);
    //     setLoading(false);
    //     window.location.reload();
    //   })
    //   .catch((error) => {
    //     console.log(error.data);
    //     setLoading(false);
    //   });
    console.log('firing')
    API.get(apiName, path)
    .then(response => console.log(response, "This is a respnse"))
    .catch(error => console.log(error))
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

const handleServiceLevelChange = (e, setServiceLevel) => {
  if (e.target.value === '') {
    setServiceLevel(0);
  }
  else setServiceLevel(e.target.value);
}
const checkDisableSubmit = () => {
  if (!(cardsGradedToday && cardsShippedToday && cardsReceived)) return true
  return checkSumServiceLevel();
}
const checkSumServiceLevel = () => {
  if (parseInt(twoDay) === 0 && parseInt(fiveDay)===0 && parseInt(tenDay) === 0
   && parseInt(thirtyDay) === 0 && parseInt(recase) === 0) return false
  const totalServiceLevelSum = parseInt(twoDay) + parseInt(fiveDay)
  + parseInt(tenDay) + parseInt(thirtyDay) + parseInt(recase);
  if (totalServiceLevelSum !== parseInt(cardsReceived)) return true
  
}
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
        <Flex>
          <FormLabel mb ={3}>Cards Recieved By Service Level (Optional):</FormLabel>
          {checkSumServiceLevel() && <FormLabel color={"red"}>Cards Recieved Today Must Equal The Sum Of The Cards In Service Levels</FormLabel>}
        </Flex>
        <Flex>
            <NumberInput mr={3}>
              <NumberInputField
                focusBorderColor={useColorModeValue("blue.500", "blue.200")}
                borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
                borderRadius={12}
                mb={3}
                border={`2px solid transparent`}
                label="Two Day"
                type="number"
                placeholder="0"
                defaultValue={0}
                value = {twoDay || 0}
                onChange={(e) => handleServiceLevelChange(e, setTwoDay)}>
              </NumberInputField>
              <FormLabel  mb={5} textAlign={"center"}> Two Day </FormLabel>
            </NumberInput>
            <NumberInput mr={3}>
              <NumberInputField
                focusBorderColor={useColorModeValue("blue.500", "blue.200")}
                borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
                borderRadius={12}
                mb={3}
                border={`2px solid transparent`}
                label="Five Day"
                type="number"
                placeholder="0"
                onChange={(e) => handleServiceLevelChange(e, setFiveDay)}
              >
              </NumberInputField>
              <FormLabel textAlign={"center"}> Five Day </FormLabel>
            </NumberInput>
            <NumberInput mr={3}>
              <NumberInputField
                focusBorderColor={useColorModeValue("blue.500", "blue.200")}
                borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
                borderRadius={12}
                mb={3}
                border={`2px solid transparent`}
                label="Ten Day"
                type="number"
                placeholder="0"
                onChange={(e) => handleServiceLevelChange(e, setTenDay)}>
              </NumberInputField>
              <FormLabel textAlign={"center"}> Ten Day </FormLabel>
            </NumberInput>
            <NumberInput mr={3}>
              <NumberInputField
                focusBorderColor={useColorModeValue("blue.500", "blue.200")}
                borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
                borderRadius={12}
                mb={3}
                border={`2px solid transparent`}
                label="Thirty Day"
                type="number"
                placeholder="0"
                onChange={(e) => handleServiceLevelChange(e, setThirtyDay)}>
              </NumberInputField>
              <FormLabel textAlign={"center"}> Thirty Day </FormLabel>
            </NumberInput>
            <NumberInput mr={3}>
              <NumberInputField
                focusBorderColor={useColorModeValue("blue.500", "blue.200")}
                borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
                borderRadius={12}
                mb={3}
                border={`2px solid transparent`}
                label="Recase"
                type="number"
                placeholder={0}
                onChange={(e) => handleServiceLevelChange(e, setRecase)}>
              </NumberInputField>
              <FormLabel textAlign={"center"}> Recase </FormLabel>
            </NumberInput>
        </Flex>
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
                disabled={
                  // !(cardsGradedToday && cardsShippedToday && cardsReceived) &&
                  // parseInt(twoDay) === 1
                  checkDisableSubmit()
                }
              >
                Save submission
              </Button>
              {status_code === 200 && (
                <Text fontSize="lg" color="green.500" fontWeight="bold" margin={6}>
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
