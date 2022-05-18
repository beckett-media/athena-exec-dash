import React, { useState } from "react";
import styles from "./Table.module.sass";
import cn from "classnames";
import Checkbox from "../../../components/Checkbox";
import Loader from "../../../components/Loader";
import Row from "./Row";
import Pagination from "../../../components/Pagination/Pagination";
import { Box, FormLabel } from "@chakra-ui/react";
import Modal from "../../../components/Modal";
import Schedule from "../../../components/Schedule";
import Icon from "../../../components/Icon";
import Text from "../../../components/Text";

const GradersTable = ({ items, title, data, setLoading }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  const indexOfLastPage = currentPage * itemsPerPage;
  const indexOfFistPage = indexOfLastPage - itemsPerPage;
  const currentPageItems = data?.slice(indexOfFistPage, indexOfLastPage);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemSelected = (item) => {
    return item;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.table}>
        <Box mb={25}>
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
        </Modal>
        <div className={styles.row}>
          <div className={styles.col}></div>
          <div className={styles.col}></div>
          <div className={styles.col}>Grader</div>
          <div className={styles.col}>Monday</div>
          <div className={styles.col}>Tuesday</div>
          <div className={styles.col}>Wednesday</div>
          <div className={styles.col}>Thursday</div>
          <div className={styles.col}>Friday</div>
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
