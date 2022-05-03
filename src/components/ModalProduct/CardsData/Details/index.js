import React, { useState } from "react";
import cn from "classnames";
import styles from "./Details.module.sass";
import Icon from "../../../Icon";
import Overview from "./Overview";

const Details = ({
  className,
  setValue,
  activeIndex,
  setActiveIndex,
  selectedData,
  onClose,
  setLoading
}) => {
  return (
    <div className={cn(styles.details, className)}>
      <Overview selectedData={selectedData} onClose={onClose} setLoading={setLoading} />
    </div>
  );
};

export default Details;
