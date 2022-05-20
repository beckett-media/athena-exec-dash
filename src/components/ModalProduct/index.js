import React, { useCallback, useEffect } from "react";
import cn from "classnames";
import { createPortal } from "react-dom";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import styles from "./ModalProduct.module.sass";
import CardsData from "./CardsData";

const ModalProduct = ({ visible, onClose, selectedData, setLoading }) => {
  useEffect(() => {
    if (visible) {
      const target = document.querySelector("#modal-product");
      disableBodyScroll(target);
    } else {
      clearAllBodyScrollLocks();
    }
  }, [visible]);

  return createPortal(
    visible && (
      <div id="modal-product" className={styles.modal}>
        <div className={styles.control}>
          <div className={cn("button-white", styles.button)} onClick={onClose}>
            Close
          </div>
        </div>
        <div className={styles.outer}>
          <CardsData
            selectedData={selectedData}
            onClose={onClose}
            setLoading={setLoading}
          />
        </div>
      </div>
    ),
    document.body
  );
};

export default ModalProduct;
