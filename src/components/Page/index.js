import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import cn from "classnames";
import styles from "./Page.module.sass";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { Box, Heading } from "@chakra-ui/react";
import Lottie from "lottie-react";
import chat from "../LottieAnimation/chat.json";

const Page = ({
  wide,
  title,
  desc,
  user,
  signOut,
  imgBg,
  color,
  globe,
  globes,
  textColor,

}) => {
  const [visible, setVisible] = useState(false);

  // play animation after render is complete and set animation to true to prevent multiple animations

  return (
    <>
      <div className={styles.page}>
        <Sidebar
          signOut={signOut}
          user={user}
          className={cn(styles.sidebar, { [styles.visible]: visible })}
          onClose={() => setVisible(false)}
        />
        <Box
          bg={color}
          w={"full"}
          h={410}
          position="absolute"
          right={0}
          zIndex={-1}
          backgroundImage={`url(${imgBg})`}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          overflow="hidden"
        />

        <Header user={user} onOpen={() => setVisible(true)} />
        <div className={styles.inner}>
          <div
            className={cn(styles.container, {
              [styles.wide]: wide,
            })}
          >
            {(title && (
              <Heading
                marginTop={20}
                color={textColor}
                as="h1"
                size="3xl"
                fontWeight="extrabold"
                className={cn("h3", styles.title)}
              >
                {title}
              </Heading>
            )) ||
              null}

            {desc && (
              <div color={textColor} className={cn("h5", styles.title)}>
                {desc}
              </div>
            )}
            <div style={{ marginBottom: 40 }} />
            {Outlet && <Outlet />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
