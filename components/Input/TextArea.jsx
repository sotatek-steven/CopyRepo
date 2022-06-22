import styled from '@emotion/styled';
import React from 'react';

const Label = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 3,
}));

const TextAreaBasic = styled('textarea')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#595655' : '#595655',
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  borderRadius: 5,
  border: 'none',
  outline: 'none',
  width: '100%',
  fontSize: 14,
  fontWeight: 600,
  padding: '15px 15px',
  fontFamily: 'Josefin Sans',
}));

const TextArea = ({ label, value, isRequired, id, name, type = 'text', onChange, rows = '5' }) => {
  return (
    <>
      <Label htmlFor={id}>
        {label}
        {isRequired && '*'}
      </Label>
      <TextAreaBasic type={type} name={name} id={id} value={value} onChange={onChange} rows={rows} />
    </>
  );
};

export default TextArea;
