import { Box, List } from '@mui/material';
import React from 'react';
import IconNavBar from './IconNavBar';
import NextLink from 'next/link';

const NavbarData = [
  {
    label: 'Dashboard',
    path: '/dashboard',
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
              style={{ width: 40, cursor: 'pointer' }}
              src="/static/assets/img/home/logo-main.png"
              alt="logo"
              loading="lazy"
            />
          </NextLink>
        </Box>
        {NavbarData.map((item, key) => (
          <IconNavBar key={key} name={item.label} path={`${item.path}`} />
        ))}
      </List>
    </>
  );
};

export default NavBarLeft;
