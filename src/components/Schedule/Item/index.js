import React from "react";
import styles from "./Item.module.sass";
import cn from "classnames";

import Icon from "../../Icon";

const Item = ({
  className,
  category,
  value,
  icon,
  children,
  visible,
  setVisible,
}) => {
  return (
    <div className={cn(styles.item, className, { [styles.active]: visible })}>
      <div className={styles.head} onClick={() => setVisible(!visible)}>
        <Icon name={icon} size="24" />
        <div className={styles.details}>
          <div className={styles.category}>{category}</div>
          <div className={styles.value}>{value}</div>
        </div>
      </div>
      <div className={styles.body}>
        <div onOutsideClick={() => setVisible(false)}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Item;
