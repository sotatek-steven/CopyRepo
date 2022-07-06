import { styled } from '@mui/material';
import React from 'react';
import SidebarItem from './SidebarItem';
import LayerIcon from './LayerIcon';
import GlobalIcon from './GlobalIcon';

const Wrapper = styled('div')(({ theme, open }) => ({
  position: 'absolute',
  height: 'calc(100vh - 74px)',
  top: 74,
  left: 0,
  width: 64,
  background: theme.palette.background.dark,
  zIndex: 10,
  flexDirection: 'column',
  padding: '13px 8px 13px 0px',
  opacity: !open ? '0' : '1',
  transform: open ? 'translateX(0)' : 'translateX(-200%)',
  transition: 'all 0.5s',
}));

const data = [
  {
    id: 'contractListPage',
    icon: <LayerIcon />,
    link: '/smartcontract',
  },
  {
    id: 'marketPlace',
    icon: <GlobalIcon />,
    link: '/language',
  },
];

const SideNavigation = ({ open }) => {
  return (
    <Wrapper open={open}>
      {data.map((item) => (
        <SidebarItem key={item.id} item={item} />
      ))}
    </Wrapper>
  );
};

export default SideNavigation;
