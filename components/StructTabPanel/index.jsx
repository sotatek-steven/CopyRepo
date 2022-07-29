import React, { useEffect } from 'react';
import { PrimaryButton } from '../ButtonStyle';
import StructItem from './StructItem';
import AddIcon from 'assets/icon/addIcon.svg';
import { BodyContent, Footer, Header } from './StructItem.style';
import useStructPage from './hooks/useStructPage';
import { STRUCT } from '@/config/constant/common';

const StructPage = () => {
  const {
    structs,
    types,
    handelAddStruct,
    handelRemoveStruct,
    handelAddVariable,
    handelRemoveVariable,
    handleChangeNameStruct,
    handleChangeVariable,
  } = useStructPage();

  return (
    <>
      <Header>Create Struct</Header>
      <BodyContent>
        {structs?.map((struct) => (
          <StructItem
            key={struct._id}
            struct={struct}
            types={types}
            handelRemoveStruct={handelRemoveStruct}
            handelAddVariable={handelAddVariable}
            handelRemoveVariable={handelRemoveVariable}
            handleChangeNameStruct={handleChangeNameStruct}
            handleChangeVariable={handleChangeVariable}
          />
        ))}
      </BodyContent>
      <Footer>
        <PrimaryButton width="150px" height="45px" onClick={() => handelAddStruct(STRUCT)}>
          <AddIcon />
          Add Struct
        </PrimaryButton>
      </Footer>
    </>
  );
};

export default StructPage;
