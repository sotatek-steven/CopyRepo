import React from 'react';
import { Input } from '../Input';
import { PrimaryButton } from '../ButtonStyle';
import RemoveIcon from 'assets/icon/removeIcon.svg';
import AddIcon from 'assets/icon/addIcon.svg';
import { ItemContainer, ItemTitle, ItemContent, ValueContainer } from './EnumItem.style';

const StructItem = ({
  dataItem,
  handelRemoveEnum,
  handleChangeNameEnum,
  handelAddValue,
  handelRemoveValue,
  handleChangeValue,
}) => {
  return (
    <ItemContainer>
      <ItemTitle>
        <div className="name-struct">
          <Input
            label="Enum name"
            id="name"
            name="name"
            isRequired={true}
            value={dataItem?.name}
            onChange={(e) => handleChangeNameEnum(dataItem?._id, e)}
            errorText={dataItem?.errorName}
          />
        </div>
        <div className="action-remove-struct">
          <PrimaryButton width="150px" height="45px" onClick={() => handelRemoveEnum(dataItem?._id)}>
            <RemoveIcon />
            Remove Enum
          </PrimaryButton>
        </div>
      </ItemTitle>
      <ValueContainer>Value</ValueContainer>
      {dataItem?.values?.map(({ _id, name }) => {
        return (
          <ItemContent key={_id}>
            <div className="name-value">
              <Input
                label=""
                id="name"
                name="name"
                value={name}
                onChange={(e) => handleChangeValue(dataItem?._id, _id, e)}
              />
            </div>
            <div className="action-value">
              <div className="action-icon" onClick={() => handelRemoveValue(dataItem?._id, _id)}>
                <RemoveIcon />
              </div>
            </div>
          </ItemContent>
        );
      })}
      <ItemContent>
        <div className="action-value">
          <div className="action-icon" onClick={() => handelAddValue(dataItem?._id)}>
            <AddIcon />
          </div>
        </div>
      </ItemContent>
    </ItemContainer>
  );
};

export default StructItem;
