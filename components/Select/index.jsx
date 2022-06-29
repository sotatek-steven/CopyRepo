import { MenuItem, Select } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowDown from 'assets/icon/arrow-down.svg';
import React from 'react';

const Label = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 3,
}));

const SelectBasic = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  color: theme.palette.text.primary,
  height: 45,
  borderRadius: 5,
  border: 'none',
  outline: 'none',
  width: '100%',
  fontSize: 14,
  fontWeight: theme.typography.fontWeightBold,
  fontFamily: theme.typography.fontFamily,
  '& > fieldset': {
    border: 'none',
  },
}));

const Error = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: 14,
  marginTop: 8,
}));

const SelectComponent = ({ label, isRequired, value, onChange, options = [], disabled = false, errorText }) => {
  return (
    <>
      <Label>
        {label}
        {isRequired && '*'}
      </Label>
      <SelectBasic value={value} onChange={onChange} disabled={disabled} displayEmpty IconComponent={ArrowDown}>
        {!!options.length &&
          options.map((option) => {
            return (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            );
          })}
      </SelectBasic>
      {!!errorText && <Error>{errorText}</Error>}
    </>
  );
};

export default SelectComponent;
