import React from "react";
import cn from "classnames";
import styles from "./File.module.sass";
import Icon from "../Icon";
import Tooltip from "../Tooltip";
import { Text } from "@chakra-ui/react";

const File = ({
  className,
  label,
  tooltip,
  title,
  value,
  setValue,
  name,
  placeholder,
  ...props
}) => {
  const [error, setError] = React.useState(false);

  return (
    <div className={cn(styles.file, className)}>
      {label && (
        <div className={styles.label}>
          {label}{" "}
          {tooltip && (
            <Tooltip
              className={styles.tooltip}
              title={tooltip}
              icon="info"
              place="right"
            />
          )}
        </div>
      )}
      <div className={styles.wrap}>
        <input
          className={styles.input}
          type="file"
          value={value}
          accept=".xlsx"
          name={name}
          // check if file is .xlsx format and if it is, then set value to the file name and set the file to the value
          onChange={(e) => {
            if (e.target.files[0].name.split(".").pop() === "xlsx") {
              setValue(e.target.value);
              setError(false);
            } else {
              setValue("");
              setError(true);
            }
          }}
        />
        <div className={cn(styles.box, { [styles.error]: error })}>
          <Icon name="upload" size="24" />
          {!error && <Text>{title}</Text>}
          {error && (
            <Text>Please make sure that the file is in .xlsx format</Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default File;
