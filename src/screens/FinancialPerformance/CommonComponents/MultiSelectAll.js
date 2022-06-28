import React, { useState, useEffect } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import "./react-select-styles.css";

const MultiSelectAll = ({ options, setValue, placeholderButtonLabel, defaultValue }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setSelectedOptions([{ label: "All", value: "*" }, ...options]);
  }, []);

  function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
    if (value && value.some((o) => o.value === "*")) {
      return `${placeholderButtonLabel}: All`;
    } else {
      return `${placeholderButtonLabel}: ${value.length} selected`;
    }
  }

  function onChange(value, event) {
    if (event.action === "select-option" && event.option.value === "*") {
      this.setState(this.options);
      setValue(this.options);
    } else if (
      event.action === "deselect-option" &&
      event.option.value === "*"
    ) {
      //deselect all
      this.setState([]);
      setValue(this.options);
    } else if (event.action === "deselect-option") {
      this.setState(value.filter((o) => o.value !== "*"));
      setValue(value);
    } else if (value.length === this.options.length - 1) {
      this.setState(this.options);
      setValue(value);
    } else {
      this.setState(value);
      setValue(value);
    }
  }

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      color: state.selectProps.menuColor,
      padding: 5,
      fontSize: 13,
      backgroundColor: "#1A202C",
    }),

    dropdownButton: (provided, state) => ({
      ...provided,
      width: "200px",
      border: "1px solid #ccc",
      backgroundColor: "#2D3748 !important",
      color: "#ccc",
      fontWeight: "500",
      padding: 10,
    }),

    control: (_, { selectProps: { width } }) => ({
      width: width,
    }),

    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isFocused ? "black" : "white",
      padding: 5,
      fontWeight: "normal",
      textAlign: "left",
      backgroundColor: state.isSelected ? "#4D5E7A" : "#2D3748",
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      return { ...provided, opacity, transition };
    },
  };

  return (
    <ReactMultiSelectCheckboxes
      styles={customStyles}
      options={[{ label: "All", value: "*" }, ...options]}
      placeholderButtonLabel={placeholderButtonLabel}
      getDropdownButtonLabel={getDropdownButtonLabel}
      value={selectedOptions}
      onChange={onChange}
      setState={setSelectedOptions}
      defaultValue={defaultValue}
      // className={'react-select-container'}
      // classNamePrefix={"react-select"}
    />
  );
};

export default MultiSelectAll;
