import React, { useState } from "react";
import cn from "classnames";
import styles from "./Overview.module.sass";
import {
  NumberInput,
  NumberInputField,
  useColorModeValue,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { API } from "aws-amplify";
import useDarkMode from "use-dark-mode";
import Icon from "../../../../Icon";
import loadingJson from "../../../../LottieAnimation/loading.json";
import Lottie from "lottie-react";

const Overview = ({ selectedData, onClose, setLoading }) => {
  const darkMode = useDarkMode(false);
  const [cardsReceived, setCardsReceived] = useState(
    selectedData.cardsReceived
  );
  const [cardsShippedToday, setCardsShippedToday] = useState(
    selectedData.cardsShippedToday
  );
  const [cardsGradedToday, setCardsGradedToday] = useState(
    selectedData.cardsGradedToday
  );
  const [type, setType] = useState(selectedData.type);
  const [loading, setLoadingForm] = useState(false);
  const [successfully, setSuccessfully] = useState(false);

  const submissionItem = selectedData.submissionItem;
  const date = selectedData.date;


  const handleSubmit = async () => {
    const apiName = "palentirApi";
    const path = `/grading-service-form`;

    const myInit = {
      body: {
        cards_graded_today: parseInt(cardsGradedToday),
        cards_shipped_today: parseInt(cardsShippedToday),
        cards_received: parseInt(cardsReceived),
        type: type,
        date: date,
        submission_item: `${submissionItem}`,
      },
    };

    setLoadingForm(true);
    API.put(apiName, path, myInit)
      .then((response) => {
        setSuccessfully(true);
        setLoading(true);
        onClose();
      })
      .catch((error) => {
        setLoading(false);
        // console.log(error);
      });
  };

  React.useEffect(() => {
    setCardsReceived(selectedData.cardsReceived);
    setCardsShippedToday(selectedData.cardsShippedToday);
    setCardsGradedToday(selectedData.cardsGradedToday);
    setType(selectedData.type);
  }, [successfully]);

  return (
    <>
      <div className={styles.overview}>
        <div className={cn("h4", styles.title)}>Grading Services (BGS)</div>
        {!loading && (
          <div className={styles.info}>created on {selectedData.date}</div>
        )}
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.content}>
              {loading && (
                <div
                  style={{
                    width: "100%",
                    height: 60,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text color={darkMode.value ? "#fff" : "#000"} w={100}>
                    Updating...
                  </Text>
                  <Lottie
                    animationData={loadingJson}
                    play={loading ? true : false}
                    loop={loading ? true : false}
                    height={30}
                    width={60}
                  />
                </div>
              )}

              {!loading && (
                <>
                  <NumberInput>
                    <FormLabel>Type</FormLabel>
                    <Input
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      focusBorderColor={useColorModeValue(
                        "blue.500",
                        "blue.200"
                      )}
                      borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
                      borderRadius={12}
                      value={type}
                      border={`2px solid transparent`}
                      mb={25}
                      size="lg"
                      type="text"
                      placeholder={selectedData.type}
                      onChange={(e) => setType(e.target.value)}
                    />
                  </NumberInput>
                  <NumberInput>
                    <FormLabel>Cards graded</FormLabel>
                    <NumberInputField
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      focusBorderColor={useColorModeValue(
                        "blue.500",
                        "blue.200"
                      )}
                      borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
                      borderRadius={12}
                      value={cardsGradedToday}
                      border={`2px solid transparent`}
                      mb={25}
                      size="lg"
                      type="number"
                      placeholder={selectedData.cardsGradedToday}
                      onChange={(e) => setCardsGradedToday(e.target.value)}
                    />
                  </NumberInput>
                  <NumberInput>
                    <FormLabel>Cards shipped</FormLabel>
                    <NumberInputField
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      focusBorderColor={useColorModeValue(
                        "blue.500",
                        "blue.200"
                      )}
                      borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
                      borderRadius={12}
                      value={cardsShippedToday}
                      border={`2px solid transparent`}
                      mb={25}
                      size="lg"
                      type="number"
                      placeholder={selectedData.cardsShippedToday}
                      onChange={(e) => setCardsShippedToday(e.target.value)}
                    />
                  </NumberInput>
                  <NumberInput mb={15}>
                    <FormLabel>Cards received</FormLabel>
                    <NumberInputField
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      focusBorderColor={useColorModeValue(
                        "blue.500",
                        "blue.200"
                      )}
                      borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
                      borderRadius={12}
                      value={cardsReceived}
                      border={`2px solid transparent`}
                      mb={25}
                      size="lg"
                      type="number"
                      placeholder={selectedData.cardsReceived}
                      onChange={(e) => setCardsReceived(e.target.value)}
                    />
                  </NumberInput>
                </>
              )}
            </div>
            {!successfully && (
              <div
                className={styles.btns}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <button className={cn("button")} onClick={() => handleSubmit()}>
                  <Icon name="plus" size="15" />
                  <span className={styles.inner}>Submit</span>
                </button>
              </div>
            )}
            {/* {!successfully && (
              <div
                className={styles.btns}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <button className={cn("button")} style={{backgroundColor:"red", marginTop:10}} onClick={() => handleDelete()}>
                  <Icon name="trash" size="15" />
                  <span className={styles.inner}>Delete</span>
                </button>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
