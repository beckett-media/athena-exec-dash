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
  const [animation, setAnimation] = useState(false);
  // play animation after render is complete and set animation to true to prevent multiple animations
  React.useEffect(() => {
    setTimeout(() => {
      setAnimation(true);
    }, 100);
  }, []);

  return (
    <>
      <div className={styles.page}>
        <Sidebar
          signOut={signOut}
          className={cn(styles.sidebar, { [styles.visible]: visible })}
          onClose={() => setVisible(false)}
        />
        <Box
          bg={color}
          w={"100%"}
          h={400}
          position="absolute"
          zIndex={-1}
          backgroundImage={`url(${imgBg})`}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          overflow="hidden"
        >
          <Box
            w={"100%"}
            h={400}
            bg={color}
            position="absolute"
            opacity={0.1}
          />
          {globe && (
            <Lottie
              style={{
                marginLeft: "70%",
                justifySelf: "flex-end",
                width: "20rem",
                opacity: 0.5,
              }}
              animationData={chat}
              // dont play animation if it has already been played once or if it is not visible
              loop={animation && visible}
              // animation speed
              speed={0.1}
              // direction
              direction={1}
              // reverse at animation end
              reverse={false}
              // autoplay
              autoPlay={false}
              // controls
              controls={true}
              // preload
              preload={false}
              // render on every frame
              renderOnEachFrame={false}
            />
          )}
          {globes && (
            <Lottie
              style={{
                marginLeft: "70%",
                justifySelf: "flex-end",
                width: "17rem",
                marginTop: 30,
                opacity: 0.8,
              }}
              animationData={globes}
              loop={animation && visible}
              speed={0.1}
              // direction
              direction={1}
              // reverse at animation end
              reverse={false}
              // autoplay
              autoPlay={false}
              // controls
              controls={true}
              // preload
              preload={false}
              // render on every frame
              renderOnEachFrame={false}
            />
          )}
        </Box>

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
