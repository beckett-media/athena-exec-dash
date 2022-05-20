import React, { useState } from "react";
import styles from "./Table.module.sass";
import cn from "classnames";
import Checkbox from "../../../components/Checkbox";
import Loader from "../../../components/Loader";
import Row from "./Row";
import Pagination from "../../../components/Pagination/Pagination";
import { Text, Box, FormLabel } from "@chakra-ui/react";
import Modal from "../../../components/Modal";
import Schedule from "../../../components/Schedule";
import Icon from "../../../components/Icon";
import moment from "moment";
import stylesControl from "./Control.module.sass";

const GradersTable = ({ items, title, data, setLoading, className }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [startDate, setStartDate] = useState(new Date());
  const [visibleModal, setVisibleModal] = useState(false);
  const actions = [
    {
      icon: "calendar",
      action: () => setVisibleModal(true),
    },
  ];
  const startDateFormatted = moment(startDate).format("YYYY-MM-DD");

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  React.useEffect(() => {
    (async () => {
      const apiName = "palentirApi";
      const path = "/servicelevel";
      API.get(apiName, path)
        .then((response) => {
          const formdata = response.data?.data;

          const filteredFormDataByDay = formdata.filter(
            (data) =>
              data.properties.date === moment(startDate).format("YYYY-MM-DD")
          );
          if (filteredFormDataByDay[0]) {
            setSelectedDayServiceLevel(filteredFormDataByDay[0]);
          } else {
            setSelectedDayServiceLevel(startingSelectedDayObj);
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    })();

    // setTwoDay("");
    // setFiveDay("");
    // setTenDay("");
    // setThirtyDay("");
    // setVerified("");
    // setRevenueShipped("");
    // setRecase("");
    // setCardsGradedToday("");
    // setCardsShippedToday("");
    // setCardsReceived("");
  }, [startDate]);

  const indexOfLastPage = currentPage * itemsPerPage;
  const indexOfFistPage = indexOfLastPage - itemsPerPage;
  const currentPageItems = data?.slice(indexOfFistPage, indexOfLastPage);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemSelected = (item) => {
    return item;
  };

  console.log(startDateFormatted);

  return (
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
                width: "100%",
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
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.col}></div>
          <div className={styles.col}></div>
          <div className={styles.col}>Grader</div>
          <div className={styles.col}>Monday</div>
          <div className={styles.col}>Tuesday</div>
          <div className={styles.col}>Wednesday</div>
          <div className={styles.col}>Thursday</div>
          <div className={styles.col}>Friday</div>
          <div className={styles.col}>Includes Saturday</div>
        </div>
        {currentPageItems?.map((x, index) => (
          <Row
            setLoading={setLoading}
            item={x}
            key={index}
            index={index}
            value={selectedFilters.includes(x.id)}
            onChange={() => handleChange(x.id)}
          />
        ))}
        <div className={cn(styles.tab_row)}>
          <div className={styles.tab_col}></div>
          <div className={styles.tab_col}></div>
          <div className={cn(styles.tab_col, styles.row_special)}>TOTAL</div>
          <div className={cn(styles.tab_col, styles.row_special)}>
            <div className={styles.empty}>test</div>
          </div>
          <div className={cn(styles.tab_col, styles.row_special)}>
            <div className={styles.empty}>test</div>
          </div>
          <div className={cn(styles.tab_col, styles.row_special)}>
            <div className={styles.empty}>test</div>
          </div>
          <div className={cn(styles.tab_col, styles.row_special)}>
            <div className={styles.empty}>test</div>
          </div>
          <div className={cn(styles.tab_col, styles.row_special)}>
            <div className={styles.empty}>test</div>
          </div>
          <div className={styles.tab_col}>
            <div className={styles.empty}></div>
          </div>
        </div>
      </div>
      <div className={styles.pagination}>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalPages={data.length}
          paginate={paginate}
          itemSelected={handleItemSelected}
        />
      </div>
    </div>
  );
};

export default GradersTable;
