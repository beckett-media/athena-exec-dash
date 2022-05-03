import React, { useState } from "react";
import cn from "classnames";
import styles from "./Update.module.sass";
import Card from "../../components/Card";
import Table from "../../components/Table";
import { API } from "aws-amplify";

// data
import { products } from "../../mocks/products";

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
          console.log(formdata);
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
      <Card
        className={styles.card}
        classCardHead={styles.head}
        title="List of cards graded, shipped and delivered"
        classTitle={cn("title-purple", styles.title)}
      >
        <div className={styles.wrapper}>
          <Table data={data} items={products} title="date posted" setLoading={setLoading} />
        </div>
      </Card>
    </>
  );
};

export default UpdateData;
