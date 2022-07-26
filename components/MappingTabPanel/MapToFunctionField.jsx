import { Checkbox, ListItemText, MenuItem, Select, styled } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Label from '../atom/Label';
import useMappingData from './useMappingData';
import ArrowDown from 'assets/icon/arrow-down.svg';

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

  const checkRegisterFunction = (updateOptions, selectedOption) => {
    return updateOptions.some((item) => item._id !== selectedOption._id);
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
    if (checkRegisterFunction(updateOptions, selectedOption))
      mappingVariableOptions.registerOption(selectedOption._id, id);
    else mappingVariableOptions.unregisterOption(selectedOption._id);
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
            const { func: _func, variable: _variable } = JSON.parse(item);
            return func === _func && variable === _variable;
          });
          return (
            <MenuItem key={_id} value={JSON.stringify({ func, variable, label, _id })} disabled={locked}>
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
