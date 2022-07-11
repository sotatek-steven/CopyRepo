import { styled } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import ActionPopover from './ActionPopover';

const Card = styled('article')(({ color, theme }) => ({
  padding: '10px 15px',
  borderRadius: 30,
  width: 208,
  height: 94,
  backgroundColor: color || '#BEA75A',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.primary.contrastText,
}));

const CardHeader = styled('header')(() => ({
  marginBottom: 8,
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 7,
}));

const Button = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  transition: 'color, 0.2s',
  fontSize: 17,
  ':hover': {
    color: `${theme.palette.primary.contrastText}9c`,
  },
}));

const CardBody = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}));

const Content = styled('p')(({ theme }) => ({
  margin: 0,
  textAlign: 'center',
  fontSize: 14,
  fontFamily: 'Segoe UI',
  fontWeight: theme.typography.fontWeightBold,
  ...theme.components.truncate.twoLineEllipsis,
}));

const SimpleRectangleNode = ({ data, id }) => {
  const { name, onDeleteNode, _id: functionId, color } = data;
  const [anchorEl, setAnchorEl] = useState(null);
  const moduleState = useSelector((state) => state.userModule);

  const open = Boolean(anchorEl);

  const deleteModule = (event) => {
    event.stopPropagation();
    if (!onDeleteNode) return;
    onDeleteNode(id, functionId);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card color={color}>
        <CardHeader>
          <Button onClick={handlePopoverOpen}>
            <MoreVertIcon />
          </Button>
          {moduleState?.owner.toLowerCase() !== 'system' && (
            <Button onClick={deleteModule}>
              <CloseIcon />
            </Button>
          )}
        </CardHeader>
        <CardBody>
          <Content>{name}</Content>
        </CardBody>
      </Card>
      <ActionPopover open={open} anchorEl={anchorEl} handlePopoverClose={handlePopoverClose} functionId={functionId} />
    </>
  );
};

export default SimpleRectangleNode;
