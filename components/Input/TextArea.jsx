import { styled } from '@mui/material/styles';
import React from 'react';

const Label = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 3,
}));

const TextAreaBasic = styled('textarea')(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  color: theme.palette.text.primary,
  borderRadius: 5,
  border: 'none',
  outline: 'none',
  width: '100%',
  fontSize: 14,
  fontWeight: 600,
  padding: '15px 15px',
  fontFamily: 'Josefin Sans',
}));

const TextArea = ({ label, value, isRequired, id, name, type = 'text', onChange, rows = '5', readOnly = false }) => {
  return (
    <>
      <Label htmlFor={id}>
        {label}
        {isRequired && '*'}
      </Label>
      <TextAreaBasic
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        rows={rows}
        readOnly={readOnly}
      />
    </>
  );
};

export default TextArea;
