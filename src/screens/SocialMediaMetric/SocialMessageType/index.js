import React, { useState } from "react";
import cn from "classnames";

import styles from "./List.module.sass";
import Card from "../../../components/Card";
import Item from "./Item";

import { API } from "aws-amplify";

const SocialMessagesType = ({ className, onOpen, sentimentType }) => {
  const [data, setData] = useState([]);

  function getData() {
    const apiName = "palentirApi";
    const path = "/socialmedia/messages";

    return API.get(apiName, path);
  }

  React.useEffect(() => {
    (async function () {
      const response = await getData();
      setData(response);
    })();
  }, []);

  const dataQuery = data?.data;

  const username = [];
  const datetime = [];
  const message = [];
  const avatar = [];
  const platform = [];
  const sentiment = [];
  const url = [];
  const id = [];

  if (dataQuery) {
    dataQuery.forEach((item) => {
      username.push(item.username);
      datetime.push(item.datetime);
      message.push(item.message);
      avatar.push(item.avatar);
      platform.push(item.platform);
      sentiment.push(item.sentiment);
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
      sentiment: sentiment[i],
      url: url[i],
      id: id[i],
    });
  }

  const filterData = [];

  // fliter function to get data based on sentiment type
  dataObject.forEach((item) => {
    if (item.sentiment === sentimentType) {
      filterData.push(item);
    }
  });

  return (
    <Card className={cn(styles.card, className)} classCardHead={styles.head}>
      {/** make the div scrolable   */}
      <div
        className={styles.notifications}
        style={{
          overflowY: "scroll",
          overflowX: "hidden",
          height: "100vh",
        }}
      >
        {filterData.map((item, index) => (
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

export default SocialMessagesType;
