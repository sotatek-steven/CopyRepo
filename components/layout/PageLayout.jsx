import React from 'react';
import { Card, CardContent, Container, Divider, Drawer, List, ListItemButton, Toolbar, useTheme } from '@mui/material';
import Head from 'next/head';
import { useEagerConnect, useInactiveListener } from '@/hooks/hooks';
import Navbar from './NavBar';
import useUserActive from '@/hooks/useUserActive';
import { Box } from '@mui/system';
import NavBarLeft from './NavBarLeft';

const drawerWidth = 256;
const navLeftWidth = 64;

function Layout(props) {
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager);
  useUserActive();
  const theme = useTheme();
  return (
    <div>
      <Head>
        <title>Drag Drop</title>
      </Head>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Navbar />
        <Drawer variant="permanent">
          <Box
            display={'flex'}
            flexGrow={1}
            flexDirection="column"
            sx={{ width: `${navLeftWidth}px`, background: theme.palette.background.dark }}>
            <NavBarLeft />
          </Box>
          <Divider />
        </Drawer>
        <Box sx={{ overflow: 'hidden' }}>
          <Toolbar sx={{ flexWrap: 'wrap', padding: '0 !important' }}>
            <Card
              sx={{
                width: '100%',
                height: '100%',
                mt: 1,
                overflow: 'auto',
                bgcolor: '#3d3d3E',
                overflow: 'height',
              }}>
              <Box
                sx={{
                  marginLeft: `${navLeftWidth}px`,
                  marginTop: '70px',
                }}
                style={{ width: `calc(100vw - 50px)`, height: 'calc(100vh - 85px)' }}>
                <Box>{props.children}</Box>
              </Box>
            </Card>
          </Toolbar>
        </Box>
      </Box>
    </div>
  );
}

export default Layout;
