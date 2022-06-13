import React from 'react';
import { styled } from '@mui/material/styles';
import CreateButton from './CreateButton';
import SearchModule from './SearchModule';

const LeftSide = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#E5C2B9' : '#E5C2B9',
  fontSize: '18px',
  fontWeight: 400,
}));

const SubMenu = () => (
    <div style={{
      display: 'flex',
      padding: '25px 20px',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
        <LeftSide>Drag & Drop Modules</LeftSide>
        <div style={{
          display: 'flex',
          gap: '18px',
          alignItems: 'center',
        }}>
            <CreateButton />
            <SearchModule />
        </div>
    </div>
);

export default SubMenu;
