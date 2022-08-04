import React from 'react';
import { PrimaryButton } from '../ButtonStyle';
import { Container, BodyContent, Footer } from './ObjectTab.style';
import useObjectTab from './hooks/useObjectTab';
import ObjectItem from './ObjectItem';
import Scrollbars from 'react-custom-scrollbars';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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
      <Scrollbars
        style={{
          height: '77vh',
          overflowX: 'hidden',
        }}>
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
          <PrimaryButton width="135px" onClick={handleAddObject}>
            <AddCircleOutlineIcon style={{ fontSize: 18 }} />
            Add Object
          </PrimaryButton>
        </Footer>
      </Scrollbars>
    </Container>
  );
};

export default ObjectTabPanel;
