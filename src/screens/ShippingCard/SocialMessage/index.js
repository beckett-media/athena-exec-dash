import React from "react";
import cn from "classnames";

import styles from "./List.module.sass";
import Card from "../../../components/Card";
import Item from "./Item";

const SocialMessages = ({ className, onOpen, socialMessage }) => {
  const dataQuery = socialMessage;

  const username = [];
  const datetime = [];
  const message = [];
  const avatar = [];
  const platform = [];
  const url = [];
  const id = [];

  if (dataQuery) {
    dataQuery.forEach((item) => {
      username.push(item.username);
      datetime.push(item.datetime);
      message.push(item.message);
      avatar.push(item.avatar);
      platform.push(item.platform);
      url.push(item.url);
      id.push(item.id);
    });
  }

  const dataObject = [];

  for (let i = 0; i < username.length; i++) {
    dataObject.push({
      username: username[i],
      datetime: datetime[i],
      message: message[i],
      avatar: avatar[i],
      platform: platform[i],
      url: url[i],
      id: id[i],
    });
  }

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
        {dataObject.map((item, index) => (
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
