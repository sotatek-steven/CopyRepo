import React from 'react';
import PhaseItem from './PhaseItem';
import DesignIcon from '../../assets/icon/design.svg';
import SearchIcon from '../../assets/icon/search-zoom-out.svg';
import SecurityIcon from '../../assets/icon/security.svg';
import RocketIcon from '../../assets/icon/rocket.svg';
import { styled, useTheme } from '@mui/material/styles';

const Line = styled('div')(({ theme }) => ({
  width: '80%',
  height: '2px',
  position: 'absolute',
  top: '19px',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  backgroundColor: theme.palette.text.primary,
}));

const NavigationContainer = styled('div')(() => ({
  display: 'flex',
  gap: '38px',
  position: 'absolute',
  top: 7,
  left: '50%',
  transform: 'translateX(-50%)',
}));

const PhaseNavigation = () => {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <Line />
      <PhaseItem label="Design Phase" icon={<DesignIcon fill={theme.palette.success.main} />} isActive={true} />
      <PhaseItem label="Validation Phase" icon={<SearchIcon fill={theme.palette.warning.main} />} isActive={false} />
      <PhaseItem label="Security Phase" icon={<SecurityIcon fill={theme.palette.warning.main} />} isActive={false} />
      <PhaseItem label="Deployment Phase" icon={<RocketIcon stroke={theme.palette.warning.main} />} isActive={false} />
    </NavigationContainer>
  );
};

export default PhaseNavigation;
