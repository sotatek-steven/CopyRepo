import { Box, List } from '@mui/material';
import React from 'react';
import NextLink from 'next/link';
import SideNavigation from '../SideNavigation';

const NavBarLeft = () => {
  return (
    <>
      <List disablePadding={true}>
        <Box sx={{ py: 3, justifyContent: 'center', display: 'flex' }}>
          <NextLink href={'/'}>
            <img
              style={{ width: 46.98, height: 40, cursor: 'pointer' }}
              src="/static/assets/img/home/logo-main.png"
              alt="logo"
              loading="lazy"
            />
          </NextLink>
        </Box>
        <SideNavigation open={true} />
      </List>
    </>
  );
};

export default NavBarLeft;
