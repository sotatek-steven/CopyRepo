import React from 'react';
import BurgerMenu from './BurgerMenu';
import PhaseNavigation from './PhaseNavigation';
import Exitbutton from './ExitButton';
import SaveContractBtn from './SaveContractBtn';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import EditInfoContract from '../EditInfoContract';
import NextBtn from './NextBtn';

const NavbarContainer = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 0px',
  backgroundColor: theme.palette.mode === 'dark' ? '#2E2E30' : '#2E2E30'
}));

const RightSide = styled('div')(() => ({
  display: 'flex',
  gap: '23px',
  alignItems: 'center',
  padding: '0 27px'
}));

const DesignSmartContractNav = () => {
  const contract = useSelector((state) => state.contract);
  return (
    <NavbarContainer>
      <BurgerMenu contractName={contract.name || 'New Contract'}/>
      <PhaseNavigation />
      <RightSide>
        <EditInfoContract />
        <NextBtn />
        <SaveContractBtn />
        <Exitbutton />
      </RightSide>
    </NavbarContainer>
  )
};

export default DesignSmartContractNav;