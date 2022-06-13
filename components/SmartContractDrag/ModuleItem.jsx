import React from 'react';
import { styled } from '@mui/material/styles';
import DragIcon from '../../assets/icon/drag.svg';

const Item = styled('div')(() => ({
  display: 'flex',
  gap: '17px',
  alignItems: 'center',
  padding: '11px 19px',
}));

const Text = styled('div')(({ theme }) => ({
  fontSize: '15px',
  fontWeight: '400',
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
}));

const ModuleItem = ({ nodeType }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer?.setData('application/reactflow', nodeType);
    // eslint-disable-next-line no-param-reassign
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Item
      onDragStart={(event) => onDragStart(event, nodeType)}
      draggable
    >
      <DragIcon />
      <Text>Mintable Token</Text>
    </Item>
  );
};

export default ModuleItem;
