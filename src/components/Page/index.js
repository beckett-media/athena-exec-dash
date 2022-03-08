import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import cn from "classnames";
import styles from "./Page.module.sass";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { Heading } from "@chakra-ui/react";

const Page = ({ wide, title, desc, user, signOut }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className={styles.page}>
        <Sidebar
          signOut={signOut}
          className={cn(styles.sidebar, { [styles.visible]: visible })}
          onClose={() => setVisible(false)}
        />
        <Header user={user} onOpen={() => setVisible(true)} />
        <div className={styles.inner}>
          <div
            className={cn(styles.container, {
              [styles.wide]: wide,
            })}
          >
            {(title && (
              <Heading as="h1" className={styles.title}>
                {title}
              </Heading>
            )) ||
              null}

            {desc && <div className={cn("h5", styles.title)}>{desc}</div>}
            {Outlet && <Outlet />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
