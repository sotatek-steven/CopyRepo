import { REGEX } from '@/config/constant/regex';
import { InputAdornment, styled, TextField, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
const regex = new RegExp(REGEX.VARIABLE_NAME);

const InputBasic = styled(TextField)(({ theme, error }) => ({
  backgroundColor: theme.palette.background.light,
  color: theme.palette.text.primary,
  borderRadius: 5,
  width: '100%',
  fontSize: 14,
  fontWeight: theme.typography.fontWeightBold,
  fontFamily: theme.typography.fontFamily,
  '& .MuiOutlinedInput-root': {
    paddingLeft: '0px!important',
  },
  border: 'none',
  outline: 'none',
  '& input': {
    padding: 10,
  },
  '& fieldset': {
    border: error ? '' : 'none',
    height: 48,
  },
}));

const Error = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: 14,
  marginTop: 8,
}));

const Container = styled('div')({
  position: 'relative',
});

const TooltipWrapper = styled('div')(({ theme, focus, error }) => ({
  position: 'absolute',
  top: '-15px',
  right: 0,
  zIndex: 10,
  color: error ? theme.palette.error.main : focus ? theme.palette.primary.main : theme.palette.text.primary,
}));

const TOOLTIP_NAME = 'Beginning character: Must be letter\nFollowing characters only contain: Letters, digits, (_)';

const ParameterName = ({ value, setValue, setFormError }) => {
  const moduleState = useSelector((state) => state.userModule);
  const functionState = useSelector((state) => state.userFunction);
  const { variables: stateVariables } = useSelector((state) => state.userModule);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [onFocus, setOnFocus] = useState(false);

  const checkExistingFunction = (functionName) => {
    if (functionState.name === functionName) return true;
    const functions = moduleState.sources.functions;
    if (!functions) return false;
    return functions.find((item) => item.name === functionName);
  };

  const checkExistingParameter = (parameterName) => {
    const { parameters } = functionState;
    if (!parameters) return false;
    return parameters.find((item) => item.name === parameterName);
  };

  const checkExistingIdentifier = (parameterName) => {
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

    return names.find((name) => name === parameterName);
  };

  const validateParameterName = (value) => {
    if (!value) {
      setError(false);
      setErrorMessage('');
      setFormError(true);
      return;
    }

    const match = regex.test(value);
    if (!match) {
      setError(true);
      setErrorMessage('Invalid declaration');
      setFormError(true);
      return;
    }

    if (checkExistingFunction(value)) {
      setError(true);
      setErrorMessage('Found an existing function with the same name');
      setFormError(true);
      return;
    }

    if (checkExistingParameter(value)) {
      setError(true);
      setErrorMessage('Found an existing parameter with the same name');
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

  const handleNameChange = (e) => {
    const value = e.target.value.trim();
    setValue(value);
    validateParameterName(value);
  };

  const handleVariableNameFocus = () => {
    setOnFocus(true);
    if (value) return;
    setError(false);
    setErrorMessage('');
  };

  const handleVariableNameFocusOut = (event) => {
    setOnFocus(false);
    const { value } = event.target;
    if (value) return;
    setError(true);
    setErrorMessage('This field is required');
  };

  useEffect(() => {
    validateParameterName(value);
  }, [functionState.name]);

  return (
    <Container sx={{ position: 'relative' }}>
      <TooltipWrapper focus={onFocus ? 1 : 0} error={error ? 1 : 0}>
        <Tooltip title={TOOLTIP_NAME} placement="top" arrow>
          <ErrorOutlineIcon style={{ fontSize: 13 }} />
        </Tooltip>
      </TooltipWrapper>
      <InputBasic
        id="outlined-adornment-amount"
        label="Name"
        value={value}
        onChange={handleNameChange}
        error={error ? 1 : 0}
        onFocus={handleVariableNameFocus}
        onBlur={handleVariableNameFocusOut}
        InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
      />
      {!!errorMessage && <Error>{errorMessage}</Error>}
    </Container>
  );
};

export default ParameterName;
