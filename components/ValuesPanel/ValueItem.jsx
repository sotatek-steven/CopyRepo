import { IS_ARRAY_OPTION, SCOPE } from '@/config/constant/common';
import { useSelector } from 'react-redux';
import { PrimaryButton } from '../ButtonStyle';
import { Input } from '../Input';
import Select from '../Select';
import RemoveIcon from 'assets/icon/removeIcon.svg';
import { Item, ItemContainer, ButtonWrapper } from './ValueTab.style';
import DeleteIcon from '../../assets/icon/delete.svg';
import { IconButton } from '@mui/material';

const ValuesItem = ({ value }) => {
  const { types } = useSelector((state) => state.object);
  return (
    <ItemContainer>
      <Item>
        <Select label={'VALUE_TYPE'} value={value?.valueType} options={types} />
      </Item>
      <Item>
        <Select label={'IS_ARRAY'} value={value?.isArray} options={IS_ARRAY_OPTION} />
      </Item>
      <Item>
        <Select label={'SCOPE'} value={value?.scope} options={SCOPE} />
      </Item>
      <Item>
        <Select label={'IS_CONSTANT'} value={value?.isConstant} options={SCOPE} />
      </Item>
      <Item>
        <Input isRequired={true} label={'VARIABLE_NAME'} value={value?.variableName} />
      </Item>
      <Item>
        <Input label={'VARIABLE_VALUE'} value={value?.variableValue} />
      </Item>
      <Item>
        <Input label={'IS_DEFAULT_VALUE'} value={value?.isDefaultValue} />
      </Item>
      <Item>
        <Select label={'MAP_TO_FUNCTION'} value={value?.mapToFunctions} options={IS_ARRAY_OPTION} />
      </Item>
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </ItemContainer>
  );
};

export default ValuesItem;
