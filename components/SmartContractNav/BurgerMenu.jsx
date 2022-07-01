import React from 'react';
// import BurgerIcon from '../../assets/icon/menu.svg';
import KebabIcon from '../../assets/icon/kebab.svg';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import { Box, Button, IconButton, Popover, Typography, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';

const RightSide = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  height: '100%',
  padding: '0px 17px',
  boxSizing: 'border-box',
}));

const TextStyle = styled('span')(({ theme }) => ({
  fontSize: '1.375rem', //22px
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.text.primary,
}));

const BurgerMenu = ({ contractName }) => {
  const { contract } = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const handleOpenPopup = () => {
    contract.setInfoContractModalOpen(true);
    handleClose();
  };
  return (
    <RightSide>
      {/* <BurgerIcon /> */}
      <TextStyle> {contractName} </TextStyle>
      <IconButton
        aria-label="delete"
        onClick={handleClick}
        sx={{
          padding: '0 !important',
        }}>
        <MoreVertIcon
          sx={{
            fontSize: '20px',
          }}
        />
      </IconButton>
      <Popover
        sx={{
          '& .MuiPopover-paper': {
            borderRadius: 0,
          },
        }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            padding: '8px',
            cursor: 'pointer',
          }}
          onClick={handleOpenPopup}>
          Smart Contract Infomation
        </Box>
      </Popover>
    </RightSide>
  );
};

export default BurgerMenu;
