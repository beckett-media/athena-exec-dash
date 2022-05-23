import React, { useState } from "react";
import styles from "./Row.module.sass";
import cn from "classnames";

import { numberWithCommas } from "../../../../../utils.js";

const Row = ({ item }) => {
  // console.log(item);
  return (
    <>
      <div className={styles.row}>
        <div className={styles.col} />
        <div className={styles.col}>
          <div className={styles.item}>
            <div className={styles.preview}>
              <img src={item.image} alt="Ticker-Price-product" />
            </div>
            <div className={styles.details}>
              <div className={styles.product}>{item.title}</div>
              <div className={styles.wrap}>
                <div className={styles.category}>{item.title}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>Status</div>
          {item.starting_bid ? (
            <div className={cn("status-green", styles.status)}>Active</div>
          ) : (
            <div className={cn("status-red", styles.status)}>Ended</div>
          )}
        </div>
        <div className={styles.col}>${item.current_bid}</div>
        <div className={styles.col}>
          <div className={styles.label}>Closing Price</div>
          <div className={styles.sales}>
            <div className={styles.number}>
              ${numberWithCommas(item.starting_bid)}
            </div>
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>Bids</div>
          <div className={styles.box}>
            <div className={styles.number}>{item.bid_count}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Row;
