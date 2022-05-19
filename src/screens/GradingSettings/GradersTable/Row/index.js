import React, { useState } from "react";
import styles from "./Row.module.sass";
import ModalProduct from "../../../../components/ModalProduct";
import Icon from "../../../../components/Icon";
import Actions from "../../../../components/Actions";
import Modal from "../../../../components/Modal";
import Schedule from "../../../../components/Schedule";

const Row = ({ item, value, onChange, index, setLoading }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  const [visibleModalProduct, setVisibleModalProduct] = useState(false);
  const [visibleModalSchedule, setVisibleModalSchedule] = useState(false);
  // /athenaformdelete

  const actions = [
    // {
    //   title: "Change date",
    //   icon: "calendar",
    //   action: () => setVisibleModalSchedule(true),
    // },
    {
      title: "Edit Item",
      icon: "edit",
      action: () => setVisibleModalProduct(true),
    },
    // {
    //   title: "Delete Item",
    //   type: "delete",
    //   icon: "trash",
    //   action: () => setVisibleModalProduct(true),
    // },
  ];

  const selectedData = item?.properties;
  // const selectedValues = Object.values(selectedData);

  // console.log(item?.properties);
  // console.log(selectedValues);

  return (
    <>
      <div className={styles.row}>
        <div className={styles.col} />
        <div className={styles.col}>
          <div className={styles.item}>
            <div className={styles.details}>
              <div className={styles.date}>
                <Icon name="clock" size="20" /> {item?.properties?.date}
              </div>
            </div>
          </div>
          <Actions
            className={styles.actions}
            classActionsHead={styles.actionsHead}
            items={actions}
          />
        </div>

        <div className={styles.col}>
          <div className={styles.empty}>{item?.properties?.type}</div>
        </div>
        <div className={styles.col}>
          <div className={styles.empty}>
            {item?.properties?.cardsGradedToday}
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.empty}>
            {item?.properties?.cardsShippedToday}
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.empty}>{item?.properties?.cardsReceived}</div>
        </div>
        <div className={styles.col}>
          <div className={styles.empty}>{item?.properties?.cardsReceived}</div>
        </div>
        <div className={styles.col}>
          <div className={styles.empty}>{item?.properties?.cardsReceived}</div>
        </div>
        <div className={styles.col}>
          <div className={styles.empty}>{item?.properties?.cardsReceived}</div>
        </div>
      </div>
      <ModalProduct
        setLoading={setLoading}
        visible={visibleModalProduct}
        selectedData={selectedData}
        onClose={() => setVisibleModalProduct(false)}
      />
      <Modal
        visible={visibleModalSchedule}
        onClose={() => setVisibleModalSchedule(false)}
      >
        <Schedule
          startDate={startDate}
          setStartDate={setStartDate}
          startTime={startTime}
          setStartTime={setStartTime}
        />
      </Modal>
    </>
  );
};

export default Row;
