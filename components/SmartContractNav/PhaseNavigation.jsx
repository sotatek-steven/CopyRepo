import React from 'react';
import PhaseItem from './PhaseItem';
import DesignIcon from '../../assets/icon/design.svg';
import SearchIcon from '../../assets/icon/search-zoom-out.svg';
import SecurityIcon from '../../assets/icon/security.svg';
import RocketIcon from '../../assets/icon/rocket.svg';
import { styled, useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

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
  const contractState = useSelector((state) => state.contract);
  const theme = useTheme();
  const colors = {
    true: theme.palette.success.main,
    false: theme.palette.warning.main,
  };
  return (
    <NavigationContainer>
      <Line />
      <PhaseItem
        label="Design"
        icon={<DesignIcon fill={colors[contractState.current?.status !== 'deployed']} />}
        isActive={contractState.current?.status !== 'deployed'}
      />
      <PhaseItem label="Validation" icon={<SearchIcon fill={colors[false]} />} isActive={false} />
      <PhaseItem label="Security" icon={<SecurityIcon fill={colors[false]} />} isActive={false} />
      <PhaseItem
        label="Deployment"
        icon={<RocketIcon stroke={colors[contractState.current?.status === 'deployed']} />}
        isActive={contractState.current?.status === 'deployed'}
      />
    </NavigationContainer>
  );
};

export default PhaseNavigation;
