import React from 'react';
import { PrimaryButton } from '../ButtonStyle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import styled from '@emotion/styled';

const Container = styled('div')({
  padding: '30px 70px',
});
const MappingTabPanel = () => {
  return (
    <Container>
      <PrimaryButton width={123}>
        <AddCircleOutlineIcon style={{ fontSize: 18 }} />
        <span>Create New</span>
      </PrimaryButton>
    </Container>
  );
};

export default MappingTabPanel;
