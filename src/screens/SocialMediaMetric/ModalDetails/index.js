import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  Stack,
  Tag,
  Image,
  Text,
  useColorModeValue,
  Wrap,
} from "@chakra-ui/react";
import * as React from "react";
import {
  HiCash,
  HiLocationMarker,
  HiOutlineClock,
  HiOutlineMenu,
  HiShieldCheck,
} from "react-icons/hi";
import { Card } from "./Card/Card";
import moment from "moment";
import { FaReddit, FaTwitter, FaRegNewspaper, FaTumblr } from "react-icons/fa";

const ModalDetails = ({ className, cardmessage, item }) => (
  <Box
    as="section"
    className={className}
    bg={useColorModeValue("gray.100", "gray.800")}
    py="12"
  >
    <Card className={cardmessage}>
      <Stack
        direction={{
          base: "column",
          md: "row",
        }}
        spacing={{ 
          base: "3",
          md: "10",
        }}
        align="flex-start"
      >
        <Stack spacing="4">
          <Avatar size="2xl" src={item.avatar} name={item.username} />
          {item.url ? (
            <Button
              onClick={() => {
                //opeb new tab link
                item.url && window.open(item.url, "_blank");
              }}
              width="full"
              colorScheme="blue"
              display={{
                base: "none",
                md: "initial",
              }}
            >
              View Profile
            </Button>
          ) : null}
        </Stack>
        <Box>
          <Stack
            spacing={{
              base: "1",
              md: "2",
            }}
            direction={{
              base: "column",
              md: "row",
            }}
          >
            <HStack
              fontSize={{
                base: "md",
                md: "lg",
              }}
            >
              <Text
                as="span"
                color={useColorModeValue("gray.500", "gray.300")}
                lineHeight="1"
              >
                {item.username}
              </Text>
              {item.platform === "twitter" && (
                <Box
                  size={"md"}
                  as={FaTwitter}
                  bg={"blue.500"}
                  p={"0.5rem"}
                  borderRadius={"20rem"}
                  w={10}
                  h={10}
                />
              )}
              {item.platform === "reddit" && (
                <Box
                  as={FaReddit}
                  bg={"blue.500"}
                  p={"0.5rem"}
                  borderRadius={"20rem"}
                  size={"md"}
                  w={10}
                  h={10}
                />
              )}
              {item.platform === "news" && (
                <Box
                  as={FaRegNewspaper}
                  bg={"blue.500"}
                  p={"0.5rem"}
                  borderRadius={"20rem"}
                  size={"md"}
                  w={10}
                  h={10}
                />
              )}
              {item.platform === "tumblr" && (
                <Box
                  as={FaTumblr}
                  bg={"blue.500"}
                  p={"0.5rem"}
                  borderRadius={"20rem"}
                  size={"md"}
                  w={10}
                  h={10}
                />
              )}
            </HStack>
          </Stack>
          <Wrap shouldWrapChildren my="4" spacing="4">
            <HStack>
              <Icon as={HiOutlineClock} fontSize="xl" color="gray.400" />
              <Text
                fontSize="sm"
                fontWeight="medium"
                color={useColorModeValue("gray.600", "gray.300")}
              >
                <b>{moment(item.datetime).format("MMM Do YYYY")}</b>
              </Text>
            </HStack>
          </Wrap>
          <Box fontSize="sm">{item.message}</Box>
        </Box>
      </Stack>
      <Button
        mt="8"
        width="full"
        colorScheme="blue"
        display={{
          md: "none",
        }}
      >
        View Post
      </Button>
    </Card>
  </Box>
);

export default ModalDetails;
