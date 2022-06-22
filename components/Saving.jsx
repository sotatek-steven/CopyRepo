import React from 'react';
import { styled } from '@mui/material/styles';
import { DotFlashing } from './LoadingIcon/DotFlashing';

const LoadingButton = styled('button')(({ theme, width }) => ({
  width: '100%',
  height: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 100,
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  fontWeight: 600,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 18,
  border: 'none',
  gap: 15,
}));

const SavingScreen = () => {
  return (
    <LoadingButton>
      <div style={{ paddingBottom: '7px' }}>Saving</div>
      <DotFlashing />
    </LoadingButton>
  );
};

export default SavingScreen;
