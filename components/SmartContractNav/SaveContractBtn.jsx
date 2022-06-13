import React from 'react';
import { styled } from '@mui/material/styles';

const SaveButton = styled('div')(({ theme }) => ({
    border: 'solid 1px #F07D60',
  backgroundColor: theme.palette.mode === 'dark' ? '#F07D60' : '#F07D60',
  borderRadius: '4px',
  fontSize: '14px',
  padding: '8px 25px',
  color: theme.palette.mode === 'dark' ? '#2E2E30' : '#2E2E30',
  fontWeight: 600
}));

const SaveContractBtn = () => {

    return (
        <SaveButton>Save Contract</SaveButton>
    )
};

export default SaveContractBtn;