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

const CardBody = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Segoe UI',
  fontWeight: theme.typography.fontWeightBold,
}));

const DeclarationNode = ({ data, id }) => {
  return (
    <Card id={id}>
      <CardBody>
        {data.label}
        <Handle type="target" position={Position.Left} id="a" style={{ background: '#555' }} />
        <Handle type="source" position={Position.Right} id="c" style={{ background: '#555' }} />
      </CardBody>
    </Card>
  );
};

export default DeclarationNode;
