import React, { useEffect, useState } from 'react';
import { PrimaryButton } from '../ButtonStyle';
import StructItem from './StructItem';
import AddIcon from 'assets/icon/addIcon.svg';
import { BodyContent, Footer, Header } from './StructItem.style';
import useStructPage from './hooks/useStructPage';

const StructPage = () => {
  const { structs, handelAddStruct, handelRemoveStruct, handelAddVariable, handleChange } = useStructPage();

  return (
    <>
      <Header>Create Struct</Header>
      <BodyContent>
        {structs.map((struct) => (
          <StructItem
            key={struct._id}
            struct={struct}
            handelRemoveStruct={handelRemoveStruct}
            handelAddVariable={handelAddVariable}
            handleChange={handleChange}
          />
        ))}
      </BodyContent>
      <Footer>
        <PrimaryButton width="150px" onClick={handelAddStruct}>
          <AddIcon />
          Add Struct
        </PrimaryButton>
      </Footer>
    </>
  );
};

export default StructPage;
