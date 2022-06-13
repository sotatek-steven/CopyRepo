import React from 'react';
import BurgerMenu from './BurgerMenu';
import PhaseNavigation from './PhaseNavigation';
import Exitbutton from './ExitButton';
import SaveContractBtn from './SaveContractBtn';
import { styled } from '@mui/material/styles';

const NavbarContainer = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.mode === 'dark' ? '#2E2E30' : '#2E2E30'
}));

const RightSide = styled('div')(() => ({
  display: 'flex',
  gap: '23px',
  alignItems: 'center',
  padding: '0 27px'
}));

const DesignSmartContractNav = () => {
  return (
    <NavbarContainer>
      <BurgerMenu />
      <PhaseNavigation />
      <RightSide>
        <Exitbutton />
        <SaveContractBtn />
      </RightSide>
    </NavbarContainer>
  )
};

export default DesignSmartContractNav;