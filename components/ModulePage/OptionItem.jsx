import { styled } from '@mui/material';
import React from 'react';

const Label = styled('div')(({ theme }) => ({
  fontSize: 25,
  color: theme.palette.text.primary,
  fontSize: theme.typography.fontSize,
  fontWeight: theme.typography.fontWeightRegular,
}));

const Container = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '23px 29px',
  gap: 20,
  transition: 'background 0.2s',
  ':hover': {
    cursor: 'pointer',
    background: '#4b4b4c',
  },
}));

const OptionItem = ({ label, icon }) => {
  return (
    <Container>
      {icon}
      <Label>{label}</Label>
    </Container>
  );
};

export default OptionItem;
