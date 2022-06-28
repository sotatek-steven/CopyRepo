import { styled } from '@mui/material';
import React from 'react';
import { PrimaryButton } from '../ButtonStyle';

const Container = styled('div')(() => ({
  display: 'flex',
  gap: '23px',
}));

function ModuleActionList() {
  return (
    <div>
      <Container>
        <PrimaryButton>Save Module</PrimaryButton>
      </Container>
    </div>
  );
}

export default ModuleActionList;
