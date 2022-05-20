import React, { useState } from "react";
import cn from "classnames";
import styles from "./GradingSettings.module.sass";
import Card from "../../components/Card";
// import GradersTable from "./GradersTable";
import { API } from "aws-amplify";
import NewGraderForm from "./NewGraderForm";
import GraderEntryForm from "./GraderEntryForm";
import { Box } from "@chakra-ui/react";
import TablePivots from "./PivotTable";

const GraderSettings = ({ dataCI }) => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([0]);

  console.log(dataCI);

  React.useEffect(() => {
    setLoading(true);
    (async () => {
      const apiName = "palentirApi";
      const path = `/grading-service-form`;

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

  console.log(data);

  return (
    <>
      <NewGraderForm setLoading={setLoading} />
      <Box mt={12} />
      <GraderEntryForm setLoading={setLoading} />
      <Box mt={12} />
      <Card
        className={styles.card}
        classCardHead={styles.head}
        title="Cards Graded Per Day"
        classTitle={cn("title-purple", styles.title)}
      >
        <div className={styles.wrapper}>
          <TablePivots dataCI={dataCI} />
          {/* <GradersTable
            data={data}
            title="date selected"
            setLoading={setLoading}
          /> */}
        </div>
      </Card>
    </>
  );
};

export default GraderSettings;
