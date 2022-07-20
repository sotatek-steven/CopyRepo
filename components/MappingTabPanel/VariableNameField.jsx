import { REGEX } from '@/config/constant/regex';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '../Input';
import useMappingData from './useMappingData';

const TOOLTIP_NAME = 'Beginning character: Must be letter\nFollowing characters only contain: Letters, digits, (_)';
const regex = new RegExp(REGEX.VARIABLE_NAME);

const VariableNameField = ({ id, updateError }) => {
  const [data, updateData] = useMappingData(id);
  const [error, setError] = useState(false);

  const {
    variables: { mappings },
  } = useSelector((state) => state.userModule);

  const value = data?.label || '';

  const handleChange = (event) => {
    const value = event.target.value.trim();
    updateData({ label: value });
    if (!value) {
      setError(false);
      return;
    }

    const match = regex.test(value);
    if (!match) {
      setError(true);
      return;
    }

    const duplicate = mappings.some((item) => {
      const { id: _id, label } = item;
      return _id !== id && label === value;
    });
    setError(duplicate);
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
    updateData({ label: value });
  }, [value]);

  return (
    <Input
      isRequired={true}
      label="VARIABLE_NAME"
      value={value}
      tooltip={TOOLTIP_NAME}
      onChange={handleChange}
      error={error}
      onFocus={handleVariableNameFocus}
      onBlur={handleVariableNameFocusOut}
      errorText={error ? 'Invalid variable name' : ''}
    />
  );
};

export default VariableNameField;
