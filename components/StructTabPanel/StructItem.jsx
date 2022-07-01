import React from 'react';
import Creatable from 'react-select/creatable';
import { useTheme } from '@mui/material';
import { Input } from '../Input';
import { PrimaryButton } from '../ButtonStyle';
import RemoveIcon from 'assets/icon/removeIcon.svg';
import AddIcon from 'assets/icon/addIcon.svg';
import { ItemContainer, ItemTitle, ItemContent, Label, Error } from './StructItem.style';
import colourStyles from '../EditInfoContractModal/tagStyle';
import { ELEMENT_TYPE } from '@/config/constant/common';

const StructItem = ({
  struct,
  types,
  handelRemoveStruct,
  handelAddVariable,
  handelRemoveVariable,
  handleChangeNameStruct,
  handleChangeVariable,
}) => {
  const theme = useTheme();

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
      {struct?.variables?.map(({ _id, type, name }) => (
        <ItemContent key={_id}>
          <div className="type">
            <Label htmlFor="name">Type*</Label>
            <Creatable
              isMulti={false}
              options={types
                ?.filter((item) => item !== type.value[0])
                .map((item) => ({
                  value: item,
                  label: item,
                }))}
              value={type?.value?.map((item) => ({
                value: item,
                label: item,
              }))}
              onChange={(e) => handleChangeVariable(struct?._id, _id, e, ELEMENT_TYPE.TAG)}
              styles={colourStyles(theme)}
            />
            {!!type.errorType && <Error>{type.errorType}</Error>}
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
          <div className="action-variable" onClick={() => handelRemoveVariable(struct?._id, _id)}>
            {struct?.variables?.length > 1 && <RemoveIcon />}
          </div>
        </ItemContent>
      ))}
      <ItemContent>
        <div className="type"></div>
        <div className="name-variable"></div>
        <div className="action-variable" onClick={() => handelAddVariable(struct?._id)}>
          <AddIcon />
        </div>
      </ItemContent>
    </ItemContainer>
  );
};

export default StructItem;
