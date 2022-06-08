import {
  Box,
  Flex,
  Heading,
  Img,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import Lottie from "lottie-react";
import dash from "./dash.json";
import loadingLetter from "../../components/LottieAnimation/globe2.json";
const ComingSoon = () => {
  return (
    <Box as="section" pt="24" pb="12" overflow="hidden" mt={60}>
      <Box
        maxW={{
          base: "xl",
          md: "7xl",
        }}
        mx="auto"
        px={{
          base: "6",
          md: "8",
        }}
      >
        <Flex
          align="flex-start"
          direction={{
            base: "column",
            lg: "row",
          }}
          justify="space-between"
          mb="20"
        >
          <Box
            flex="1"
            maxW={{
              lg: "xl",
            }}
            pt="6"
          >
            <Heading as="h1" size="3xl" fontWeight="extrabold">
              Currently under development.
            </Heading>

            <Lottie
              animationData={loadingLetter}
              play={"loop"}
              loop
              style={{
                width: "25rem",
                marginTop: "30px",
              }}
            />
          </Box>
          <Box
            boxSize={{
              base: "20",
              lg: "8",
            }}
          />
          <Img
            pos="relative"
            marginEnd="-16rem"
            w="50rem"
            src={require("./market3.png")}
            alt="Market"
          />
        </Flex>
        <Box>
          <Text color={mode("gray.600", "gray.400")} fontWeight="medium">
            The Most Trusted Source in the Industry.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ComingSoon;
