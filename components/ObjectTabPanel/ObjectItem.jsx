import { IS_ARRAY_OPTION, SCOPE } from '@/config/constant/common';
import { useSelector } from 'react-redux';
import { PrimaryButton } from '../ButtonStyle';
import { Input } from '../Input';
import Select from '../Select';
import RemoveIcon from 'assets/icon/removeIcon.svg';
import { Item, ItemContainer, ButtonWrapper } from './ObjectTab.style';

const ObjectItem = ({ object }) => {
  const { types } = useSelector((state) => state.object);
  return (
    <ItemContainer>
      <Item>
        <Select label={'Choose type'} value={object?.type} options={types} />
      </Item>
      <Item>
        <Select label={'Choose item'} value={object?.item} options={types} />
      </Item>
      <Item>
        <Select label={'IS_ARRAY'} value={object?.isArray} options={IS_ARRAY_OPTION} />
      </Item>
      <Item>
        <Select label={'SCOPE'} value={object?.scope} options={SCOPE} />
      </Item>
      <Item>
        <Input isRequired={true} label={'NAME'} value={object?.name} />
      </Item>
      <Item>
        <Select label={'MAP_TO_FUNCTION'} value={object?.type} options={IS_ARRAY_OPTION} />
      </Item>
      <ButtonWrapper>
        <PrimaryButton width="150px" height="45px">
          <RemoveIcon />
          Remove Object
        </PrimaryButton>
      </ButtonWrapper>
    </ItemContainer>
  );
};

export default ObjectItem;
