/* eslint-disable import/prefer-default-export */

export const customStyles = {
  indicatorsContainer: (provided) => ({
    ...provided,
    display: "none",
  }),
  control: (provided) => ({
    ...provided,
    padding: "8px 12px",
  }),
  input: (provided) => ({
    ...provided,
    // display: "flex",
    padding: 0,
    margin: 0,
  }),
  placeholder: (provided) => ({
    ...provided,
    margin: 0,
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    margin: 0,
    display: state.selectProps.menuIsOpen ? "none" : "block",
  }),
};
