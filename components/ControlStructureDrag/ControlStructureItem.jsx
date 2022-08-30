/* eslint-disable no-param-reassign */
import React from 'react';
import { styled } from '@mui/material/styles';
import DragIcon from '../../assets/icon/drag.svg';

const Item = styled('div')(({ theme }) => ({
  gap: '17px',
  alignContent: 'center',
  padding: '11px 19px',
  display: 'flex',
  transition: 'background 0.2s',

  ':hover': {
    background: theme.palette.background.default,
  },
  '& .content': {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    '& .div-name': {
      display: 'flex',
      gap: 17,
      cursor: 'pointer',
    },
  },
}));

const Text = styled('div')(({ theme }) => ({
  fontSize: '14px',
  fontWeight: '400',
  fontFamily: 'Segoe UI',
  color: theme.palette.text.primary,
  ...theme.components.truncate.singleLineEllipsis,
  maxWidth: 352,
}));

const ControlStructureItem = ({ name, nodeType }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer?.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Item onDragStart={(event) => onDragStart(event, nodeType)} draggable>
      <div>
        <DragIcon />
      </div>
      <div className="content">
        <div className="div-name">
          <Text>{name}</Text>
        </div>
      </div>
    </Item>
  );
};

export default ControlStructureItem;
