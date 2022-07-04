/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import DragIcon from '../../assets/icon/drag.svg';
import { useRouter } from 'next/router';
import { MODE_ACTION_MODULE, MODULE_OWNER } from '@/config/constant/common';
import { IconButton, Popover } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModuleDetail from '../ModulePage/ModuleDetail';

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
}));

const TextOwner = styled('div')(({ theme }) => ({
  fontSize: '14px',
  fontWeight: '400',
  fontFamily: 'Segoe UI',
  color: theme.palette.text.primary,
  padding: '0px 10px',
  borderRadius: 7,
  background: theme.palette.background.light,
  ...theme.components.truncate.singleLineEllipsis,
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
  {
    id: MODE_ACTION_MODULE.DESIGN,
    label: MODE_ACTION_MODULE.DESIGN,
    mode: MODE_ACTION_MODULE.DESIGN,
  },
  {
    id: MODE_ACTION_MODULE.CLONE,
    label: MODE_ACTION_MODULE.CLONE,
    mode: MODE_ACTION_MODULE.CLONE,
  },
  {
    id: MODE_ACTION_MODULE.DELETE,
    label: MODE_ACTION_MODULE.DELETE,
    mode: MODE_ACTION_MODULE.DELETE,
  },
];

const ModuleItem = ({ data, nodeType }) => {
  const route = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenModuleDetail, setIsOpenModuleDetail] = useState(false);

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

  const redirectToModulePage = () => {
    console.log('data: ', data);
    const { _id } = data;
    console.log('replace');
    route.push(`/modules/${_id}`);
  };

  const handleClickActionMenu = (mode) => {
    switch (mode) {
      case MODE_ACTION_MODULE.DETAILS:
        setIsOpenModuleDetail(true);
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
      disable={data.disable.toString()}>
      <div>
        <DragIcon />
      </div>
      <div className="content">
        <div className="div-name">
          <Text onClick={redirectToModulePage}>{data.name}</Text>
          <TextOwner>
            {data.owner.toUpperCase() === MODULE_OWNER.SYSTEM ? MODULE_OWNER.MODULE_SYSTEM : MODULE_OWNER.CUSTOM_MODULE}
          </TextOwner>
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
                if (data?.owner.toUpperCase() === MODULE_OWNER.SYSTEM && mode === MODE_ACTION_MODULE.DELETE) {
                  return;
                }
                if (data?.owner.toUpperCase() !== MODULE_OWNER.SYSTEM && mode === MODE_ACTION_MODULE.CLONE) {
                  return;
                }
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
      <ModuleDetail open={isOpenModuleDetail} onClose={() => setIsOpenModuleDetail(false)} moduleId={data._id} />
    </Item>
  );
};

export default ModuleItem;
