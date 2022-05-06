import React, { useState } from "react";
import styles from "./Table.module.sass";
import cn from "classnames";
import Checkbox from "../Checkbox";
import Loader from "../Loader";
import Row from "./Row";

const Table = ({ items, title, data,setLoading }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
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
        {data.map((x, index) => (
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
    </div>
  );
};

export default Table;
