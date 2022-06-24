import styled from '@emotion/styled';
import React from 'react';

const Label = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 3,
}));

const InputBasic = styled('input')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#595655' : '#595655',
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  height: 45,
  borderRadius: 5,
  border: 'none',
  outline: 'none',
  width: '100%',
  fontSize: 14,
  fontWeight: 600,
  padding: '0px 15px',
  fontFamily: 'Josefin Sans',
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
