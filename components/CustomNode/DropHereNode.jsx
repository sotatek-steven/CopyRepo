import { styled } from '@mui/material';
import React, { useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';

const Card = styled('article')(({ theme, isAllowDrop }) => ({
  padding: '10px 15px',
  borderRadius: 12,
  width: 200,
  height: 100,
  backgroundColor: theme.palette.background.light,
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.text.primary,
  border: `1px dashed`,
  borderColor: ` ${isAllowDrop ? theme.palette.success.main : theme.palette.text.primary}`,
}));

const CardBody = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Segoe UI',
  fontStyle: 'italic',
}));

const DropHereNode = ({ _id, data }) => {
  const { handleDrop } = data;
  const [isAllowDrop, setIsAllowDrop] = useState(false);

  const allowDrop = (event) => {
    setIsAllowDrop(true);
    event.preventDefault();
  };

  const notAllowDrop = (event) => {
    setIsAllowDrop(false);
    event.preventDefault();
  };

  const onDrop = (event) => {
    handleDrop(event);
  };

  return (
    <>
      <Card id={_id} isAllowDrop={isAllowDrop} onDragOver={allowDrop} onDragLeave={notAllowDrop} onDrop={onDrop}>
        <CardBody>
          Drop item here
          <Handle type="target" position={Position.Left} id="a" style={{ background: '#555' }} />
          <Handle type="source" position={Position.Right} id="c" style={{ background: '#555' }} />
        </CardBody>
      </Card>
    </>
  );
};

export default DropHereNode;
