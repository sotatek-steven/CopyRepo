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
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightBold,
  backgroundColor: theme.palette.background.light,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 18,
  border: 'none',
  gap: 15,
}));

const SavingScreen = ({ title = 'Saving' }) => {
  return (
    <LoadingButton>
      <div style={{ paddingBottom: '7px' }}>{title}</div>
      <DotFlashing />
    </LoadingButton>
  );
};

export default SavingScreen;
