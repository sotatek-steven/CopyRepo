import { BOOLEAN_OPTIONS, ELEMENT_TYPE, SCOPE, VALUE_TYPE_OPTIONS } from '@/config/constant/common';
import { useSelector } from 'react-redux';
import { Input } from '../Input';
import Select from '../Select';
import { Item, ItemContainer } from './ValueTab.style';
import DeleteIcon from '../../assets/icon/deleteIcon2.svg';
import { Box, IconButton, useTheme } from '@mui/material';
import { useMemo } from 'react';

const ValuesItem = ({ value, handleRemoveValue, handleChangeValue }) => {
  const theme = useTheme();
  const moduleState = useSelector((state) => state.userModule);

  const listFunction = useMemo(() => {
    return moduleState?.sources?.functions?.map((item) => {
      return {
        value: item._id,
        label: item.name,
      };
    });
  }, [moduleState?.sources?.functions]);
  return (
    <ItemContainer>
      <Item>
        <Select
          menuProps
          value={value?.type}
          options={VALUE_TYPE_OPTIONS}
          onChange={(e) => handleChangeValue(value?._id, 'type', e, ELEMENT_TYPE.SELECT)}
        />
      </Item>
      <Item>
        <Select
          value={value?.isArray}
          options={BOOLEAN_OPTIONS}
          onChange={(e) => handleChangeValue(value?._id, 'isArray', e, ELEMENT_TYPE.SELECT)}
        />
      </Item>
      <Item>
        <Select
          value={value?.scope}
          options={SCOPE}
          onChange={(e) => handleChangeValue(value?._id, 'scope', e, ELEMENT_TYPE.SELECT)}
        />
      </Item>
      <Item>
        <Select
          value={value?.isConstant}
          options={BOOLEAN_OPTIONS}
          onChange={(e) => handleChangeValue(value?._id, 'isConstant', e, ELEMENT_TYPE.SELECT)}
        />
      </Item>
      <Item>
        <Input
          value={value?.variableName}
          onChange={(e) => handleChangeValue(value?._id, 'variableName', e, ELEMENT_TYPE.INPUT)}
        />
      </Item>
      <Item>
        <Input
          value={value?.variableValue}
          onChange={(e) => handleChangeValue(value?._id, 'variableValue', e, ELEMENT_TYPE.INPUT)}
        />
      </Item>
      <Item>
        <Select
          value={value?.isDefaultValue}
          options={BOOLEAN_OPTIONS}
          onChange={(e) => handleChangeValue(value?._id, 'isDefaultValue', e, ELEMENT_TYPE.SELECT)}
        />
      </Item>
      <Item>
        <Select
          value={value?.functions}
          options={listFunction}
          onChange={(e) => handleChangeValue(value?._id, 'functions', e, ELEMENT_TYPE.SELECT)}
        />
      </Item>
      <Box>
        <IconButton aria-label="delete" onClick={() => handleRemoveValue(value?._id)}>
          <DeleteIcon sx={{ color: theme.palette.primary.main }} />
        </IconButton>
      </Box>
    </ItemContainer>
  );
};

export default ValuesItem;
