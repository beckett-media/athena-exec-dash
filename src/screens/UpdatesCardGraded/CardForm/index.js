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
  const [notEditable, setNotEditable] = useState(true);
  const [serviceLevelRecieved, setServiceLevelRecieved] = useState(false);
  const [timeSeriesRecieved,setTimeSeriesRecieved] = useState(false);
  const [serviceLevelSubmissionItem, setServiceLevelSubmissionItem] = useState("");
  const [timeSeriesSubmissionItem, setTimeSeriesSubmissionItem] = useState("");
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
      submission_item: timeSeriesSubmissionItem || 
       `${
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
      submission_item: serviceLevelSubmissionItem ||
       `${
        randomNumber(1, 100) +
        randomNumber(1, 100) +
        randomNumber(1, 100) +
        randomNumber(1, 100)
      }`,
    },
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlePostSubmit = useCallback(async (e) => {
    const serviceLevel = "/servicelevel";
    const cardUpdated = "/grading-service-form";
    const apiName = "palentirApi";
    setLoading(true);
    API.post(apiName, cardUpdated, myInit)
      .then((response) => {
        setStatusCode(response.status_code);
        if (twoDay || fiveDay || tenDay || thirtyDay || recase) {
          // TODO: If we want to use mutation, `post` endpoint should return the service levels data, as like `get` endpoint
          // https://swr.vercel.app/docs/mutation#optimistic-updates
          API.post(apiName, serviceLevel, serviceLevelInit)
            .then((response) => {
              // console.log("response from post", response);
              // console.log(response.status_code);
            })
            .catch((error) => console.log(error.data));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.data, "post error");
        setLoading(false);
      });
      setNotEditable(true);
  });

  const handlePutSubmit = useCallback(async(e) => {
    const serviceLevel = "/servicelevel";
    const cardUpdated = "/grading-service-form";
    const apiName = "palentirApi";
    setLoading(true);
    API.put(apiName, cardUpdated, myInit)
      .then((response) => {
        setStatusCode(response.status_code);
        if (serviceLevelRecieved) {
          console.log('service lvl put')
          API.put(apiName, serviceLevel, serviceLevelInit)
            .then((response) => {
              console.log("response from post", response);
              console.log(response.status_code);
            })
            .catch((error) => console.log(error.data));
        } else {
          console.log('service lvl post')
          API.post(apiName, serviceLevel, serviceLevelInit)
            .then((response) => {
              // console.log("response from post", response);
              // console.log(response.status_code);
            })
            .catch((error) => console.log(error.data));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.data, "post error");
        setLoading(false);
      });
      setNotEditable(true);
  });

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
            console.log('we made it here', filteredFormDataByDay[0])
            setCardsGradedToday(filteredFormDataByDay[0].properties.cardsGradedToday);
            setCardsShippedToday(filteredFormDataByDay[0].properties.cardsShippedToday);
            setCardsReceived(filteredFormDataByDay[0].properties.cardsReceived);
            setTimeSeriesSubmissionItem(filteredFormDataByDay[0].properties.submissionItem);
            setNotEditable(true);
            setTimeSeriesRecieved(true)
          } else {
            setCardsGradedToday("");
            setCardsShippedToday("");
            setCardsReceived("");
            setTimeSeriesSubmissionItem("");
            setNotEditable(false);
            setTimeSeriesRecieved(false)
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
            setTwoDay(filteredFormDataByDay[0].properties.twoDay);
            setFiveDay(filteredFormDataByDay[0].properties.fiveDay);
            setTenDay(filteredFormDataByDay[0].properties.tenDay);
            setThirtyDay(filteredFormDataByDay[0].properties.thirtyDay);
            setVerified(filteredFormDataByDay[0].properties.verified);
            setRevenueShipped(filteredFormDataByDay[0].properties.revenueshipped);
            setRecase(filteredFormDataByDay[0].properties.recase);
            setServiceLevelSubmissionItem(filteredFormDataByDay[0].properties.submissionItem);
            setServiceLevelRecieved(true);
          } else {
            setTwoDay("");
            setFiveDay("");
            setTenDay("");
            setThirtyDay("");
            setVerified("");
            setRevenueShipped("");
            setRecase("");
            setServiceLevelSubmissionItem("");
            setServiceLevelRecieved(false);
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    })();
    setStatusCode(0);
  }, [startDateFormatted]);

  const handleChange = (e,  setServiceLevel) => {
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
       parseInt(twoDay) || 0;
    const five =
       parseInt(fiveDay) || 0;
    const ten =
       parseInt(tenDay) || 0;
    const thirty =
       parseInt(thirtyDay) || 0;
    const re =
      parseInt(recase) || 0;
    if (two === 0 && five === 0 && ten === 0 && thirty === 0 && re === 0)
      return false;
    const totalServiceLevelSum = two + five + ten + thirty + re;
    if (totalServiceLevelSum !== parseInt(cardsReceived)) return true;
  };

  const CreateNumberInput = ( value, setState, label, marginRight = 0, marginBottom, formLabelTop = true ) => {
    return (
      <NumberInput mr ={marginRight} value={ value }>
          {formLabelTop && <FormLabel> { label } </FormLabel>} 
          <NumberInputField
            focusBorderColor={ useColorModeValue("blue.500", "blue.200") }
            borderColor={ darkMode.value ? "#272B30" : "#EFEFEF" }
            borderRadius={12}
            disabled={ notEditable }
            border={`2px solid transparent`}
            mb={ marginBottom }
            label={ label }
            type="number"
            placeholder="0"
            onChange={(e) => {
              handleChange(e, setState);
            }}
          />

          {!formLabelTop && <FormLabel mb={10} textAlign={"center"}> {label} </FormLabel>} 
        </NumberInput>
    )
  }
  return (
    <Card
      className={cn(styles.card, className)}
      title="Cards Received, Graded, & Shipped Input Form"
      classTitle="title-green"
      description={"Select a previous date to view and edit data"}
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
          { CreateNumberInput(cardsGradedToday, setCardsGradedToday, "Cards graded today", 10, 25) }
          { CreateNumberInput(cardsShippedToday, setCardsShippedToday, "Cards shipped today", 10, 25) }
          { CreateNumberInput(cardsReceived, setCardsReceived, "Cards recieved today", 10, 25) }
        </Flex>
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
          { CreateNumberInput(twoDay, setTwoDay, "Two Day", 3, 0, false) }
          { CreateNumberInput(fiveDay, setFiveDay, "Five Day", 3, 0, false) }
          { CreateNumberInput(tenDay, setTenDay, "Ten Day", 3, 0, false) }
          { CreateNumberInput(thirtyDay, setThirtyDay, "Thirty Day", 3, 0, false) } 
          { CreateNumberInput(recase, setRecase, "Recase", 3, 0, false) }
        </Flex>
        <Flex>
          { CreateNumberInput(revenueshipped, setRevenueShipped, "Revenue Of Cards Shipped (Optional)", 3, 5) }
          { CreateNumberInput(verified, setVerified, "Cards Verified (Optional)", 3, 10) }
        </Flex>
        <Box bg="bg-surface" borderRadius="lg" flex="1" {...props}>
          <Divider />
          <Flex direction="row-reverse" py="4" px={{ base: "4", md: "6" }}>
            <Button
              type="submit"
              variantColor="purple"
              variant="ghost"
              mt={15}
              onClick={timeSeriesRecieved ? handlePutSubmit :  handlePostSubmit}
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
            { notEditable && serviceLevelRecieved &&
                <Button
                  variantColor="purple"
                  variant="ghost"
                  mt={15}
                  onClick={() => {
                    setStatusCode(0);
                    setNotEditable(false)}
                  } 
                  size="lg"
                  px="8"
                  mr={10}
                  bg={"blue"}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  _hover={{ bg: useColorModeValue("gray.600", "gray.500") }}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  _active={{ bg: useColorModeValue("gray.700", "gray.500") }}
                  color="white"
              > Edit
              </Button>}
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
