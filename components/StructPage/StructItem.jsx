import React from 'react';
import { Input } from '../Input';
import { PrimaryButton } from '../ButtonStyle';
import RemoveIcon from 'assets/icon/removeIcon.svg';
import AddIcon from 'assets/icon/addIcon.svg';
import { ItemContainer, ItemTitle, ItemContent } from './StructItem.style';
import Select from '../Select';

const StructItem = ({ struct, handelRemoveStruct, handelAddVariable, handleChange }) => {
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
            onChange={handleChange}
            errorText={struct?.errorName}
          />
        </div>
        <div className="action-remove-struct">
          <PrimaryButton width="150px" onClick={() => handelRemoveStruct(struct._id)}>
            <RemoveIcon />
            Remove Struct
          </PrimaryButton>
        </div>
      </ItemTitle>
      {struct?.variables?.map(({ _id, type, name }) => (
        <ItemContent key={_id}>
          <div className="type">
            <Select label={'Type'} value={type?.value} errorText={type?.errorType} />
          </div>
          <div className="name-variable">
            <Input
              label="Variable name"
              id="name"
              name="name"
              isRequired={true}
              value={name?.value}
              // onChange={(e) => handleChange(e, 'name', ELEMENT_TYPE.INPUT)}
              errorText={name?.errorText}
            />
          </div>
          <div className="action-variable" onClick={handelAddVariable}>
            <RemoveIcon />
          </div>
        </ItemContent>
      ))}
      <ItemContent>
        <div className="type"></div>
        <div className="name-variable"></div>
        <div className="action-variable">
          <AddIcon />
        </div>
      </ItemContent>
    </ItemContainer>
  );
};

export default StructItem;
