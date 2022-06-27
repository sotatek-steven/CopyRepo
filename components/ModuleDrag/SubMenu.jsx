import React from 'react';
import { styled } from '@mui/material/styles';
import SearchModule from './SearchModule';
import CreateButton from './CreateBtn';

const LeftSide = styled('div')(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: '18px',
  fontWeight: theme.typography.fontWeightRegular,
  fontFamily: 'Segoe UI',
}));

const SubMenu = () => {
  return (
    <div
      style={{
        display: 'flex',
        padding: '25px 20px',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <LeftSide>Drag & Drop Modules</LeftSide>
      <div
        style={{
          display: 'flex',
          gap: '18px',
          alignItems: 'center',
        }}>
        <CreateButton />
        <SearchModule />
      </div>
    </div>
  );
};

export default SubMenu;
