import React from 'react';
import { PrimaryButton } from '../ButtonStyle';
import AddIcon from 'assets/icon/addIcon.svg';
import { Container, BodyContent, Footer } from './ValueTab.style';
import ValueItem from './ValueItem';
import useValuesTab from './hooks/useValuesTab';

const ValuesTabPanel = () => {
  const { values, handeAddValues } = useValuesTab();

  return (
    <Container>
      <BodyContent>
        {values?.map((value) => (
          <ValueItem key={value?._id} value={value} />
        ))}
      </BodyContent>
      {/* <Footer>
        <PrimaryButton width="150px" height="45px" onClick={handleAddObject}>
          <AddIcon />
          Add Object
        </PrimaryButton>
      </Footer> */}
    </Container>
  );
};

export default ValuesTabPanel;
