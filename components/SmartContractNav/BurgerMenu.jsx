import React from 'react';
import BurgerIcon from '../../assets/icon/menu.svg';
import KebabIcon from '../../assets/icon/kebab.svg';
import { styled } from '@mui/material/styles';

const RightSide = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  height: '100%',
  padding: '0px 17px',
  boxSizing: 'border-box'
}));

const TextStyle = styled('span')(({ theme }) => ({
  fontSize: '22px',
  fontWeight: 500,
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#',
}));

const BurgerMenu = () => {
  return (
    <RightSide>
      {/* <BurgerIcon /> */}
      <TextStyle>ICO Smart Contract</TextStyle>
      <KebabIcon />
    </RightSide>
  )
}

export default BurgerMenu;