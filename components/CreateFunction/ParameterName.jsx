import { InputAdornment, styled, TextField, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import useValidateVariableName from '@/hooks/useValidateVariableName';

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

const ParameterName = ({ label, id, updateLabel }) => {
  const { checkExistingStateVariable, validateSyntax, checkExistingParameter, checkExistingFunction } =
    useValidateVariableName();
  const [onFocus, setOnFocus] = useState(false);

  const validateParameterName = (value) => {
    if (!value) return '';
    if (!validateSyntax(value)) return 'Invalid declaration';
    if (checkExistingFunction(value)) return 'Found an existing function with the same name';
    if (checkExistingParameter(value, id)) return 'Found an existing parameter with the same name';
    if (checkExistingStateVariable(value)) return 'Identifier already declared';
  };

  const handleNameChange = (e) => {
    const value = e.target.value.trim();
    const errorMessage = validateParameterName(value);

    updateLabel({ value, errorMessage });
  };

  const handleVariableNameFocus = (event) => {
    const { value } = event.target;
    setOnFocus(true);
    if (value) return;
    updateLabel({ value, errorMessage: '' });
  };

  const handleVariableNameFocusOut = (event) => {
    setOnFocus(false);
    const { value } = event.target;
    if (value) return;

    updateLabel({ value, errorMessage: 'This field is required' });
  };

  return (
    <Container sx={{ position: 'relative' }}>
      <TooltipWrapper focus={onFocus ? 1 : 0} error={label.errorMessage ? 1 : 0}>
        <Tooltip title={TOOLTIP_NAME} placement="top" arrow>
          <ErrorOutlineIcon style={{ fontSize: 13 }} />
        </Tooltip>
      </TooltipWrapper>
      <InputBasic
        label="Name"
        value={label.value}
        onChange={handleNameChange}
        error={label.errorMessage ? 1 : 0}
        onFocus={handleVariableNameFocus}
        onBlur={handleVariableNameFocusOut}
        InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
      />
      {!!label.errorMessage && <Error>{label.errorMessage}</Error>}
    </Container>
  );
};

export default ParameterName;
