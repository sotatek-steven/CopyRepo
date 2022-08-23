import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, Tooltip } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Input } from '../Input';
import Label from '../atom/Label';
import useValidateVariableName from '@/hooks/useValidateVariableName';
import { VARIABLE_NAME_TOOLTIP } from '@/config/constant/common';

const TitleWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

const FunctionNameField = () => {
  const { name } = useSelector((state) => state.functionDefinition);
  const { functionDefinition } = useDispatch();
  const { checkExistingStateVariable, validateSyntax } = useValidateVariableName();

  const validateFunctionName = (value) => {
    if (!value) return '';
    if (!validateSyntax(value)) return 'Invalid declaration';
    if (checkExistingStateVariable(value)) return 'Identifier already declared';
  };

  const handleNameChange = (e) => {
    const value = e.target.value.trim();
    const errorMessage = validateFunctionName(value);

    functionDefinition.updateName({
      value,
      errorMessage,
    });
  };

  const handleVariableNameFocus = (event) => {
    const { value } = event.target;
    if (value) return;
    functionDefinition.updateName({
      value,
      errorMessage: '',
    });
  };

  const handleVariableNameFocusOut = (event) => {
    const { value } = event.target;
    if (value) return;
    functionDefinition.updateName({
      value,
      errorMessage: 'This field is required',
    });
  };

  return (
    <div>
      <TitleWrapper>
        <Label type="basic">Function name *</Label>
        <Tooltip title={VARIABLE_NAME_TOOLTIP} placement="top" arrow>
          <ErrorOutlineIcon style={{ fontSize: 16 }} />
        </Tooltip>
      </TitleWrapper>
      <Input
        value={name.value}
        onChange={handleNameChange}
        error={!!name.errorMessage}
        errorText={name.errorMessage}
        onFocus={handleVariableNameFocus}
        onBlur={handleVariableNameFocusOut}
      />
    </div>
  );
};

export default FunctionNameField;
