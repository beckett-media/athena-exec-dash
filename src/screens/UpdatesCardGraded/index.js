import React, { useState } from "react";
import cn from "classnames";
import styles from "./Update.module.sass";
import Card from "../../components/Card";
import Table from "../../components/Table";
import { API } from "aws-amplify";
import CardForm from "./CardForm";
import { Box } from "@chakra-ui/react";

const UpdateData = () => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([0]);

  React.useEffect(() => {
    setLoading(true);
    (async () => {
      const apiName = "palentirApi";
      const path = `/timeserie`;

      API.get(apiName, path)
        .then((response) => {
          const formdata = response.data?.data;
          setData(formdata);
        })
        .catch((error) => {
          console.log(error.response);
        });
    })();
    setLoading(false);
  }, [loading]);

  return (
    <>
      <CardForm setLoading={setLoading} />
      <Box mt={12} />
      <Card
        className={styles.card}
        classCardHead={styles.head}
        title="Daily Records of Cards Received, Graded, and Shipped"
        classTitle={cn("title-purple", styles.title)}
      >
        <div className={styles.wrapper}>
          <Table data={data} title="date posted" setLoading={setLoading} />
        </div>
        <div className={styles.wrapper}>
          <Table data={data} title="date posted" setLoading={setLoading} />
        </div>
      </Card>
    </>
  );
};

export default UpdateData;
