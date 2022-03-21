import React, { useState } from "react";
import cn from "classnames";
import styles from "./Item.module.sass";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  Avatar,
  Box,
} from "@chakra-ui/react";
import ModalDetails from "../../ModalDetails";
import moment from "moment";
//instagram
import {
  FaReddit,
  FaTwitter,
  FaRegNewspaper,
  FaTumblr,
  FaBlog,
} from "react-icons/fa";

const Item = ({ className, item }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [sentimenData, setSentimenData] = useState([]);

  React.useEffect(() => {
    if (item?.sentiment === "positive") {
      setSentimenData([styles.positive]);
    } else if (item?.sentiment === "negative") {
      setSentimenData([styles.negative]);
    } else if (item?.sentiment === "neutral") {
      setSentimenData([styles.neutral]);
    }
  }, [item?.sentiment]);

  return (
    <div onClick={onOpen} className={cn(styles.item, sentimenData, className)}>
      <div className={styles.avatar}>
        <Avatar src={item?.avatar} alt="avatar" />

        <div className={styles.icon} style={{ backgroundColor: item?.color }}>
          {item?.platform === "twitter" && (
            <Box
              size={"md"}
              as={FaTwitter}
              bg={"blue.500"}
              p={"0.3rem"}
              borderRadius={"20rem"}
            />
          )}
          {item?.platform === "reddit" && (
            <Box
              as={FaReddit}
              bg={"blue.500"}
              p={"0.3rem"}
              borderRadius={"20rem"}
              size={"md"}
            />
          )}
          {item?.platform === "news" && (
            <Box
              as={FaRegNewspaper}
              bg={"blue.500"}
              p={"0.3rem"}
              borderRadius={"20rem"}
              size={"md"}
            />
          )}
          {item?.platform === "tumblr" && (
            <Box
              as={FaTumblr}
              bg={"blue.500"}
              p={"0.3rem"}
              borderRadius={"20rem"}
              size={"md"}
            />
          )}
          {item?.platform === "forum" && (
            <Box
              as={FaBlog}
              bg={"blue.500"}
              p={"0.3rem"}
              borderRadius={"20rem"}
              size={"md"}
            />
          )}
          {item?.platform === "blog" && (
            <Box
              as={FaBlog}
              bg={"blue.500"}
              p={"0.3rem"}
              borderRadius={"20rem"}
              size={"md"}
            />
          )}
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.line}>
          <div className={styles.username}>{item?.username}</div>
          <div className={styles.time}>
            {moment(item?.datetime).format("MMM Do")}
          </div>
        </div>
        <Text noOfLines={5} className={styles.comment}>
          {item?.message}
        </Text>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} size={"2xl"} padding={20}>
        <ModalOverlay />
        <ModalContent className={styles.modal}>
          <ModalCloseButton />
          <ModalBody>
            <ModalDetails
              item={item}
              className={styles.modal}
              cardmessage={styles.cardmessage}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Item;
