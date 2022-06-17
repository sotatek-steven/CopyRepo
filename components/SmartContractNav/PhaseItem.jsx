import React, { ReactNode } from 'react';
import { styled } from '@mui/material/styles';

const Icon = styled('div')(({theme, isactive}) => ({
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    border: 'solid 1px',
    backgroundColor: isactive === "true" ? '#094D27' : '#392D04',
    borderColor: isactive === "true" ? '#84F2B6' : '#FFD33F',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto'
}));

const Label = styled('div')(({ theme, isactive }) => ({
  fontSize: '13px',
  fontWeight: 500,
  color: isactive === "true" ? '#84F2B6' : '#FFD33F',
  marginTop: '7px',
}));

const PhaseItem = ({ label, icon, isActive }) => {

  return (
    <div style={{ zIndex: 1 }}>
      <Icon isactive={`${isActive.toString()}`}>
        {icon}
      </Icon>
      <Label isactive={`${isActive.toString()}`}> {label} </Label>
    </div>
  )
};

export default PhaseItem;