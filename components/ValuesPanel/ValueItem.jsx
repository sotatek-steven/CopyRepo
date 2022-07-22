import { BOOLEAN_OPTIONS, ELEMENT_TYPE, PLACE_HOLDER, SCOPE, VALUE_TYPE_OPTIONS } from '@/config/constant/common';
import { useSelector } from 'react-redux';
import { Input } from '../Input';
import Select from '../Select';
import { Error, Item, ItemContainer } from './ValueTab.style';
import DeleteIcon from '../../assets/icon/deleteIcon2.svg';
import { Box, IconButton, Tooltip, useTheme } from '@mui/material';
import { useMemo } from 'react';
import SelectSearch from 'react-select';
import colourStyles from './ValueTypeStyle';

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
        <SelectSearch
          // value={value?.type}
          options={VALUE_TYPE_OPTIONS}
          styles={colourStyles(theme)}
          onChange={(e) => handleChangeValue(value?._id, 'type', e, ELEMENT_TYPE.SELECT)}
        />
      </Item>
      {/* </Item> */}
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
      <Tooltip
        title={getPlaceholderDefaultValue}
        disableHoverListener={!getPlaceholderDefaultValue}
        disableFocusListener={!getPlaceholderDefaultValue}>
        <Item>
          <Input
            value={value?.variableValue}
            onChange={(e) => handleChangeValue(value?._id, 'variableValue', e, ELEMENT_TYPE.INPUT)}
            disabled={value.isDefaultValue === true}
            placeholder={getPlaceholderDefaultValue}
          />
        </Item>
      </Tooltip>
      <Item>
        <Select
          value={value?.isDefaultValue}
          options={BOOLEAN_OPTIONS}
          onChange={(e) => handleChangeValue(value?._id, 'isDefaultValue', e, ELEMENT_TYPE.SELECT)}
        />
      </Item>
      <Item>
        <Select
          multiple={true}
          value={value?.functions || []}
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
