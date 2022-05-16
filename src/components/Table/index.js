import React, { useState } from "react";
import styles from "./Table.module.sass";
import cn from "classnames";
import Checkbox from "../Checkbox";
import Loader from "../Loader";
import Row from "./Row";
import Pagination from "../Pagination/Pagination";

const Table = ({ items, title, data, setLoading }) => {
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
        <div className={styles.row}>
          <div className={styles.col}></div>
          <div className={styles.col}></div>
          <div className={styles.col}>Type</div>
          <div className={styles.col}>Received</div>
          <div className={styles.col}>Graded</div>
          <div className={styles.col}>Shipped</div>
          <div className={styles.col}>{title}</div>
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

export default Table;
