import React from 'react';
import { Card, CardContent, Container, Divider, Drawer, List, ListItemButton, Toolbar } from '@mui/material';
import Head from 'next/head';
import { useEagerConnect, useInactiveListener } from '@/hooks/hooks';
import Navbar from './NavBar';
import useUserActive from '@/hooks/useUserActive';
import { Box } from '@mui/system';
import NavBarLeft from './NavBarLeft';

const drawerWidth = 256;
const navLeftWidth = 85;

function Layout(props) {
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager);
  useUserActive();
  return (
    <div>
      <Head>
        <title>Drag Drop</title>
      </Head>
      <Box sx={{ display: 'flex', background: '#3d3d3e', minHeight: '100vh' }}>
        <Navbar />
        <Drawer variant="permanent" open={open}>
          <Box display={'flex'} flexGrow={1} flexDirection="column" sx={{ width: `${navLeftWidth}px` }}>
            <NavBarLeft />
          </Box>
          <Divider />
        </Drawer>
        <Container disableGutters maxWidth="xl">
          <Toolbar sx={{ flexWrap: 'wrap', padding: '0 !important' }}>
            <Card
              sx={{
                width: '100%',
                height: '100%',
                mt: 1,
                overflow: 'auto',
                bgcolor: '#3d3d3e',
                overflow: 'height',
              }}>
              <Box
                sx={{
                  marginLeft: `${navLeftWidth}px`,
                  marginTop: '70px',
                }}
                style={{ width: `calc(100vw)` }}>
                <Box sx={{ overflow: 'hidden' }}>{props.children}</Box>
              </Box>
            </Card>
          </Toolbar>
        </Container>
      </Box>
    </div>
  );
}

export default Layout;
