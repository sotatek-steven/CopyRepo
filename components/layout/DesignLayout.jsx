import React from 'react';
import { Card, Container, Toolbar } from '@mui/material';
import Head from 'next/head';
import { useEagerConnect, useInactiveListener } from '@/hooks/hooks';
import useUserActive from '@/hooks/useUserActive';
import { Box } from '@mui/system';

function DesignLayout(props) {
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager);
  useUserActive();
  return (
    <div>
      <Head>
        <title>Drag Drop</title>
      </Head>
      <Box sx={{ display: 'flex', background: '#3d3d3e', minHeight: '100vh' }}>
        <Container disableGutters maxWidth="xl">
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
              <Box>
                <Box sx={{ overflow: 'hidden' }}>{props.children}</Box>
              </Box>
            </Card>
          </Toolbar>
        </Container>
      </Box>
    </div>
  );
}

export default DesignLayout;
