import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { styled } from '@mui/material';

const IconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  width: 26,
  height: 26,
  overflow: 'hidden',
  border: 'solid 1px',
  borderColor: theme.palette.primary.main,
  color: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
}));

const arrowIconStyle = {
  fontSize: 17,
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-30%, -50%)',
};

const BackButton = ({ onClick }) => {
  return (
    <IconWrapper onClick={onClick}>
      <ArrowBackIosIcon sx={arrowIconStyle} />
    </IconWrapper>
  );
};

export default BackButton;
