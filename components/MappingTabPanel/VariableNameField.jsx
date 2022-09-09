import React from 'react';
import { Input } from '../Input';
import useMappingData from './useMappingData';

const TOOLTIP_NAME = 'Beginning character: Must be letter\nFollowing characters only contain: Letters, digits, (_)';

const VariableNameField = ({ id }) => {
  const [data, updateData] = useMappingData(id);

  const handleChange = (event) => {
    const value = event.target.value.trim();
    updateData({ label: value });
  };

  const handleVariableNameFocus = () => {
    // TODO
  };

  const handleVariableNameFocusOut = () => {
    // TODO
  };

  return (
    <Input
      isRequired={true}
      label="VARIABLE_NAME"
      value={data?.label}
      tooltip={TOOLTIP_NAME}
      onChange={handleChange}
      error={data?.error}
      onFocus={handleVariableNameFocus}
      onBlur={handleVariableNameFocusOut}
      errorText={data?.errorText}
    />
  );
};

export default VariableNameField;
