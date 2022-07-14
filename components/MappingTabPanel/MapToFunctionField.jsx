import React, { useEffect, useState } from 'react';
import SelectComponent from '../Select';

const MapToFunctionField = ({ options, updateFunctions }) => {
  const [value, setValue] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setValue(value);
  };

  useEffect(() => {
    if (!updateFunctions) return;
    updateFunctions(value);
  }, [value]);

  return (
    <SelectComponent
      multiple={true}
      label="MAP_TO_FUNCTION"
      options={options || []}
      value={value}
      onChange={handleChange}
    />
  );
};

export default MapToFunctionField;
