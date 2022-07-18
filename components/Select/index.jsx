import { Checkbox, ListItemText, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowDown from 'assets/icon/arrow-down.svg';
import React from 'react';
import Label from '../atom/Label';

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const MenuSimpeProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3.7 + ITEM_PADDING_TOP,
    },
  },
};

const SelectComponent = ({
  multiple = false,
  label,
  isRequired,
  value = '',
  onChange,
  options = [],
  disabled = false,
  errorText,
  menuProps = false,
}) => {
  return (
    <>
      {label && (
        <Label>
          {label}
          {isRequired && '*'}
        </Label>
      )}
      {!multiple && (
        <SelectBasic
          MenuProps={menuProps ? MenuSimpeProps : {}}
          value={value}
          onChange={onChange}
          disabled={disabled}
          displayEmpty
          IconComponent={ArrowDown}>
          {!!options.length &&
            options.map((option) => {
              return (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              );
            })}
        </SelectBasic>
      )}
      {multiple && (
        <SelectBasic
          multiple
          value={value}
          onChange={onChange}
          displayEmpty
          IconComponent={ArrowDown}
          renderValue={(selected) => {
            const selectLabel = options.filter((item) => selected.includes(item?.value));
            return selectLabel.map((item) => item.label).join(', ');
          }}
          MenuProps={MenuProps}>
          {!!options.length &&
            options.map(({ value: _id, label, locked }) => (
              <MenuItem key={_id} value={_id} disabled={locked}>
                <Checkbox checked={value.indexOf(_id) > -1} />
                <ListItemText primary={label} />
              </MenuItem>
            ))}
        </SelectBasic>
      )}
      {!!errorText && <Error>{errorText}</Error>}
    </>
  );
};

export default SelectComponent;
