import { styled } from '@mui/material';
import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import ButtonRemoveNode from '../atom/ButtonRemoveNode';

const Card = styled('article')(({ theme, width, height }) => ({
  padding: '10px 15px',
  width: width || 500,
  height: height || 700,
  backgroundColor: theme.palette.background.parentNode,
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.text.primary,
  border: `1px dashed`,
  borderColor: theme.palette.text.primary,
  '&:hover': {
    '.action-node': {
      display: 'flex',
    },
  },
}));

const CardBody = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Segoe UI',
  fontStyle: 'italic',
});

const AbsoluteContainer = styled('div')(({ theme }) => ({
  display: 'none',
  justifyContent: 'end',
  position: 'absolute',
  right: 12,
  '.action-icon': {
    minWidth: 28,
    '&:hover': {
      background: theme.palette.success.main,
    },
  },
}));

const ParentNode = ({ id, data }) => {
  return (
    <>
      <Card width={data?.size.width} height={data?.size.height}>
        <AbsoluteContainer className="action-node">
          <ButtonRemoveNode id={id} />
        </AbsoluteContainer>
        <CardBody>
          <Handle type="target" position={Position.Top} id="a" style={{ background: '#555' }} />
          <Handle type="source" position={Position.Bottom} id="c" style={{ background: '#555' }} />
        </CardBody>
      </Card>
    </>
  );
};

export default ParentNode;
