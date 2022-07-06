import { styled } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const Container = styled('div')(({ theme, active }) => ({
  borderRadius: '0px 4px 4px 0px',
  display: 'flex',
  height: 70,
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  color: theme.palette.primary.main,
  fontSize: 26,
  ':hover': {
    background: theme.palette.background.default,
  },
}));

const SidebarItem = ({ item }) => {
  const { icon, link } = item;
  const route = useRouter();

  const handleClick = () => {
    if (!link) return;
    route.push(link);
  };

  return <Container onClick={handleClick}>{icon}</Container>;
};

export default SidebarItem;
