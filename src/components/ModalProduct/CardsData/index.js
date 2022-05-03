import React, { useState } from "react";
import styles from "./Product.module.sass";
import cn from "classnames";
import Details from "./Details";


const CardsData = ({selectedData, onClose, setLoading}) => {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={cn(styles.product, { [styles.active]: visible })}>
      <Details
      setLoading={setLoading}
        className={styles.details}
        setValue={setVisible}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        selectedData={selectedData}
        onClose={onClose}

      />
    </div>
  );
};

export default CardsData;
