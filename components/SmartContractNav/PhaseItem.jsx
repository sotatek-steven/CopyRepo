import React from 'react';
import { styled } from '@mui/material/styles';

const Icon = styled('div')(({ theme, isactive }) => ({
  width: '38px',
  height: '38px',
  borderRadius: '50%',
  border: 'solid 1px',
  backgroundColor: isactive === 'true' ? theme.palette.success.dark : theme.palette.warning.dark,
  borderColor: isactive === 'true' ? '#84F2B6' : theme.palette.warning.main,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
}));

const Label = styled('div')(({ theme, isactive }) => ({
  fontSize: '12px',
  fontWeight: 600,
  color: isactive === 'true' ? '#84F2B6' : theme.palette.warning.main,
  marginTop: '7px',
}));

const PhaseItem = ({ label, icon, isActive }) => {
  return (
    <div style={{ zIndex: 1 }}>
      <Icon isactive={`${isActive.toString()}`}>{icon}</Icon>
      <Label isactive={`${isActive.toString()}`}> {label} </Label>
    </div>
  );
};

export default PhaseItem;
