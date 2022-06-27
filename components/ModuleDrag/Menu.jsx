import { styled } from '@mui/system';
import React, { useEffect, useState } from 'react';
import MenuItem from './MenuItem';

const tabs = [
  {
    label: 'modules',
    text: 'Modules',
  },
  {
    label: 'analytics',
    text: 'Analytics',
  },
  {
    label: 'api',
    text: 'API Services',
  },
];

const MenuContainer = styled('div')(({ theme }) => ({
  background: theme.palette.background.light,
  display: 'flex',
  padding: '0px 25px',
  justifyContent: 'space-between',
  height: 46,
  alignContent: 'end',
}));

const Menu = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <MenuContainer>
      {tabs.map((item) => {
        const { text, label } = item;
        return (
          <MenuItem text={text} label={label} isActive={activeTab === label} setActiveTab={setActiveTab} key={label} />
        );
      })}
    </MenuContainer>
  );
};

export default Menu;
