import React from 'react';
import { styled } from '@mui/material/styles';

const CreateBtn = styled('div')(({ theme }) => ({
  width: '130px',
  textAlign: 'center',
  border: 'solid 1px #F07D60',
  borderRadius: '4px',
  fontSize: '14px',
  padding: '6px 15px',
  color: theme.palette.mode === 'dark' ? '#2E2E30' : '#2E2E30',
  fontWeight: 600,
  backgroundColor: theme.palette.mode === 'dark' ? '#F07D60' : '#F07D60',
  ":hover": {
    cursor: 'pointer',
  }
}));

const EditButton = ({ handleOpen }) => {

  return (
    <CreateBtn onClick={handleOpen}>Edit Info</CreateBtn>
  )
};

export default EditButton;