import { ELEMENT_TYPE, IS_ARRAY_OPTION, OBJECT_TYPE, SCOPE } from '@/config/constant/common';
import { useSelector } from 'react-redux';
import { PrimaryButton } from '../ButtonStyle';
import { Input } from '../Input';
import Select from '../Select';
import RemoveIcon from 'assets/icon/removeIcon.svg';
import AddIcon from 'assets/icon/addIcon.svg';
import { Item, ItemContainer, ButtonWrapper, AssignedValuesContainer, AssignedValueList } from './ObjectTab.style';
import { useMemo } from 'react';

const TOOLTIP_NAME = 'Beginning character: Must be letter\nFollowing characters only contain: Letters, digits, (_)';

const ObjectItem = ({
  object,
  handleRemoveObject,
  handleChangeObject,
  handleAddAssignedValue,
  handleRemoveAssignedValue,
  handleChangeAssignedValues,
}) => {
  const { types } = useSelector((state) => state.object);
  const moduleState = useSelector((state) => state.userModule);

  const listStruct = useMemo(() => {
    return moduleState?.sources?.structs?.map((item) => {
      return {
        value: item.name,
        label: item.name,
      };
    });
  }, [moduleState?.sources?.structs]);

  const listFunction = useMemo(() => {
    return moduleState?.sources?.functions?.reduce((array, item) => {
      let temp = [];
      if (item?.globalVariables.length) {
        const params = item?.params.map((param) => param?.label)?.toString();
        temp = item?.globalVariables.map((variable) => {
          return {
            value: `${item._id}-${variable.label}`,
            label: `(${item.name})(${params})`,
          };
        });
      }
      return array?.concat(temp);
    }, []);
  }, [moduleState?.sources?.functions]);

  return (
    <>
      <ItemContainer>
        <Item>
          <Select
            label={'Choose type'}
            value={object?.type}
            options={types}
            onChange={(e) => handleChangeObject(object?._id, 'type', e, ELEMENT_TYPE.SELECT)}
          />
        </Item>
        {object?.type === OBJECT_TYPE.STRUCT && (
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

      {object?.type === OBJECT_TYPE.STRUCT && object?.item && (
        <AssignedValueList>
          {object?.assignedValues?.map((assigned, index) => (
            <AssignedValuesContainer key={assigned?._id}>
              <div className="title">
                <div className="name"></div>
                <div className="index">{index}</div>
                <div>
                  {object?.isArray && (
                    <div className="remove-icon" onClick={() => handleRemoveAssignedValue(object?._id, assigned?._id)}>
                      <RemoveIcon />
                    </div>
                  )}
                </div>
              </div>
              <div className="assigned-value-item">
                <div className="assigned-value">
                  {assigned?.contents?.map((content) => (
                    <div key={content?._id} className="content">
                      <div className="name">{content?.label}</div>
                      <div className="input-value">
                        <Input
                          value={content?.value || ''}
                          placeholder={content?.type}
                          onChange={(e) => handleChangeAssignedValues(e, object?._id, assigned?._id, content?._id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AssignedValuesContainer>
          ))}
          {object?.isArray && (
            <div className="action-icon" onClick={() => handleAddAssignedValue(object?._id)}>
              <AddIcon />
            </div>
          )}
        </AssignedValueList>
      )}
    </>
  );
};

export default ObjectItem;
