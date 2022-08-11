import React from 'react';
import { PrimaryButton } from '../ButtonStyle';
import AddIcon from 'assets/icon/addIcon.svg';
import Scrollbars from 'react-custom-scrollbars';
import EventErrorItem from './EventErrorItem';
import { BodyContent, Container, Footer } from './EventErrorTab.style';
import useEventErrorTab from './hooks/useEventErrorTab';

const EventErrorTabPanel = () => {
  const {
    typeParam,
    dataEventError,
    handleAddItem,
    handleRemoveItem,
    handleChangeItem,
    handleAddParam,
    handleRemoveParam,
    handleChangeParam,
  } = useEventErrorTab();

  return (
    <Container>
      <Scrollbars
        style={{
          height: '77vh',
          overflowX: 'hidden',
        }}>
        <BodyContent>
          {dataEventError?.map((item) => (
            <EventErrorItem
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

export default EventErrorTabPanel;
