import React, { useState } from "react";
import styles from "./Row.module.sass";
import ModalProduct from "../../ModalProduct";
import Icon from "../../Icon";
import Actions from "../../Actions";
import Modal from "../../Modal";
import Schedule from "../../Schedule";


const Row = ({ item, value, onChange, index, setLoading}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  const [visibleModalProduct, setVisibleModalProduct] = useState(false);
  const [visibleModalSchedule, setVisibleModalSchedule] = useState(false);

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
    //   icon: "trash",
    //   action: () => console.log("Delete forever"),
    // },
  ];

  const selectedData = item?.properties;

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
          {item?.properties?.type > 0 ? (
            <div className={styles.price}>{item?.properties?.type}</div>
          ) : (
            <div className={styles.empty}>{item?.properties?.type}</div>
          )}
        </div>
        <div className={styles.col}>
          {item?.properties?.cardsReceived < 0 ? (
            <div className={styles.price}>
              {item?.properties?.cardsReceived}
            </div>
          ) : (
            <div className={styles.empty}>
              {item?.properties?.cardsReceived}
            </div>
          )}
        </div>
        <div className={styles.col}>
          {item?.properties?.cardsGradedToday < 0 ? (
            <div className={styles.price}>
              {item?.properties?.cardsGradedToday}
            </div>
          ) : (
            <div className={styles.empty}>
              {item?.properties?.cardsGradedToday}
            </div>
          )}
        </div>
        <div className={styles.col}>
          {item?.properties?.cardsShippedToday < 0 ? (
            <div className={styles.price}>
              {item?.properties?.cardsShippedToday}
            </div>
          ) : (
            <div className={styles.empty}>
              {item?.properties?.cardsShippedToday}
            </div>
          )}
        </div>
        <div className={styles.col}>{item?.properties?.date}</div>
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
