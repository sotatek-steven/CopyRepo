import { styled } from '@mui/material';
import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

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
  wordBreak: 'break-all',
}));

const LogicNode = (data) => {
  return (
    <Card color={'#FFD670'}>
      {/* <CardHeader>
        <Button onClick={handlePopoverOpen}>
          <MoreVertIcon />
        </Button>
        {moduleState?.owner.toLowerCase() !== 'system' && (
          <Button onClick={deleteModule}>
            <CloseIcon />
          </Button>
        )}
      </CardHeader> */}
      <CardBody>
        <Content>{data.toString()}</Content>
        <Handle type="target" position={Position.Top} id="a" style={{ background: '#555' }} />
        <Handle type="source" position={Position.Bottom} id="c" style={{ background: '#555' }} />
      </CardBody>
    </Card>
  );
};

export default LogicNode;
