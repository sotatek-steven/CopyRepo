import React, { useEffect, useState } from 'react';
import { Input } from '../Input';

const TOOLTIP_NAME = 'Beginning character: Must be letter\nFollowing characters only contain: Letters, digits, (_)';

const VariableNameField = ({ updateValue, updateError }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;
    setValue(value);
    if (!value) {
      setError(false);
      return;
    }

    const match = value.match(/^[a-zA-Z_$][a-zA-Z_$0-9]*$/);
    setError(!match);
  };

  const handleVariableNameFocus = () => {
    if (value) return;
    setError(false);
  };

  const handleVariableNameFocusOut = (event) => {
    const { value } = event.target;
    if (value) return;
    setError(true);
  };

  useEffect(() => {
    updateError(value === '' ? true : error);
    if (error) return;
    updateValue(value);
  }, [value]);

  return (
    <Input
      isRequired={true}
      label="VARIABLE NAME"
      value={value}
      tooltip={TOOLTIP_NAME}
      onChange={handleChange}
      error={error}
      onFocus={handleVariableNameFocus}
      onBlur={handleVariableNameFocusOut}
    />
  );
};

export default VariableNameField;
