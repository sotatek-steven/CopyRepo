import React from 'react';
import { Card, Container, Toolbar, useTheme } from '@mui/material';
import Head from 'next/head';
import { useEagerConnect, useInactiveListener } from '@/hooks/hooks';
import useUserActive from '@/hooks/useUserActive';
import { Box } from '@mui/system';
import DesignSmartContractNav from '../SmartContractNav';

function DesignLayout(props) {
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager);
  useUserActive();
  const theme = useTheme();
  return (
    <div>
      <Head>
        <title>Drag Drop</title>
      </Head>
      <Box
        sx={{
          display: 'flex',
          background: theme.palette.background.default,
          minHeight: '100vh',
          flexDirection: 'column',
        }}>
        <DesignSmartContractNav />
        <Box sx={{ flexGrow: 1 }}>{props.children}</Box>
      </Box>
    </div>
  );
}

export default DesignLayout;
