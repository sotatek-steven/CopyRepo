import React from 'react';
import { Card, Container, Toolbar } from '@mui/material';
import Head from 'next/head';
import { useEagerConnect, useInactiveListener } from '@/hooks/hooks';
import useUserActive from '@/hooks/useUserActive';
import { Box } from '@mui/system';
import DesignSmartContractNav from '../SmartContractNav';

function DesignLayout(props) {
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager);
  useUserActive();
  return (
    <div>
      <Head>
        <title>Drag Drop</title>
      </Head>
      <Box sx={{ display: 'flex', background: '#3d3d3e', minHeight: '100vh', flexDirection: 'column' }}>
        <DesignSmartContractNav />
        <Box sx={{ flexGrow: 1 }}>{props.children}</Box>
      </Box>
    </div>
  );
}

export default DesignLayout;
