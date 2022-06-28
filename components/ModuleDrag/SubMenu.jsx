import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import SearchModule from './SearchModule';
import CreateButton from './CreateBtn';
import ModuleInfoModal from '../ModulePage/ModuleInfoModal';
import { MODE } from '@/config/constant/common';

const LeftSide = styled('div')(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: '18px',
  fontWeight: theme.typography.fontWeightRegular,
  fontFamily: 'Segoe UI',
}));

const SubMenu = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

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
        <CreateButton handleOpen={handleOpen} />
        <SearchModule />
      </div>
      <ModuleInfoModal mode={MODE.CREATE} open={open} onClose={handleOpen} data={{}} />
    </div>
  );
};

export default SubMenu;
