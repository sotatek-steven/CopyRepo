import { Checkbox, ListItemText, MenuItem, Select, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Label from '../atom/Label';
import useMappingData from './useMappingData';
import ArrowDown from 'assets/icon/arrow-down.svg';
import { compareMappingVariable } from './utils';

const SelectCustom = styled(Select)(({ theme }) => ({
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const MapToFunctionField = ({ id, options }) => {
  const [data, updateData] = useMappingData(id);
  const { mappingVariableOptions } = useDispatch();
  const [value, setValue] = useState([]);

  useEffect(() => {
    const _value = data.functions.map((item) => {
      return options.find((option) => compareMappingVariable(item, option));
    });
    setValue(
      _value.map((item) => {
        const { func, variable, label } = item;
        return JSON.stringify({ func, variable, label });
      })
    );
  }, []);

  const checkRegisterFunction = (updateOptions, selectedOption) => {
    return updateOptions.some((item) => compareMappingVariable(item, selectedOption));
  };

  const handleChange = (event, child) => {
    const values = event.target.value;
    const options = values.map((value) => JSON.parse(value));
    const updateOptions = options.map((item) => ({
      func: item.func,
      variable: item.variable,
    }));
    updateData({ functions: updateOptions });
    setValue(values);

    const selectedOption = JSON.parse(child.props.value);
    if (checkRegisterFunction(updateOptions, selectedOption)) mappingVariableOptions.registerOption(selectedOption, id);
    else mappingVariableOptions.unregisterOption(selectedOption);
  };

  return (
    <>
      <Label>MAP_TO_FUNCTION</Label>
      <SelectCustom
        multiple
        value={value}
        onChange={handleChange}
        IconComponent={ArrowDown}
        renderValue={(selected) => {
          const data = selected.map((value) => JSON.parse(value));
          const label = data.map((item) => item.label);
          return label.join(', ');
        }}
        MenuProps={MenuProps}>
        {options?.map((option) => {
          const { _id, label, locked, func, variable } = option;
          const checked = !!value.find((item) => {
            return compareMappingVariable(option, JSON.parse(item));
          });
          return (
            <MenuItem key={_id} value={JSON.stringify({ func, variable, label })} disabled={locked}>
              <Checkbox checked={checked} />
              <ListItemText primary={label} />
            </MenuItem>
          );
        })}
      </SelectCustom>
    </>
  );
};

export default MapToFunctionField;
