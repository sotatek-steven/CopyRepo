import React from 'react';
import { PrimaryButton } from '../ButtonStyle';
import AddIcon from 'assets/icon/addIcon.svg';
import Scrollbars from 'react-custom-scrollbars';
import EventItem from './EventItem';
import { BodyContent, Container, Footer } from './EventErrorTab.style';
import useEventTab from './hooks/useEventTab';

const EventErrorTabPanel = () => {
  const {
    typeParam,
    dataEvent,
    handleAddItem,
    handleRemoveItem,
    handleChangeItem,
    handleAddParam,
    handleRemoveParam,
    handleChangeParam,
  } = useEventTab();

  return (
    <Container>
      <Scrollbars
        style={{
          height: '77vh',
          overflowX: 'hidden',
        }}>
        <BodyContent>
          {dataEvent?.map((item) => (
            <EventItem
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
