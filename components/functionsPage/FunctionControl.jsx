import { styled } from '@mui/material';
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';
import { useSelector } from 'react-redux';
import BackButton from '../atom/BackButton';

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '11px',
  position: 'absolute',
  top: 32,
  color: theme.palette.primary.light,
  ...theme.typography.h2,
  fontFamily: 'Segoe UI',
}));

const ModuleActionItem = styled('div')(({ theme }) => ({
  fontSize: 14,
  fontWeight: theme.typography.fontWeightBold,
  padding: '7px 10px',
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  transition: 'opacity 0.15s ease-in-out',
  cursor: 'pointer',
  ':hover': {
    opacity: 0.9,
  },
}));

const moreVertIconStyle = {
  fontSize: 23,
  cursor: 'pointer',
};

const FunctionControl = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const userFunction = useSelector((state) => state.userFunction);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleInfoModalOpen = () => {
    handlePopoverClose();
  };

  return (
    <>
      <Wrapper>
        <BackButton />
        <span>{userFunction.name}</span>
        <MoreVertIcon sx={moreVertIconStyle} onClick={handleClick} />
        <Popover
          sx={{
            '& .MuiPopover-paper': {
              borderRadius: 0,
            },
          }}
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}>
          <ModuleActionItem onClick={handleInfoModalOpen}>Function Infomation</ModuleActionItem>
        </Popover>
      </Wrapper>
    </>
  );
};

export default FunctionControl;
