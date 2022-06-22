/* eslint-disable no-param-reassign */
import React from 'react';
import { styled } from '@mui/material/styles';
import DragIcon from '../../assets/icon/drag.svg';

const Item = styled('div')(({ disable }) => ({
  gap: '17px',
  alignContent: 'center',
  padding: '11px 19px',
  display: disable === 'true' ? 'none' : 'flex',
}));

const Text = styled('div')(({ theme }) => ({
  fontSize: '14px',
  fontWeight: '400',
  fontFamily: '"Noto Sans", sans-serif',
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  ...theme.components.Truncate.singleLineEllipsis,
}));

const ModuleItem = ({ data, nodeType }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer?.setData('application/reactflow', nodeType);
    const dataJson = JSON.stringify(data);
    event.dataTransfer.setData('foo', dataJson);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Item
      onDragStart={(event) => onDragStart(event, nodeType)}
      draggable
      key={data.id}
      disable={data.disable.toString()}>
      <div>
        <DragIcon />
      </div>
      <Text>{data.name}</Text>
    </Item>
  );
};

export default ModuleItem;
