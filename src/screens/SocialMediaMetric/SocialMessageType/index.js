import React, { useState } from "react";
import cn from "classnames";

import styles from "./List.module.sass";
import Card from "../../../components/Card";
import Item from "./Item";

import { API } from "aws-amplify";
import Dropdown from "../../../components/Dropdown";
import { Text } from "@chakra-ui/react";
import moment from "moment";

const SocialMessagesType = ({ className, onOpen, sentimentType }) => {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState("filter by dates");
  const [dataByDate, setDataByDate] = useState([]);
  const intervals = [];
  function getData() {
    const apiName = "palentirApi";
    const path = "/socialmedia/messages";

    return API.get(apiName, path);
  }

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

  React.useEffect(() => {
    (async function () {
      const response = await getData();

      setData(response);
    })();
  }, []);

  // //useMemo to get data based on date interval selected
  React.useEffect(() => {
    const uniqueDatetime = [
      ...new Set(filterData.map((item) => item?.datetime)),
    ];
    uniqueDatetime.forEach((item) => {
      intervals.push(item);
    });
  }, [filterData]);

  const filterData = [];
  const filterDataByDate = [];

  // fliter function to get data based on sentiment type
  dataObject.forEach((item) => {
    if (item?.sentiment === sentimentType) {
      filterData.push(item);
    }
  });

  return (
    <>
      <Dropdown
        className={styles.dropdown}
        classDropdownHead={styles.dropdownHead}
        value={sorting}
        setValue={setSorting}
        // set intevals to string as month day
        options={intervals}
      />
      <Card
        className={cn(styles.card, className)}
        classCardHead={styles.cardHead}
      >
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
    </>
  );
};

export default SocialMessagesType;
