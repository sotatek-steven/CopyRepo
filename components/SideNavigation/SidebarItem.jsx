import { styled } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const Container = styled('div')(({ theme, active }) => {
  const isActive = active === 'true';
  return {
    borderRadius: '0px 4px 4px 0px',
    display: 'flex',
    height: 50,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    color: isActive ? theme.palette.primary.contrastText : theme.palette.primary.main,
    background: isActive ? theme.palette.primary.main : theme.palette.background.dark,
    fontSize: 26,
    transition: 'background 0.3s',
    ':hover': {
      background: isActive ? theme.palette.primary.main : theme.palette.background.default,
    },
  };
});

const SidebarItem = ({ item, active }) => {
  const { icon, link } = item;
  const route = useRouter();

  const handleClick = () => {
    if (!link) return;
    route.push(link);
  };

  return (
    <Container onClick={handleClick} active={active.toString()}>
      {icon}
    </Container>
  );
};

export default SidebarItem;
