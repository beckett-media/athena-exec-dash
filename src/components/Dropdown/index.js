import React, { useState } from "react";
import cn from "classnames";

import styles from "./Dropdown.module.sass";
import Tooltip from "../Tooltip";

const Dropdown = ({
  className,
  classDropdownHead,
  classDropdownLabel,
  value,
  setValue,
  options,
  label,
  tooltip,
  small,
  upBody,
  names,
  total,
}) => {
  const [visible, setVisible] = useState(false);

  const handleClick = (value) => {
    setValue(value);
    setVisible(false);
  };

  return (
    <div onOutsideClick={() => setVisible(false)}>
      {label && (
        <div className={cn(styles.label, classDropdownLabel)}>
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
      <div
        className={cn(
          styles.dropdown,
          className,
          { [styles.small]: small },
          {
            [styles.active]: visible,
          }
        )}
      >
        <div
          className={cn(styles.head, classDropdownHead)}
          onClick={() => setVisible(!visible)}
        >
          <div className={styles.selection}>
            {value === "Arcane Tinmen ApS" && (
              <div>
                {value === "Arcane Tinmen ApS" ? "Arcane Tinmen ApS" : value}
              </div>
            )}

            {value === "Beckett Collectables" && (
              <div>
                {value === "Beckett Collectables"
                  ? "Beckett Collectables"
                  : value}
              </div>
            )}
            {value === "Comic Book Certification Service LLC" && (
              <div>
                {value === "Comic Book Certification Service LLC"
                  ? "Comic Book Certification Service LLC"
                  : value}
              </div>
            )}
            {value === "Southern Hobby Distribution,LLC" && (
              <div>
                {value === "Southern Hobby Distribution,LLC"
                  ? "Southern Hobby Distribution LLC"
                  : value}
              </div>
            )}
            {value === "2026" && <div>{value === "2026" ? "2026" : value}</div>}
            {value === "2025" && <div>{value === "2025" ? "2025" : value}</div>}
            {value === "2024" && <div>{value === "2024" ? "2024" : value}</div>}
            {value === "2023" && <div>{value === "2023" ? "2023" : value}</div>}
            {value === "2022" && <div>{value === "2022" ? "2022" : value}</div>}
            {value === "2021" && <div>{value === "2021" ? "2021" : value}</div>}
            {value === "2020" && <div>{value === "2020" ? "2020" : value}</div>}
            {value === "2019" && <div>{value === "2019" ? "2019" : value}</div>}
            {value === "2018" && <div>{value === "2018" ? "2018" : value}</div>}

            {value === 20 && <div>{value === 20 ? 20 : value}</div>}
            {value === 50 && <div>{value === 50 ? 50 : value}</div>}
            {value === 80 && <div>{value === 80 ? 80 : value}</div>}
            {value === 120 && <div>{value === 120 ? 120 : value}</div>}
            {value === total && <div>{value === total ? total : value}</div>}

            {value === "All messages" && (
              <div>{value === "All messages" ? "All messages" : value}</div>
            )}
            {value === "positive posts" && (
              <div>{value === "positive posts" ? "positive posts" : value}</div>
            )}
            {value === "negative posts" && (
              <div>{value === "negative posts" ? "negative posts" : value}</div>
            )}
            {value === "neutral posts" && (
              <div>{value === "neutral posts" ? "neutral posts" : value}</div>
            )}
          </div>
        </div>
        <div className={cn(styles.body, { [styles.bodyUp]: upBody })}>
          {options.map((x, index) => (
            <div
              className={cn(styles.option, {
                [styles.selectioned]: x === value,
              })}
              onClick={() => handleClick(x, index)}
              key={index}
            >
              {x === "Arcane Tinmen ApS" && (
                <div>{x === "Arcane Tinmen ApS" ? "Arcane Tinmen ApS" : x}</div>
              )}
              {x === "Beckett Collectables" && (
                <div>
                  {x === "Beckett Collectables" ? "Beckett Collectables" : x}
                </div>
              )}
              {x === "Comic Book Certification Service LLC" && (
                <div>
                  {x === "Comic Book Certification Service LLC"
                    ? "Comic Book Certification"
                    : x}
                </div>
              )}
              {x === "Southern Hobby Distribution,LLC" && (
                <div>
                  {x === "Southern Hobby Distribution,LLC"
                    ? "Southern Hobby Distribution"
                    : x}
                </div>
              )}
              {x === "2026" && <div>{x === "2026" ? "2026" : x}</div>}
              {x === "2025" && <div>{x === "2025" ? "2025" : x}</div>}
              {x === "2024" && <div>{x === "2024" ? "2024" : x}</div>}
              {x === "2023" && <div>{x === "2023" ? "2023" : x}</div>}
              {x === "2022" && <div>{x === "2022" ? "2022" : x}</div>}
              {x === "2021" && <div>{x === "2021" ? "2021" : x}</div>}
              {x === "2020" && <div>{x === "2020" ? "2020" : x}</div>}
              {x === "2019" && <div>{x === "2019" ? "2019" : x}</div>}
              {x === "2018" && <div>{x === "2018" ? "2018" : x}</div>}
              {x === 20 && <div>{x === 20 ? 20 : x}</div>}
              {x === 50 && <div>{x === 50 ? 50 : x}</div>}
              {x === 80 && <div>{x === 80 ? 80 : x}</div>}
              {x === 120 && <div>{x === 120 ? 120 : x}</div>}
              {x === total && <div>{x === total ? total : x}</div>}

              {/* social media */}
              {x === "All messages" && (
                <div>{x === "All messages" ? "All messages" : x}</div>
              )}
              {x === "positive posts" && (
                <div>{x === "positive posts" ? "positive posts" : x}</div>
              )}
              {x === "negative posts" && (
                <div>{x === "negative posts" ? "negative posts" : x}</div>
              )}
              {x === "neutral posts" && (
                <div>{x === "neutral posts" ? "neutral posts" : value}</div>
              )}
              {/* Account type */}
              {x === "Cash_and_Cash_Equivalents" && <div>{x}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
// [

//   "Accounts_Receivable_>_90_days",
//   "Net_Working_Capital",
//   "Capital_Expenditures",
//   "Other_Assets",
//   "Seller_Agreements",
//   "Other_Long_Term_Liabilities",
//   "Preferred_Equity",
//   "Accrued_Interest",
//   "Intercompany_Loans",
//   "Intercompany_Receivable",
//   "Long_Term_Investments",
//   "Intercompany_Payable",
//   "Long-Term_Capital_Lease",
//   "Dividend_Payable",
//   "Other_Equity",
// ];
