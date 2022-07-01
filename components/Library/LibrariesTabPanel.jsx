import { styled } from '@mui/material';
import React from 'react';
import ImportedLibraries from './ImportedLibraries';
import ImportLibraries from './ImportLibraries';

const Container = styled('div')(() => ({
  padding: '20px 40px',
  display: 'flex',
  height: '100%',
  gap: 31,
}));

const LeftSide = styled('div')(({ theme }) => ({
  width: 444,
  background: theme.palette.background.dark,
  flexShrink: 0,
}));

const RightSide = styled('div')(({ theme }) => ({
  flexGrow: 1,
  background: theme.palette.background.light,
  padding: 18,
}));

const LibrariesTabPanel = () => {
  return (
    <Container>
      <LeftSide>
        <ImportedLibraries />
      </LeftSide>
      <RightSide>
        <ImportLibraries />
      </RightSide>
    </Container>
  );
};

export default LibrariesTabPanel;
