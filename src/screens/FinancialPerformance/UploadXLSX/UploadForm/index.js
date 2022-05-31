import React, { useState } from "react";
import cn from "classnames";
import styles from "./UploadFiles.module.sass";
import Card from "../../../../components/Card";
import File from "../../../../components/File";
import stylesPanel from "./Panel.module.sass";
import Icon from "../../../../components/Icon";

const UploadFormFiles = ({ className }) => {
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  const [visiblePreview, setVisiblePreview] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <Card
      className={cn(styles.card, className)}
      title="Beckett Group Budget & Financial Files Upload Fom"
      classTitle="title-blue"
    >
      <div className={styles.files}>
        <File
          className={styles.field}
          title={value ? `${value.split("\\").pop()}` : "Upload Budget.xlsx"}
          label="Beckett Group Budget.xlsx"
          tooltip="Please make sure that the file is in .xlsx format"
          value={value}
          setValue={setValue}
          accept=".xlsx"
          name={value}
        />
        <File
          className={styles.field}
          title={
            value2 ? `${value2.split("\\").pop()}` : "Upload Financials.xlsx"
          }
          label="Beckett Group Financials.xlsx"
          tooltip="Please make sure that the file is in .xlsx format"
          value={value2}
          setValue={setValue2}
          accept=".xlsx"
          name={value}
        />
        <div className={cn("panel", stylesPanel.panel)}>
          <div className={stylesPanel.info}>
            <Icon name="check-all" size="24" />
            Last saved <span>May 4, 2022 - 8:20 AM</span>
          </div>
          <div className={stylesPanel.btns}>
            <button className={cn("button", stylesPanel.button)}>
              Submit now
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UploadFormFiles;
