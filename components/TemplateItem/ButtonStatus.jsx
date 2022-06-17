import { Button } from '@mui/material';
import { Box, styled } from '@mui/system';
import React from 'react';

const ButtonStatusCustom = styled(Box)(({ theme, status }) => ({
  border: `1px solid ${status ? '#95D5B2' : '#FFD33F'}`,
  color: `${status ? '#95D5B2' : '#FFD33F'} !important`,
  borderRadius: '20px',
  padding: '4px 8px !important',
  fontSize: '12px',
  width: `${status ? '72px' : '46px'}`,
  height: '20px',
  lineHeight: '20px',
  display: 'flex',
  alignItems: 'center',
  fontWeight: 400,
  fontFamily: 'Josefin Sans',
}));

const ButtonStatus = ({ status }) => {
  return status === 'deployed' ? (
    <ButtonStatusCustom status>Deployed</ButtonStatusCustom>
  ) : (
    <ButtonStatusCustom>Draft</ButtonStatusCustom>
  );
};
export default ButtonStatus;
