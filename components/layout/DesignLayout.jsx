import React from 'react';
import { styled, useTheme } from '@mui/material';
import Head from 'next/head';
import { useEagerConnect, useInactiveListener } from '@/hooks/hooks';
import useUserActive from '@/hooks/useUserActive';
import { Box } from '@mui/system';
import BurgerMenu from '../SmartContractNav/BurgerMenu';
import PhaseNavigation from '../SmartContractNav/PhaseNavigation';
import { useSelector } from 'react-redux';

const NavbarContainer = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 0px',
  backgroundColor: theme.palette.background.dark,
}));

const ActionContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0 27px',
}));

const PageContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  background: theme.palette.background.default,
  minHeight: '100vh',
  flexDirection: 'column',
}));

function DesignLayout(props) {
  const contractState = useSelector((state) => state.contract);
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager);
  useUserActive();
  const theme = useTheme();
  return (
    <div>
      <Head>
        <title>Drag Drop</title>
      </Head>
      <PageContainer>
        <div style={{ height: 74 }}>
          <NavbarContainer>
            <BurgerMenu contractName={contractState.current.name || 'New Contract'} />
            <PhaseNavigation />
            <ActionContainer>{props.actionList}</ActionContainer>
          </NavbarContainer>
        </div>
        <Box sx={{ flexGrow: 1 }}>{props.children}</Box>
      </PageContainer>
    </div>
  );
}

export default DesignLayout;
