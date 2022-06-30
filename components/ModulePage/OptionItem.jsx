import { styled } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

const Label = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: theme.typography.fontSize,
  fontWeight: theme.typography.fontWeightRegular,
}));

const Container = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '23px 29px',
  gap: 20,
  cursor: 'pointer',
  transition: 'background 0.2s',
  ':hover': {
    background: '#4b4b4c',
  },
}));

const OptionItem = ({ label, icon, mode }) => {
  const { moduleDesignMode } = useDispatch();

  const handleClick = () => {
    moduleDesignMode.setModuleDesignMode(mode);
  };

  return (
    <Container onClick={handleClick}>
      {icon}
      <Label>{label}</Label>
    </Container>
  );
};

export default OptionItem;
