import { REGEX } from '@/config/constant/regex';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '../Input';
const regex = new RegExp(REGEX.VARIABLE_NAME);

const NameField = ({ value, setValue, setFormError }) => {
  const functionState = useSelector((state) => state.userFunction);
  const { functions } = useSelector((state) => state.functions);
  const { variables: stateVariables } = useSelector((state) => state.userModule);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const functionInfo = (data) => {
    return `${data.name}-${(data.params || []).map((p) => p.type).join('-')}`;
  };

  const checkExistingIdentifier = (functionName) => {
    const { mappings, structs, values } = stateVariables;
    let names = [];
    mappings.forEach((items) => {
      names.push(items.label);
    });

    structs.forEach((items) => {
      names.push(items.label);
    });

    values.forEach((items) => {
      names.push(items.label);
    });

    return names.find((name) => name === functionName);
  };

  const handleNameChange = (e) => {
    const value = e.target.value.trim();
    setValue(value);
    if (!value) {
      setError(false);
      setErrorMessage('');
      setFormError(true);
      return;
    }

    const match = regex.test(value);
    if (!match) {
      setError(true);
      setErrorMessage('Invalid function name');
      setFormError(true);
      return;
    }

    if (checkExistingIdentifier(value)) {
      setError(true);
      setErrorMessage('Identifier already declared');
      setFormError(true);
      return;
    }

    setError(false);
    setErrorMessage('');
    setFormError(false);
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

  useEffect(() => {
    const checkExistingFunction = () => {
      const currentFunction = functionInfo(functionState);
      if (!functions) return false;
      return functions.find((item) => item.key === currentFunction);
    };

    if (checkExistingFunction()) {
      setError(true);
      setErrorMessage('Found an existing function with the same name and list params');
      setFormError(true);
      return;
    }

    if (errorMessage !== 'Found an existing function with the same name and list params') return;
    setError(false);
    setErrorMessage('');
    setFormError(false);
  }, [functionState.name, functionState.params]);

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
