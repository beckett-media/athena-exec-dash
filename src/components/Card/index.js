import React from "react";
import cn from "classnames";
import styles from "./Card.module.sass";

const Card = ({
  className,
  title,
  classTitle,
  classCardHead,
  head,
  description,
  children,
}) => {
  return (
    <div className={cn(styles.card, className)}>
      {title && (
        <div className={cn(styles.head, classCardHead)}>
          <div className={cn(classTitle, styles.title)}>{title}</div>
          {head && head}
        </div>
      )}
      {description && (
        <div>
          <div
            style={{
              marginBottom: "40px",
              marginVertical: "1.4rem",
              marginLeft: "2rem",
              paddingRight: "1rem",
              fontSize: "0.8rem",
              textDecorationStyle: "dotted",
              color: "#828282",
          
              paddingVertical: 5,
            }}
          >
            {description}
          </div>
          {head && head}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
