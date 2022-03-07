import React, { useEffect, useState } from "react";
import styles from "./Market.module.sass";
import Row from "./Row";

import Pagination from "../../../../components/Pagination/Pagination";

const PagesURL = ({ items }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    setData(items);
  }, [items]);

  const indexOfLastPage = currentPage * itemsPerPage;
  const indexOfFistPage = indexOfLastPage - itemsPerPage;
  const currentPageItems = data?.slice(indexOfFistPage, indexOfLastPage);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // item selected
  const handleItemSelected = (item) => {
    return item;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.market}>
        <div className={styles.table}>
          <div className={styles.row}>
            <div className={styles.col} /> {/* empty for space */}
            <div className={styles.col}>Page Title</div>
            <div className={styles.col}>Views</div>
            <div className={styles.col}>Year</div>
          </div>

          {currentPageItems?.map((row, id) => (
            <Row item={row} key={id} up={items?.length - id <= 2} />
          ))}
        </div>
      </div>
      <div className={styles.foot}>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalPages={data.length}
          paginate={paginate}
          itemSelected={handleItemSelected}
        />
      </div>
    </>
  );
};

export default PagesURL;
