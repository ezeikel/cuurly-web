import { useState, useEffect } from "react";
import { components, ControlProps } from "react-select";
import AsyncSelect from "react-select/async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { customStyles } from "./SearchDropdown.styled";

type SearchDropdownProps = {
  placeholder?: string;
  defaultValue?: { label: string; value: string };
  handleChange?: (option?: { label: string; value: string }) => void;
  noOptionsMessage?: string;
  loadOptions: (inputValue: string) => Promise<any>;
  label?: string;
  instanceId?: string;
  className?: string;
  isLoading?: boolean;
};

const Control = ({ children, ...props }: ControlProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <components.Control {...props}>
    <FontAwesomeIcon
      icon={["fal", "magnifying-glass"]}
      color="#333"
      size="1x"
      className="mr-2"
    />
    {children}
  </components.Control>
);

const SearchDropdown = ({
  placeholder,
  defaultValue,
  handleChange,
  noOptionsMessage,
  loadOptions,
  label,
  instanceId,
  className,
  isLoading,
}: SearchDropdownProps) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  useEffect(() => {
    setSelectedOption(defaultValue);
  }, [defaultValue]);

  return (
    <div className={className}>
      {label ? (
        <label
          htmlFor={`react-select-${instanceId}-input`}
          className="mb-2.5 flex text-sm font-medium text-gray-800"
        >
          {label}
        </label>
      ) : null}
      <AsyncSelect
        value={selectedOption}
        styles={customStyles}
        placeholder={placeholder}
        // TODO: should be able to use an Option type from react-select instead of object
        onChange={(option: { label: string; value: string }) => {
          setSelectedOption(option);

          // optional prop from parent to handle any extra actions needed
          if (handleChange) {
            handleChange(option);
          }
        }}
        components={{
          Control,
        }}
        loadOptions={loadOptions}
        noOptionsMessage={() => noOptionsMessage}
        defaultOptions
        instanceId={instanceId}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SearchDropdown;
