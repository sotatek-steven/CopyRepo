import React from 'react';
// import BurgerIcon from '../../assets/icon/menu.svg';
import KebabIcon from '../../assets/icon/kebab.svg';
import { styled } from '@mui/material/styles';

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
  return (
    <RightSide>
      {/* <BurgerIcon /> */}
      <TextStyle> {contractName} </TextStyle>
      <KebabIcon />
    </RightSide>
  );
};

export default BurgerMenu;
