import React from 'react';
import { Input } from '../Input';
import { PrimaryButton } from '../ButtonStyle';
import RemoveIcon from 'assets/icon/removeIcon.svg';
import AddIcon from 'assets/icon/addIcon.svg';
import { ItemContainer, ItemTitle, ItemContent } from './StructItem.style';
import { ELEMENT_TYPE } from '@/config/constant/common';
import SingleAutoComplete from '../AutoComplete/SingleAutoComplete';

const StructItem = ({
  struct,
  types,
  handelRemoveStruct,
  handelAddVariable,
  handelRemoveVariable,
  handleChangeNameStruct,
  handleChangeVariable,
}) => {
  return (
    <ItemContainer>
      <ItemTitle>
        <div className="name-struct">
          <Input
            label="Struct name"
            id="name"
            name="name"
            isRequired={true}
            value={struct?.name}
            onChange={(e) => handleChangeNameStruct(struct?._id, e)}
            errorText={struct?.errorName}
          />
        </div>
        <div className="action-remove-struct">
          <PrimaryButton width="150px" height="45px" onClick={() => handelRemoveStruct(struct?._id)}>
            <RemoveIcon />
            Remove Struct
          </PrimaryButton>
        </div>
      </ItemTitle>
      {struct?.variables?.map(({ _id, type, name }) => {
        return (
          <ItemContent key={_id}>
            <div className="type">
              <SingleAutoComplete
                label={'Type'}
                isRequired={true}
                errorText={type?.errorType}
                value={types.find((item) => item.value === type.value)}
                options={types.filter((item) => item?.value !== struct?._id)}
                onChange={(e, newValue) => handleChangeVariable(struct?._id, _id, newValue, ELEMENT_TYPE.SELECT)}
              />
            </div>
            <div className="name-variable">
              <Input
                label="Variable name"
                id="name"
                name="name"
                isRequired={true}
                value={name?.value}
                errorText={name?.errorName}
                onChange={(e) => handleChangeVariable(struct?._id, _id, e, ELEMENT_TYPE.INPUT)}
              />
            </div>
            <div className="action-variable">
              {struct?.variables?.length > 1 && (
                <div className="action-icon" onClick={() => handelRemoveVariable(struct?._id, _id)}>
                  <RemoveIcon />
                </div>
              )}
            </div>
          </ItemContent>
        );
      })}
      <ItemContent>
        <div className="type"></div>
        <div className="name-variable"></div>
        <div className="action-variable">
          <div className="action-icon" onClick={() => handelAddVariable(struct?._id)}>
            <AddIcon />
          </div>
        </div>
      </ItemContent>
    </ItemContainer>
  );
};

export default StructItem;
