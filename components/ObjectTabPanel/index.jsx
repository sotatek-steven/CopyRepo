import React, { useEffect } from 'react';
import { PrimaryButton } from '../ButtonStyle';
import AddIcon from 'assets/icon/addIcon.svg';
import { Container, BodyContent, Footer } from './ObjectTab.style';
import useObjectTab from './hooks/useObjectTab';
import ObjectItem from './ObjectItem';

const ObjectTabPanel = () => {
  const {
    objects,
    handleAddObject,
    handleRemoveObject,
    handleChangeObject,
    handleAddAssignedValue,
    handleRemoveAssignedValue,
    handleChangeAssignedValues,
  } = useObjectTab();

  return (
    <Container>
      <BodyContent>
        {objects?.map((object) => (
          <ObjectItem
            key={object?._id}
            object={object}
            handleRemoveObject={handleRemoveObject}
            handleChangeObject={handleChangeObject}
            handleAddAssignedValue={handleAddAssignedValue}
            handleRemoveAssignedValue={handleRemoveAssignedValue}
            handleChangeAssignedValues={handleChangeAssignedValues}
          />
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
