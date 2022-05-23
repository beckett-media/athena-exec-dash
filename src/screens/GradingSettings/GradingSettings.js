import React, { useState } from "react";
import cn from "classnames";
import styles from "./GradingSettings.module.sass";
import stylesControl from "./Control.module.sass";
import Card from "../../components/Card";
// import GradersTable from "./GradersTable";
import { API } from "aws-amplify";
import NewGraderForm from "./NewGraderForm";
import GraderEntryForm from "./GraderEntryForm";
import { Box, FormLabel, Text } from "@chakra-ui/react";
import Icon from "../../components/Icon";
import Modal from "../../components/Modal";
import Schedule from "../../components/Schedule";

import TablePivots from "./PivotTable";

const GraderSettings = ({ dataCI, className }) => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([0]);
  const [startDate, setStartDate] = useState();
  const [visibleModal, setVisibleModal] = useState();
  const actions = [
    {
      icon: "calendar",
      action: () => setVisibleModal(true),
    },
  ];

  const startDateFormatted = {};

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
          {/* <Box mb={25}>
            <FormLabel>Select Date</FormLabel>
            <div className={cn(stylesControl.control, className)}>
              {actions.map((x, index) => (
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    width: "20%",
                  }}
                  key={index}
                  onClick={x.action}
                >
                  <Icon fill={"#33383F"} name={x.icon} size="36" />
                  <Text ml={5}>{startDateFormatted}</Text>
                </button>
              ))}
            </div>
          </Box>
          <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
            <Schedule startDate={startDate} setStartDate={setStartDate} />
          </Modal> */}
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
