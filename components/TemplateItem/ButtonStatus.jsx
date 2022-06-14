import { Button } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const ButtonStatusCustom = styled(Button)(({ theme, status }) => ({
  border: `1px solid ${status ? '#95D5B2' : '#FFD33F'}`,
  color: `${status ? '#95D5B2' : '#FFD33F'} !important`,
  borderRadius: '20px',
  padding: '4px 16px !important',
}));

const ButtonStatus = ({ status }) => {
  return status === 'deployed' ? (
    <ButtonStatusCustom status> Deployed</ButtonStatusCustom>
  ) : (
    <ButtonStatusCustom>Draft</ButtonStatusCustom>
  );
};
export default ButtonStatus;
