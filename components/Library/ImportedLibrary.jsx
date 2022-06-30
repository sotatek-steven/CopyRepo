import { styled } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const Container = styled('div')(() => ({
  padding: '18px 40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 25,
}));

const Text = styled('div')(({ theme }) => ({
  fontFamily: 'Segoe UI',
  height: 42,
  boxSizing: 'border-box',
  fontSize: 14,
  fontWeight: theme.typography.fontWeightRegular,
  color: theme.palette.text.primary,
  margin: 0,
  wordBreak: 'break-all',
  ...theme.components.truncate.twoLineEllipsis,
}));

const ImportedLibrary = ({ name }) => {
  return (
    <Container>
      <Text>{name}</Text>
      <CloseIcon sx={{ fontSize: 20 }} />
    </Container>
  );
};

export default ImportedLibrary;
