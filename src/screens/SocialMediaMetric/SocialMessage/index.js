import React, { useState } from "react";
import cn from "classnames";

import styles from "./List.module.sass";
import Card from "../../../components/Card";
import Item from "./Item";
import { SocialMedia } from "../../../mocks/social_media_messages";

const SocialMessages = ({ className, onOpen }) => {
  return (
    <Card
      className={cn(styles.card, className)}
      title="Recent Posts"
      classTitle={cn("title-red", styles.title)}
      classCardHead={styles.head}
    >
      {/** make the div scrolable   */}
      <div
        className={styles.notifications}
        style={{
          overflowY: "scroll",
          overflowX: "hidden",
          height: " calc(100vh - 340px)",
        }}
      >
        {SocialMedia.map((item, index) => (
          <Item
            key={index}
            item={item}
            onOpen={onOpen}
            className={cn(styles.item, className)}
          />
        ))}
      </div>
    </Card>
  );
};

export default SocialMessages;
