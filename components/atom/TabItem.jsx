import React from 'react';
import { styled } from '@mui/material/styles';

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
}));

const TabItem = ({ text, label, isActive, setActiveTab }) => {
  return (
    <div
      style={{ cursor: 'pointer', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}
      onClick={() => setActiveTab(label)}>
      <Text isactive={`${isActive.toString()}`}> {text} </Text>
      <Line isactive={`${isActive.toString()}`} />
    </div>
  );
};

export default TabItem;
