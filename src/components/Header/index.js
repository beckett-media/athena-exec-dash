import { Badge, Box, HStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "./Header.module.sass";
import LogoHeader from "./Logo";

const Header = ({ onOpen, user }) => {
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    onOpen();
    setVisible(false);
  };

  // slice user name from christian@plainspokendigital.com
  const userName = user?.username.slice(0, user?.username.indexOf("@"));
  // capitalize first letter of user name
  const capitalizedUserName =
    userName.charAt(0).toUpperCase() + userName.slice(1);

  return (
    <header className={styles.header}>
      <button className={styles.burger} onClick={() => handleClick()} />
      <div className={styles.control} onClick={() => setVisible(false)}>
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
