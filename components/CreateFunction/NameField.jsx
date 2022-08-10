import { REGEX } from '@/config/constant/regex';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '../Input';
const regex = new RegExp(REGEX.VARIABLE_NAME);

const NameField = ({ value, setValue }) => {
  const moduleState = useSelector((state) => state.userModule);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const checkExistingFunction = (functionName) => {
    const functions = moduleState.sources.functions;
    if (!functions) return false;
    return functions.find((item) => item.name === functionName);
  };

  const handleNameChange = (e) => {
    const value = e.target.value.trim();
    setValue(value);
    if (!value) {
      setError(false);
      setErrorMessage('');
      return;
    }

    const match = regex.test(value);
    if (!match) {
      setError(true);
      setErrorMessage('Invalid function name');
      return;
    }

    if (checkExistingFunction(value)) {
      setError(true);
      setErrorMessage('Found an existing function with the same name');
      return;
    }

    setError(false);
    setErrorMessage('');
  };

  const handleVariableNameFocus = () => {
    if (value) return;
    setError(false);
    setErrorMessage('');
  };

  const handleVariableNameFocusOut = (event) => {
    const { value } = event.target;
    if (value) return;
    setError(true);
    setErrorMessage('This field is required');
  };

  return (
    <Input
      value={value}
      onChange={handleNameChange}
      error={error}
      errorText={errorMessage}
      onFocus={handleVariableNameFocus}
      onBlur={handleVariableNameFocusOut}
    />
  );
};

export default NameField;
