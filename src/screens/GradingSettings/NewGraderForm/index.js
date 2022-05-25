import React, { useState, useCallback } from "react";
import cn from "classnames";
import styles from "./CardForm.module.sass";
import Card from "../../../components/Card";
import {
  Button,
  Input,
  Flex,
  Box,
  useColorModeValue,
  FormLabel,
  Text,
  Select,
} from "@chakra-ui/react";
import moment from "moment";
import { API } from "aws-amplify";
// darkmode
import useDarkMode from "use-dark-mode";
import useGraders from "../../../hooks/data/useGraders";

const NewGraderForm = ({ className, ...props }) => {
  const [status_code, setStatusCode] = useState(0);
  const [status_code_edit, setStatusCodeEdit] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [visibleModal, setVisibleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newGraderName, setNewGraderName] = useState("");
  const [editGrader, setEditGrader] = useState("");
  const [editGraderId, setEditGraderId] = useState("");
  const darkMode = useDarkMode(false);
  const startDateFormatted = moment(startDate).format("YYYY-MM-DD");
  const actions = [
    {
      icon: "calendar",
      action: () => setVisibleModal(true),
    },
  ];

  const { graders, isLoading, isError } = useGraders();

  console.log(graders, "data");

  const myInit = {
    body: {
      new_grader_name: newGraderName,
    },
  };

  const myUpdate = {
    body: {
      id: editGraderId,
      new_grader_name: editGrader,
    },
  };

  const handleSubmit = useCallback(async (e) => {
    // alert(JSON.stringify(myInit));
    const graders = "/graders";
    const apiName = "palentirApi";
    setLoading(true);
    API.post(apiName, graders, myInit)
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
    const graders = "/graders";
    const apiName = "palentirApi";
    setLoading(true);
    API.put(apiName, graders, myUpdate)
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

  React.useEffect(() => {
    // console.log(graders);
    // if (status_code === 200) {
    //   setLoading(false);
    // }
  }, [isLoading, graders]);

  const checkDisableSubmit = () => {
    if (!newGraderName) return true;
  };

  const checkEditDisableSubmit = () => {
    if (!editGrader || !editGraderId) return true;
  };

  const returnGraderId = (name) => {
    for (const i of graders) {
      if (Object.values(i).indexOf(name) > -1) {
        return i.id;
      }
    }
  };

  return (
    <Card
      className={cn(styles.card, className)}
      title="Add New Grader"
      classTitle="title-green"
    >
      <div className={styles.images}>
        <FormLabel>Enter grader name</FormLabel>
        <Input
          focusBorderColor={useColorModeValue("blue.500", "blue.200")}
          borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
          borderRadius={12}
          value={newGraderName}
          border={`2px solid transparent`}
          mb={25}
          size="lg"
          label="Cards graded today"
          placeholder="E.g. John Smith"
          type="string"
          onChange={(e) => {
            setNewGraderName(e.target.value);
          }}
        />
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
        <Box mb={25}>Or edit existing grader</Box>
        <Box mb={25}>
          <FormLabel>Select grader</FormLabel>
          <Select
            onChange={(e) => {
              console.log(e.target.value);
              setEditGrader(e.target.value);
              setEditGraderId(returnGraderId(e.target.value));
            }}
          >
            <option value="">Select</option>
            {/* TODO : Add options here */}
            {graders.map((x, index) => (
              <option value={x.newGraderName}>{x.newGraderName}</option>
            ))}
          </Select>
        </Box>
        <FormLabel>Enter new name</FormLabel>
        <Input
          focusBorderColor={useColorModeValue("blue.500", "blue.200")}
          borderColor={darkMode.value ? "#272B30" : "#EFEFEF"}
          borderRadius={12}
          value={editGrader}
          border={`2px solid transparent`}
          mb={25}
          size="lg"
          label="Cards graded today"
          placeholder={`${editGrader}`}
          type="string"
          onChange={(e) => {
            setEditGrader(e.target.value);
          }}
        />
        <Box bg="bg-surface" borderRadius="lg" flex="1" {...props}>
          <Flex direction="row-reverse" py="4" px={{ base: "4", md: "6" }}>
            <Button
              type="submit"
              variantColor="purple"
              variant="ghost"
              mt={15}
              onClick={handleUpdate}
              size="lg"
              px="8"
              bg={"#83BF6E"}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              _hover={{ bg: useColorModeValue("gray.600", "gray.500") }}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              _active={{ bg: useColorModeValue("gray.700", "gray.500") }}
              color="white"
              disabled={checkEditDisableSubmit()}
            >
              Save submission
            </Button>
            {status_code_edit === 200 && (
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

export default NewGraderForm;
