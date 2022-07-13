import React, { useState } from 'react';
import { PrimaryButton } from '../ButtonStyle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import styled from '@emotion/styled';
import MappingItem from './MappingItem';

const Container = styled('div')({
  padding: '30px 70px',
});
const MappingTabPanel = () => {
  const [mappingItems, setMappingItems] = useState([]);
  const handleClick = () => {
    const newMappingItem = {
      scope: '',
      variableName: '',
      mapTOFunction: [],
    };

    const _mappingItems = [...mappingItems];
    _mappingItems.push(newMappingItem);

    setMappingItems(_mappingItems);
  };

  return (
    <Container>
      {mappingItems?.map((mappingItem, index) => {
        return <MappingItem key={index} />;
      })}
      <PrimaryButton width={123} onClick={handleClick}>
        <AddCircleOutlineIcon style={{ fontSize: 18 }} />
        <span>Create New</span>
      </PrimaryButton>
    </Container>
  );
};

export default MappingTabPanel;
