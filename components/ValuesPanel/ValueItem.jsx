import { IS_ARRAY_OPTION, SCOPE, VALUE_TYPE_OPTIONS } from '@/config/constant/common';
import { useSelector } from 'react-redux';
import { PrimaryButton } from '../ButtonStyle';
import { Input } from '../Input';
import Select from '../Select';
import RemoveIcon from 'assets/icon/removeIcon.svg';
import { Item, ItemContainer, ButtonWrapper } from './ValueTab.style';
import DeleteIcon from '../../assets/icon/deleteIcon2.svg';
import { Box, IconButton, useTheme } from '@mui/material';

const ValuesItem = ({ value }) => {
  const { types } = useSelector((state) => state.object);
  const theme = useTheme();
  return (
    <ItemContainer>
      <Item>
        <Select value={value?.valueType} options={VALUE_TYPE_OPTIONS} />
      </Item>
      <Item>
        <Select value={value?.isArray} options={IS_ARRAY_OPTION} />
      </Item>
      <Item>
        <Select value={value?.scope} options={SCOPE} />
      </Item>
      <Item>
        <Select value={value?.isConstant} options={SCOPE} />
      </Item>
      <Item>
        <Input value={value?.variableName} />
      </Item>
      <Item>
        <Input value={value?.variableValue} />
      </Item>
      <Item>
        <Input value={value?.isDefaultValue} />
      </Item>
      <Item>
        <Select value={value?.mapToFunctions} options={IS_ARRAY_OPTION} />
      </Item>
      <Box>
        <IconButton aria-label="delete">
          <DeleteIcon sx={{ color: theme.palette.primary.main }} />
        </IconButton>
      </Box>
    </ItemContainer>
  );
};

export default ValuesItem;
