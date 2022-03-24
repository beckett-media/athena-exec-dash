import React, { useState } from "react";
import styles from "./Products.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import Market from "./Market";

// data

import { market } from "../../../mocks/market";
import data from "../../../mocks/comic-data";

const Products = () => {
  return (
    <Card
      className={styles.card}
      title="Ticker Price"
      classTitle={cn("title-purple", styles.title)}
      classCardHead={styles.head}
    >
      <div className={styles.products}>
        <div className={styles.wrapper}>
          <Market items={data} />
        </div>
      </div>
    </Card>
  );
};

export default Products;
