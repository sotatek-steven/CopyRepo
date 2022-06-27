import { styled } from '@mui/material/styles';
import React from 'react';

const Label = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 3,
}));

const InputBasic = styled('input')(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  color: theme.palette.text.primary,
  height: 45,
  borderRadius: 5,
  border: 'none',
  outline: 'none',
  width: '100%',
  fontSize: 14,
  fontWeight: theme.typography.fontWeightBold,
  padding: '0px 15px',
  fontFamily: theme.typography.fontFamily,
}));

const Input = ({ label, value, isRequired, id, name, type = 'text', onChange, readOnly }) => {
  return (
    <>
      <Label htmlFor={id}>
        {label}
        {isRequired && '*'}
      </Label>
      <InputBasic type={type} name={name} id={id} value={value} onChange={onChange} readOnly={readOnly} />
    </>
  );
};

export default Input;
