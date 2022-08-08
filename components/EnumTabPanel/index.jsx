import React from 'react';
import { PrimaryButton } from '../ButtonStyle';
import EnumItem from './EnumItem';
import AddIcon from 'assets/icon/addIcon.svg';
import { BodyContent, Footer, Header } from './EnumItem.style';
import Scrollbars from 'react-custom-scrollbars';
import useEnumPage from './hooks/useEnumPage';
import { ENUM_ITEM } from '@/config/constant/common';

const EnumPage = () => {
  const {
    enums,
    handelAddEnum,
    handelRemoveEnum,
    handleChangeNameEnum,
    handelAddValue,
    handelRemoveValue,
    handleChangeValue,
  } = useEnumPage();

  return (
    <>
      <Header>Create Enum</Header>
      <Scrollbars
        style={{
          height: '75vh',
          overflowX: 'hidden',
        }}>
        <BodyContent>
          {enums?.map((item) => (
            <EnumItem
              key={item._id}
              dataItem={item}
              handelRemoveEnum={handelRemoveEnum}
              handleChangeNameEnum={handleChangeNameEnum}
              handelAddValue={handelAddValue}
              handelRemoveValue={handelRemoveValue}
              handleChangeValue={handleChangeValue}
            />
          ))}
        </BodyContent>
        <Footer>
          <PrimaryButton width="150px" height="45px" onClick={() => handelAddEnum(ENUM_ITEM)}>
            <AddIcon />
            Add Enum
          </PrimaryButton>
        </Footer>
      </Scrollbars>
    </>
  );
};

export default EnumPage;
