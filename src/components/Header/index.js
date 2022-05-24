import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";
import styles from "./Header.module.sass";
import LogoHeader from "./Logo";

const Header = ({ onOpen, user }) => {
  const handleClick = () => {
    onOpen();
  };

  // slice user name from christian@plainspokendigital.com
  const userName = user?.username;
  // capitalize first letter of user name
  const capitalizedUserName =
    userName.charAt(0).toUpperCase() + userName.slice(1);

  return (
    <header className={styles.header}>
      <button className={styles.burger} onClick={() => handleClick()} />
      <div className={styles.control}>
        <LogoHeader className={styles.user} />
        <Box
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <HStack>
              <Box>👋 </Box>
              <Box />
              <Text fontSize="lg" fontWeight="medium">
                Welcome Back, {capitalizedUserName}
              </Text>
            </HStack>
          </Box>
        </Box>
      </div>
    </header>
  );
};

export default Header;
