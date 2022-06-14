/* eslint-disable no-param-reassign */
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

const ModuleItem = ({ data, nodeType }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer?.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('data', data);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Item
      onDragStart={(event) => onDragStart(event, nodeType)}
      draggable
      key={data.id}
    >
      <DragIcon />
      <Text> {data.name} </Text>
    </Item>
  );
};

export default ModuleItem;
