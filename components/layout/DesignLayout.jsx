import React, { useState } from 'react';
import { styled } from '@mui/material';
import Head from 'next/head';
import { useEagerConnect, useInactiveListener } from '@/hooks/hooks';
import useUserActive from '@/hooks/useUserActive';
import { Box } from '@mui/system';
import BurgerMenu from '../SmartContractNav/BurgerMenu';
import PhaseNavigation from '../SmartContractNav/PhaseNavigation';
import { useSelector } from 'react-redux';
import SideNavigation from '../SideNavigation';

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <Head>
        <title>Drag Drop</title>
      </Head>
      <PageContainer>
        <div style={{ height: 74 }}>
          <NavbarContainer>
            <BurgerMenu
              setSidebarOpen={handleSidebarOpen}
              contractName={contractState.current.name || 'New Contract'}
            />
            <PhaseNavigation />
            <ActionContainer>{props.actionList}</ActionContainer>
          </NavbarContainer>
        </div>
        <SideNavigation open={sidebarOpen} />
        <Box sx={{ height: 'calc(100vh - 74px)' }}>{props.children}</Box>
      </PageContainer>
    </div>
  );
}

export default DesignLayout;
