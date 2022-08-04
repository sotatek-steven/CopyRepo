import {
  BOOLEAN_OPTIONS,
  ELEMENT_TYPE,
  IS_CONSTANT,
  PLACE_HOLDER,
  SCOPE,
  VALUE_TYPE_OPTIONS,
} from '@/config/constant/common';
import { useSelector } from 'react-redux';
import { Input } from '../Input';
import { Error, Item, ItemContainer } from './ValueTab.style';
import DeleteIcon from '../../assets/icon/deleteIcon2.svg';
import { Box, IconButton, Tooltip, useTheme } from '@mui/material';
import { useMemo } from 'react';
import SingleAutoComplete from '../AutoComplete/SingleAutoComplete';
import MultipleAutoComplete from '../AutoComplete/MultipleAutoComplete';

const ValuesItem = ({ value, handleRemoveValue, handleChangeValue }) => {
  const theme = useTheme();
  const moduleState = useSelector((state) => state.userModule);

  const listFunction = useMemo(() => {
    return moduleState?.sources?.functions?.reduce((array, item) => {
      let temp = [];
      if (item?.globalVariables.length) {
        temp = item?.globalVariables
          .filter((variable) => {
            return (
              variable?.isArray?.toString() === value?.isArray?.toString() && value?.type?.includes(variable?.type)
            );
          })
          .map((variable) => {
            return {
              value: `${item?._id}-${variable?.label}`,
              label: `(${item?.name})(${variable?.label})`,
            };
          });
      }
      return array?.concat(temp);
    }, []);
  }, [moduleState?.sources?.functions, value?.type, value?.isArray]);

  const getPlaceholderDefaultValue = useMemo(() => {
    let placeholder = '';
    if (value.isDefaultValue) {
      if (value.type.includes('int') || value.type.includes('uint')) placeholder = '0';
      else placeholder = PLACE_HOLDER[value.type];
    }
    if (value.isArray) placeholder = 'Separate array items with (,)';
    return placeholder;
  }, [value.type, value.isArray, value.isDefaultValue, PLACE_HOLDER]);

  return (
    <ItemContainer>
      {/* <Item> */}
      <Item sx={{ overflow: 'unset' }}>
        <SingleAutoComplete
          value={VALUE_TYPE_OPTIONS.find((item) => item.value === value?.type)}
          options={VALUE_TYPE_OPTIONS}
          onChange={(e, newValue) => handleChangeValue(value?._id, 'type', newValue, ELEMENT_TYPE.SELECT)}
        />
      </Item>
      {/* </Item> */}
      <Item>
        <SingleAutoComplete
          value={BOOLEAN_OPTIONS.find((item) => item.value === value?.isArray)}
          options={BOOLEAN_OPTIONS}
          onChange={(e, newValue) => handleChangeValue(value?._id, 'isArray', newValue, ELEMENT_TYPE.SELECT)}
          disabled={value.constant}
        />
      </Item>
      <Item>
        <SingleAutoComplete
          value={SCOPE.find((item) => item.value === value?.scope)}
          options={SCOPE}
          onChange={(e, newValue) => handleChangeValue(value?._id, 'scope', newValue, ELEMENT_TYPE.SELECT)}
        />
      </Item>
      <Item>
        <SingleAutoComplete
          value={IS_CONSTANT.find((item) => item.value === value?.constant)}
          options={IS_CONSTANT}
          onChange={(e, newValue) => handleChangeValue(value?._id, 'constant', newValue, ELEMENT_TYPE.SELECT)}
          disabled={value.isArray}
        />
      </Item>
      <Item>
        <Input value={value?.label} onChange={(e) => handleChangeValue(value?._id, 'label', e, ELEMENT_TYPE.INPUT)} />
        <Box sx={{ position: 'absolute', maxWidth: '200px' }}>
          {!!value?.errorName && <Error>{value?.errorName}</Error>}
        </Box>
      </Item>
      <Tooltip
        title={getPlaceholderDefaultValue}
        disableHoverListener={!getPlaceholderDefaultValue}
        disableFocusListener={!getPlaceholderDefaultValue}>
        <Item>
          <Input
            value={value?.valueDefault}
            onChange={(e) => handleChangeValue(value?._id, 'valueDefault', e, ELEMENT_TYPE.INPUT)}
            disabled={value.isDefaultValue === true}
            placeholder={getPlaceholderDefaultValue}
          />
        </Item>
      </Tooltip>
      <Item>
        <SingleAutoComplete
          value={BOOLEAN_OPTIONS.find((item) => item.value === value?.isDefaultValue)}
          options={BOOLEAN_OPTIONS}
          onChange={(e, newValue) => handleChangeValue(value?._id, 'isDefaultValue', newValue, ELEMENT_TYPE.SELECT)}
        />
      </Item>
      <Item>
        <MultipleAutoComplete
          value={listFunction?.filter((item) => value?.functions?.includes(item.value))}
          options={listFunction}
          onChange={(e, newValue) => handleChangeValue(value?._id, 'functions', newValue, ELEMENT_TYPE.SELECT)}
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
