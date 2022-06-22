import { Box, List } from '@mui/material';
import React from 'react';
import IconNavBar from './IconNavBar';
import NextLink from 'next/link';

const NavbarData = [
  {
    label: 'Dashboard',
    path: '/smartcontract',
  },
  {
    label: 'Language',
    path: '/language',
  },
];

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
        <Box>
          {NavbarData.map((item, key) => (
            <IconNavBar key={key} name={item.label} path={`${item.path}`} />
          ))}
        </Box>
      </List>
    </>
  );
};

export default NavBarLeft;
