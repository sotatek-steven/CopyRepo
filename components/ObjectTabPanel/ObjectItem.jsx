import { ELEMENT_TYPE, IS_ARRAY_OPTION, OBJECT_TYPE, SCOPE_OPTIONS } from '@/config/constant/common';
import { useSelector } from 'react-redux';
import { PrimaryButton } from '../ButtonStyle';
import { Input } from '../Input';
import RemoveIcon from 'assets/icon/removeIcon.svg';
import AddIcon from 'assets/icon/addIcon.svg';
import {
  Item,
  ItemContainer,
  ButtonWrapper,
  AssignedValuesContainer,
  AssignedValueList,
  ScrollbarsCustom,
  RemoveButton,
} from './ObjectTab.style';
import { useMemo } from 'react';
import SingleAutoComplete from '../AutoComplete/SingleAutoComplete';
import MultipleAutoComplete from '../AutoComplete/MultipleAutoComplete';
import { Tooltip } from '@mui/material';

const TOOLTIP_NAME = (
  <div>
    <div>{`Beginning character: Must be letter`}</div>
    <div>{`Following characters only contain: Letters, digits, (_)`}</div>
  </div>
);

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
    return moduleState?.sources[`${object?.type}s`]?.map((item) => {
      return {
        value: item.name,
        label: item.name,
      };
    });
  }, [moduleState?.sources?.structs, object?.type]);

  const listFunction = useMemo(() => {
    return moduleState?.sources?.functions?.reduce((array, item) => {
      let temp = [];
      if (item?.globalVariables.length) {
        temp = item?.globalVariables
          .filter((variable) => {
            return (
              variable?.isArray?.toString() === object?.isArray?.toString() &&
              variable?.type.toUpperCase() === object?.item.toUpperCase()
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
  }, [moduleState?.sources?.functions, object?.item, object?.isArray]);

  const listEnum = useMemo(() => {
    const enumSelected = moduleState?.sources?.enums?.find((item) => item?.name === object?.item);
    return enumSelected?.content?.map((item) => {
      return {
        ...item,
        value: item?.label,
      };
    });
  }, [moduleState?.sources?.enums, object?.item]);

  return (
    <>
      <ItemContainer>
        <Item>
          <SingleAutoComplete
            label={'Choose type'}
            value={types.find((type) => type.value === object?.type)}
            options={types}
            onChange={(e, newValue) => handleChangeObject(object?._id, 'type', newValue, ELEMENT_TYPE.SELECT)}
          />
        </Item>
        {object?.type && (
          <>
            <Item>
              <SingleAutoComplete
                label={'Choose item'}
                value={listStruct.find((struct) => struct.value === object?.item)}
                options={listStruct}
                onChange={(e, newValue) => handleChangeObject(object?._id, 'item', newValue, ELEMENT_TYPE.SELECT)}
              />
            </Item>
            {object?.item && (
              <>
                <Item>
                  <SingleAutoComplete
                    label={'IS_ARRAY'}
                    value={IS_ARRAY_OPTION.find((item) => item.value === object?.isArray)}
                    options={IS_ARRAY_OPTION}
                    onChange={(e, newValue) =>
                      handleChangeObject(object?._id, 'isArray', newValue, ELEMENT_TYPE.SELECT)
                    }
                  />
                </Item>
                <Item>
                  <SingleAutoComplete
                    label={'SCOPE'}
                    value={SCOPE_OPTIONS.find((item) => item.value === object?.scope)}
                    options={SCOPE_OPTIONS}
                    onChange={(e, newValue) => handleChangeObject(object?._id, 'scope', newValue, ELEMENT_TYPE.SELECT)}
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
                  <MultipleAutoComplete
                    multiple={true}
                    label={'MAP_TO_FUNCTION'}
                    value={listFunction.filter((item) => object?.functions?.includes(item.value))}
                    options={listFunction}
                    onChange={(e, newValue) =>
                      handleChangeObject(object?._id, 'functions', newValue, ELEMENT_TYPE.SELECT)
                    }
                  />
                </Item>
              </>
            )}
          </>
        )}

        <ButtonWrapper>
          <PrimaryButton width="150px" height="45px" onClick={() => handleRemoveObject(object?._id)}>
            <RemoveButton />
            Remove Object
          </PrimaryButton>
        </ButtonWrapper>
      </ItemContainer>

      {object?.type && object?.item && (
        <ScrollbarsCustom style={{ width: '100%' }}>
          <AssignedValueList>
            {object?.assignedValues?.map((assigned, index) => (
              <AssignedValuesContainer key={assigned?._id}>
                <div className="title">
                  <div className="name"></div>
                  {object?.isArray && <div className="index">{`${index}`}</div>}
                  <div>
                    {object?.isArray && (
                      <div
                        className="remove-icon"
                        onClick={() => handleRemoveAssignedValue(object?._id, assigned?._id)}>
                        <RemoveIcon />
                      </div>
                    )}
                  </div>
                </div>
                <div className="assigned-value-item">
                  <div className="assigned-value">
                    {object?.type === OBJECT_TYPE.STRUCT &&
                      assigned?.contents?.map((content) => (
                        <div key={content?._id} className="content">
                          <Tooltip arrow placement="top" title={content?.label}>
                            <div className="name">{content?.label}</div>
                          </Tooltip>

                          <div className="input-value">
                            <Input
                              value={content?.value || ''}
                              placeholder={content?.type}
                              onChange={(e) =>
                                handleChangeAssignedValues(
                                  e,
                                  object?._id,
                                  assigned?._id,
                                  content?._id,
                                  ELEMENT_TYPE.INPUT
                                )
                              }
                            />
                          </div>
                        </div>
                      ))}
                    {object?.type === OBJECT_TYPE.ENUM && (
                      <SingleAutoComplete
                        value={listEnum?.find((item) => item.value === assigned?.contents[0]?.value)}
                        options={listEnum}
                        onChange={(e, newValue) =>
                          handleChangeAssignedValues(
                            newValue,
                            object?._id,
                            assigned?._id,
                            assigned?.contents[0]?._id,
                            ELEMENT_TYPE.SELECT
                          )
                        }
                      />
                    )}
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
        </ScrollbarsCustom>
      )}
    </>
  );
};

export default ObjectItem;
