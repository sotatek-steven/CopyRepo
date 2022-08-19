/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import DragIcon from '../../assets/icon/drag.svg';

const Item = styled('div')(({ theme, disable }) => ({
  gap: '17px',
  alignContent: 'center',
  padding: '11px 19px',
  display: disable === 'true' ? 'none' : 'flex',
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

const ControlStructureItem = ({ data, nodeType }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
      key={data._id}
      disable={data?.disable?.toString()}>
      <div>
        <DragIcon />
      </div>
      <div className="content">
        <div className="div-name">
          <Text>{data.name}</Text>
        </div>
      </div>
    </Item>
  );
};

export default ControlStructureItem;
