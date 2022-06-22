import React from 'react';
import { styled } from '@mui/material/styles';

const Text = styled('div')(({ theme, isactive }) => ({
  fontSize: '16px',
  color: isactive === 'true' ? '#F07D60' : '#E1E1E1',
  fontWeight: 600,
  padding: '5px',
}));

const Line = styled('div')(({ theme, isactive }) => ({
  backgroundColor: isactive === 'true' ? '#F07D60' : '#F07D6000',
  height: '4px',
  width: '100%',
}));

const MenuItem = ({ text, label, isActive, setActiveTab }) => {
  return (
    <div
      style={{ cursor: 'pointer', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}
      onClick={() => setActiveTab(label)}>
      <Text isactive={`${isActive.toString()}`}> {text} </Text>
      <Line isactive={`${isActive.toString()}`} />
    </div>
  );
};

export default MenuItem;
