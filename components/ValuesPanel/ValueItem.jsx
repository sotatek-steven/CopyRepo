import { BOOLEAN_OPTIONS, ELEMENT_TYPE, SCOPE, VALUE_TYPE_OPTIONS } from '@/config/constant/common';
import { useSelector } from 'react-redux';
import { Input } from '../Input';
import Select from '../Select';
import { Error, Item, ItemContainer } from './ValueTab.style';
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

  const getPlaceholderDefaultValue = useMemo(() => {
    let placeholder = null;
    if (value.isDefaultValue) {
      if (value.type === 'address') placeholder = '0x(and 40 zero digits behind)';
      if (value.type === 'bool') placeholder = 'false';
      if (value.type === 'string') placeholder = 'an empty string (empty value)';
      if (value.type.includes('int') || value.type.includes('uint')) placeholder = '0';
      if (value.type.includes('bytes')) placeholder = '0x(and 2 - 64 zero digits behind)';
    }
    if (value.isArray) placeholder = 'Separate array items with (,)';
    return placeholder;
  }, [value.type, value.isArray, value.isDefaultValue]);
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
          value={value?.isConst}
          options={BOOLEAN_OPTIONS}
          onChange={(e) => handleChangeValue(value?._id, 'isConst', e, ELEMENT_TYPE.SELECT)}
          disabled={value.isArray}
        />
      </Item>
      <Item>
        <Input value={value?.label} onChange={(e) => handleChangeValue(value?._id, 'label', e, ELEMENT_TYPE.INPUT)} />
        <Box sx={{ position: 'absolute', maxWidth: '200px' }}>
          {!!value?.errorName && <Error>{value?.errorName}</Error>}
        </Box>
      </Item>

      <Item>
        <Input
          value={value?.variableValue}
          onChange={(e) => handleChangeValue(value?._id, 'variableValue', e, ELEMENT_TYPE.INPUT)}
          disabled={value.isDefaultValue === true}
          placeholder={getPlaceholderDefaultValue}
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
