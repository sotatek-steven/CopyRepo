/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import DragIcon from '../../assets/icon/drag.svg';
import { MODE_ACTION_MODULE } from '@/config/constant/common';
import { IconButton, Popover } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FunctionDetail from '../ModulePage/FunctionDetail';

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

const Container = styled('div')(({ theme }) => ({
  background: theme.palette.background.default,
  width: 125,
  '& > .item': {
    padding: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    cursor: 'pointer',
    transition: 'background 0.2s',
    borderBottom: `0.5px dashed ${theme.shape.borderColor}`,
    ':hover': {
      background: theme.hover.background.dark,
    },
    ':last-child': {
      borderBottom: 'unset',
    },
  },
}));

const Label = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: theme.typography.fontSize,
  fontWeight: theme.typography.fontWeightRegular,
}));

const options = [
  {
    id: MODE_ACTION_MODULE.DETAILS,
    label: MODE_ACTION_MODULE.DETAILS,
    mode: MODE_ACTION_MODULE.DETAILS,
  },
];

const FunctionItem = ({ data, nodeType }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenFunctionDetail, setIsOpenFunctionDetail] = useState(false);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClickAction = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const onDragStart = (event, nodeType) => {
    event.dataTransfer?.setData('application/reactflow', nodeType);
    const dataJson = JSON.stringify(data);
    event.dataTransfer.setData('foo', dataJson);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleClickActionMenu = (mode) => {
    if (!data) return;
    switch (mode) {
      case MODE_ACTION_MODULE.DETAILS:
        setIsOpenFunctionDetail(true);
        setAnchorEl(null);
        break;
      default:
        break;
    }
  };

  return (
    <Item
      onDragStart={(event) => onDragStart(event, nodeType)}
      draggable
      key={data.id}
      disable={data?.disable?.toString()}>
      <div>
        <DragIcon />
      </div>
      <div className="content">
        <div className="div-name">
          <Text>{data.name}</Text>
        </div>
        <div className="icon-action">
          <IconButton
            aria-label="delete"
            onClick={handleClickAction}
            sx={{
              padding: '0 !important',
            }}>
            <MoreVertIcon
              sx={{
                fontSize: '20px',
              }}
            />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}>
            <Container>
              {options.map((item, index) => {
                const { id, label, mode } = item;
                return (
                  <div key={id} className="item" onClick={() => handleClickActionMenu(mode)}>
                    <Label>{label}</Label>
                  </div>
                );
              })}
            </Container>
          </Popover>
        </div>
      </div>
      <FunctionDetail
        open={isOpenFunctionDetail}
        onClose={() => setIsOpenFunctionDetail(false)}
        functionId={data._id}
      />
    </Item>
  );
};

export default FunctionItem;
