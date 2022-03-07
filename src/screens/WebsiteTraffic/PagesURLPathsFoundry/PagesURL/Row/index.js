import React from "react";
import styles from "./Row.module.sass";

import { numberWithCommas } from "../../../../../utils.js";

const Row = ({ item }) => {
  return (
    <>
      <div className={styles.row}>
        <div className={styles.col} />
        <div className={styles.col}>
          <div className={styles.item}>
            <div className={styles.details}>
              <div className={styles.wrap}>
                <div className={styles.category}>{item?.pageTitle}</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.col}>
          {numberWithCommas(item?.numberOfUsers)}
        </div>
        <div className={styles.col}>
          <div className={styles.sales}>
            <div className={styles.number}>{item?.date}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Row;
