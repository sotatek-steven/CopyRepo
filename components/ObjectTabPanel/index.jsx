import React from 'react';
import { PrimaryButton } from '../ButtonStyle';
import AddIcon from 'assets/icon/addIcon.svg';
import { Container, BodyContent, Footer } from './ObjectTab.style';
import useObjectTab from './hooks/useObjectTab';
import ObjectItem from './ObjectItem';

const ObjectTabPanel = () => {
  const { objects, handleAddObject } = useObjectTab();

  return (
    <Container>
      <BodyContent>
        {objects?.map((object) => (
          <ObjectItem key={object?._id} object={object} />
        ))}
      </BodyContent>
      <Footer>
        <PrimaryButton width="150px" height="45px" onClick={handleAddObject}>
          <AddIcon />
          Add Object
        </PrimaryButton>
      </Footer>
    </Container>
  );
};

export default ObjectTabPanel;
