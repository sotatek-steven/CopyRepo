import { ELEMENT_TYPE, IS_ARRAY_OPTION, SCOPE } from '@/config/constant/common';
import { useSelector } from 'react-redux';
import { PrimaryButton } from '../ButtonStyle';
import { Input } from '../Input';
import Select from '../Select';
import RemoveIcon from 'assets/icon/removeIcon.svg';
import { Item, ItemContainer, ButtonWrapper } from './ObjectTab.style';
import { useMemo } from 'react';

const TOOLTIP_NAME = 'Beginning character: Must be letter\nFollowing characters only contain: Letters, digits, (_)';

const ObjectItem = ({ object, handleRemoveObject, handleChangeObject }) => {
  const { types } = useSelector((state) => state.object);
  const moduleState = useSelector((state) => state.userModule);

  const listStruct = useMemo(() => {
    return moduleState?.sources?.structs?.map((item) => {
      return {
        value: item._id,
        label: item.name,
      };
    });
  }, [moduleState?.sources?.structs]);

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
          label={'Choose type'}
          value={object?.type}
          options={types}
          onChange={(e) => handleChangeObject(object?._id, 'type', e, ELEMENT_TYPE.SELECT)}
        />
      </Item>
      {object?.type === 'structs' && (
        <>
          <Item>
            <Select
              label={'Choose item'}
              value={object?.item}
              options={listStruct}
              onChange={(e) => handleChangeObject(object?._id, 'item', e, ELEMENT_TYPE.SELECT)}
            />
          </Item>
          {object?.item && (
            <>
              <Item>
                <Select
                  label={'IS_ARRAY'}
                  value={object?.isArray}
                  options={IS_ARRAY_OPTION}
                  onChange={(e) => handleChangeObject(object?._id, 'isArray', e, ELEMENT_TYPE.SELECT)}
                />
              </Item>
              <Item>
                <Select
                  label={'SCOPE'}
                  value={object?.scope}
                  options={SCOPE}
                  onChange={(e) => handleChangeObject(object?._id, 'scope', e, ELEMENT_TYPE.SELECT)}
                />
              </Item>
              <Item>
                <Input
                  isRequired={true}
                  label={'VARIABLE NAME'}
                  value={object?.name}
                  tooltip={TOOLTIP_NAME}
                  errorText={object?.errorName}
                  onChange={(e) => handleChangeObject(object?._id, 'name', e, ELEMENT_TYPE.INPUT)}
                />
              </Item>
              <Item>
                <Select
                  multiple={true}
                  label={'MAP_TO_FUNCTION'}
                  value={object?.functions}
                  options={listFunction}
                  onChange={(e) => handleChangeObject(object?._id, 'functions', e, ELEMENT_TYPE.SELECT)}
                />
              </Item>
            </>
          )}
        </>
      )}

      <ButtonWrapper>
        <PrimaryButton width="150px" height="45px" onClick={() => handleRemoveObject(object?._id)}>
          <RemoveIcon />
          Remove Object
        </PrimaryButton>
      </ButtonWrapper>
    </ItemContainer>
  );
};

export default ObjectItem;
