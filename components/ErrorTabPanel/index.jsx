import React from 'react';
import { PrimaryButton } from '../ButtonStyle';
import AddIcon from 'assets/icon/addIcon.svg';
import Scrollbars from 'react-custom-scrollbars';
import ErrorItem from './ErrorItem';
import { BodyContent, Container, Footer } from '../EventTabPanel/EventErrorTab.style';
import useErrorTab from './hooks/useErrorTab';

const ErrorTabPanel = () => {
  const {
    typeParam,
    dataError,
    handleAddItem,
    handleRemoveItem,
    handleChangeItem,
    handleAddParam,
    handleRemoveParam,
    handleChangeParam,
  } = useErrorTab();

  return (
    <Container>
      <Scrollbars
        style={{
          height: '77vh',
          overflowX: 'hidden',
        }}>
        <BodyContent>
          {dataError?.map((item) => (
            <ErrorItem
              key={item?._id}
              typeParam={typeParam}
              dataItem={item}
              handleRemoveItem={handleRemoveItem}
              handleChangeItem={handleChangeItem}
              handleAddParam={handleAddParam}
              handleRemoveParam={handleRemoveParam}
              handleChangeParam={handleChangeParam}
            />
          ))}
        </BodyContent>
        <Footer>
          <PrimaryButton width="150px" height="45px" onClick={handleAddItem}>
            <AddIcon />
            Add New
          </PrimaryButton>
        </Footer>
      </Scrollbars>
    </Container>
  );
};

export default ErrorTabPanel;
