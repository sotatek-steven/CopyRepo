import React from 'react';
import PhaseItem from './PhaseItem';
import DesignIcon from '../../assets/icon/design.svg';
import SearchIcon from '../../assets/icon/search-zoom-out.svg';
import SecurityIcon from '../../assets/icon/security.svg';
import RocketIcon from '../../assets/icon/rocket.svg';
import { styled } from '@mui/material/styles';

const Line = styled('div')(({ theme }) => ({
  width: '371px',
  height: '2px',
  position: 'absolute',
  top: '19px',
  left: '20px',
  backgroundColor: theme.palette.mode === 'dark' ? 'white' : 'white'
}));

const NavigationContainer = styled('div')(() => ({
  display: 'flex',
  gap: '38px',
  position: 'relative',
}));

const PhaseNavigation = () => {

  return (
    <NavigationContainer>
      <Line/>
      <PhaseItem label="Design Phase" icon={<DesignIcon fill='#64F5A6' />} isActive={true} />
      <PhaseItem label="Design Phase" icon={<SearchIcon fill='#FFD33F' />} isActive={false} />
      <PhaseItem label="Design Phase" icon={<SecurityIcon fill='#FFD33F' />} isActive={false} />
      <PhaseItem label="Design Phase" icon={<RocketIcon stroke='#FFD33F' />} isActive={false} />
    </NavigationContainer>
  )
};

export default PhaseNavigation;