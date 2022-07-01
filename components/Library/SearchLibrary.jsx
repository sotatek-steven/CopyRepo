import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material';

const Container = styled('div')(({ theme }) => ({
  background: theme.palette.background.light,
  borderRadius: 5,
  display: 'flex',
  alignContent: 'center',
  padding: 6,
  maxWidth: 415,
  marginBottom: 10,
}));

const Input = styled('input')(({ theme }) => ({
  background: theme.palette.background.light,
  outline: 'none',
  border: 'none',
  fontSize: 14,
  color: theme.palette.text.primary,
  width: '100%',
}));

const SearchLibrary = () => {
  return (
    <Container>
      <SearchIcon style={{ fontSize: 22 }} />
      <Input placeholder="Find library" />
    </Container>
  );
};

export default SearchLibrary;
