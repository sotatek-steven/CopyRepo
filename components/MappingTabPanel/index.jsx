import React, { useState } from 'react';
import { PrimaryButton } from '../ButtonStyle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styled } from '@mui/material';
import MappingItem from './MappingItem';
import { useDispatch, useSelector } from 'react-redux';

const Container = styled('div')({
  padding: '30px 70px',
});

const MappingTabPanel = () => {
  const moduleState = useSelector((state) => state.userModule);
  const { userModule } = useDispatch();
  const [error, setError] = useState(true);

  const handleClick = () => {
    const {
      variables: { mappings },
    } = moduleState;
    if (!mappings) return;

    const newMappingItem = {
      id: Date.now(),
      label: '',
      scope: 'public',
      func: [],
      type: {
        key: '',
        value: { type: '', map: {} },
      },
    };
    mappings.push(newMappingItem);

    userModule.updateMappings(mappings);
  };

  // useEffect(() => {
  //   console.log('moduleState.variables.mappings: ', moduleState.variables.mappings);
  // }, [moduleState.variables.mappings]);

  return (
    <Container>
      {moduleState.variables.mappings.map((mappingItem, index) => {
        return <MappingItem updateError={setError} id={mappingItem.id} key={index} />;
      })}
      <PrimaryButton width={123} onClick={handleClick}>
        <AddCircleOutlineIcon style={{ fontSize: 18 }} />
        <span>Create New</span>
      </PrimaryButton>
    </Container>
  );
};

export default MappingTabPanel;
