import React from "react";
import Lottie from "lottie-react";
import dash from "./dash.json";
import loadingLetter from "./myloading.json";
import whiteloading from "./white-logo.json";
import loadingChart from "./loading.json";
import useDarkMode from "use-dark-mode";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  Box,
  Center,
} from "@chakra-ui/react";
import Card from "../Card";

const LodingModal = ({ loadingG, comingsoon, width, marginTop }) => {
  const darkMode = useDarkMode(false);
  if (loadingG === "loadingG") {
    return (
      <Center flex={1}>
        <Lottie
          style={{ width: "15rem", marginTop: 0 }}
          animationData={loadingChart}
          play={"loop"}
          loop
        />
      </Center>
    );
  } else if (comingsoon === "comingsoon") {
    return (
      <div>
        <Lottie
          style={{ width: width, marginTop: marginTop }}
          animationData={dash}
          play={"loop"}
          loop
        />
      </div>
    );
  }
  return (
    <div>
      {darkMode.value ? (
        <Lottie
          style={{ width: width, marginTop: marginTop }}
          animationData={whiteloading}
          play={"loop"}
          loop
        />
      ) : (
        <Lottie
          style={{ width: width, marginTop: marginTop }}
          animationData={loadingLetter}
          play={"loop"}
          loop
        />
      )}
    </div>
  );
};

const Loading = () => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const darkMode = useDarkMode(false);
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        style={{
          backgroundColor: darkMode.value ? "#1A1D1F" : "#e5eaf0",
        }}
      >
        <Card>
          <ModalBody>
            <Box w={"full"} justifyContent={"center"} alignContent={"center"}>
              <Text mr={8}>Loading....</Text>
              <LodingModal marginTop={0} width={"100%"} height={"50%"} />
            </Box>
          </ModalBody>
        </Card>
      </ModalContent>
    </Modal>
  );
};

export default Loading;
