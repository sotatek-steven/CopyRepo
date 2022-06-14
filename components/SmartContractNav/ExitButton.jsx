import React from 'react';
import { styled } from '@mui/material/styles';

const ExitButton = styled('div')(({ theme }) => ({
  border: 'solid 1px #E1E1E1',
  backgroundColor: theme.palette.mode === 'dark' ? '#2E2E30' : '#2E2E30',
  borderRadius: '4px',
  fontSize: '14px',
  padding: '8px 48px',
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  fontWeight: 600
}));

const Exitbutton = () => {

  return (
    <ExitButton >Exit</ExitButton>
  )
};

export default Exitbutton;