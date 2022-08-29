import { styled } from '@mui/material';
import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

const Container = styled('div')(({ theme }) => ({
  border: `solid 1px ${theme.shape.backgroundNode}`,
  borderRadius: '50%',
  width: '80px',
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.shape.backgroundNode,
}));

const ActivityFinalNode = () => {
  return (
    <Container>
      <Handle type="source" position={Position.Bottom} id="a1" style={{ background: '#555' }} />
      <Handle type="target" position={Position.Top} id="c1" style={{ background: '#555' }} />
      <div>END</div>
    </Container>
  );
};

export default ActivityFinalNode;
