import React from 'react';
import { styled } from '@mui/material/styles';

const Wrapper = styled('div')(() => ({
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'column',
}));

const Text = styled('div')(({ theme, isactive }) => ({
  fontSize: '16px',
  color: isactive === 'true' ? theme.palette.primary.main : theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightBold,
  padding: '5px',
}));

const Line = styled('div')(({ theme, isactive }) => ({
  backgroundColor: isactive === 'true' ? theme.palette.primary.main : `${theme.palette.primary.main}00`,
  height: '4px',
  width: '100%',
  zIndex: 1,
}));

const TabItem = ({ tab, isActive, setActiveTab }) => {
  const { label } = tab;
  return (
    <Wrapper onClick={() => setActiveTab(tab)}>
      <Text isactive={`${isActive.toString()}`}> {label} </Text>
      <Line isactive={`${isActive.toString()}`} />
    </Wrapper>
  );
};

export default TabItem;
