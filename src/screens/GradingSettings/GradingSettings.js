import React, { useState } from "react";
import cn from "classnames";
import styles from "./GradingSettings.module.sass";
import stylesControl from "./Control.module.sass";
import Card from "../../components/Card";
import { API } from "aws-amplify";
import NewGraderForm from "./NewGraderForm";
import GraderEntryForm from "./GraderEntryForm";
import { Box, FormLabel, Text } from "@chakra-ui/react";
import Icon from "../../components/Icon";
import Modal from "../../components/Modal";
import Schedule from "../../components/Schedule";
import moment from "moment";
import Loading from "../../components/LottieAnimation/Loading";
import useGraderEntry from "../../hooks/data/useGraderEntry";

import TablePivots from "./PivotTable";

const GraderSettings = ({ dataCI, className }) => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([0]);
  const [startDate, setStartDate] = useState(new Date());
  const [visibleModal, setVisibleModal] = useState();
  const actions = [
    {
      icon: "calendar",
      action: () => setVisibleModal(true),
    },
  ];

  const {
    graderEntry,
    isLoading: graderEntryLoading,
    isError: graderEntryError,
  } = useGraderEntry("asc");

  const startDateFormatted = moment(startDate).format("YYYY-MM-DD");
  const startWeek = findWeekStart(startDate);
  const startWeekFormatted = moment(startWeek).format("YYYY-MM-DD");
  const filteredData = graderEntry.filter(filterData);

  function filterData(i) {
    return Object.values(i).indexOf(startWeekFormatted) > -1;
  }

  function subtractDays(date, days) {
    date.setDate(date.getDate() - days);
    return date;
  }

  function findWeekStart(date) {
    const subtract = date.getDay() - 1;
    return subtractDays(date, subtract);
  }

  // console.log(startWeekFormatted);
  // console.log(dataCI);
  // console.log(filteredData);

  React.useEffect(() => {
    setLoading(true);
    (async () => {
      const apiName = "palentirApi";
      const path = `/grading-service-form`;

      API.get(apiName, path)
        .then((response) => {
          const formdata = response.data?.data;
          setData(formdata);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.response);
          setLoading(false);
        });
    })();
  }, []);

  return (
    <>
      {loading && <Loading loadingG={"loadingG"} />}
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
          <Box mb={25}>
            <FormLabel>Select Week</FormLabel>
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
          </Modal>
          <TablePivots dataCI={filteredData} />
        </div>
      </Card>
    </>
  );
};

export default GraderSettings;
