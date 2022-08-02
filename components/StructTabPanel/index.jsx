import React, { useEffect } from 'react';
import { PrimaryButton } from '../ButtonStyle';
import StructItem from './StructItem';
import AddIcon from 'assets/icon/addIcon.svg';
import { BodyContent, Footer, Header } from './StructItem.style';
import useStructPage from './hooks/useStructPage';
import { STRUCT } from '@/config/constant/common';
import Scrollbars from 'react-custom-scrollbars';

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
      <Scrollbars
        style={{
          height: '75vh',
          overflowX: 'hidden',
        }}>
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
      </Scrollbars>
    </>
  );
};

export default StructPage;
