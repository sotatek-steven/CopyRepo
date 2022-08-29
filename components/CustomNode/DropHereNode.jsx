import { styled } from '@mui/material';
import ObjectID from 'bson-objectid';
import React, { useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';

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

const CardBody = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Segoe UI',
  fontStyle: 'italic',
});

const DropHereNode = (props) => {
  const { id, xPos, yPos } = props;
  const logicBlocksState = useSelector((state) => state.logicBlocks);
  const { logicBlocks } = useDispatch();
  const [isAllowDrop, setIsAllowDrop] = useState(false);

  const allowDrop = (event) => {
    setIsAllowDrop(true);
    event.preventDefault();
  };

  const notAllowDrop = (event) => {
    setIsAllowDrop(false);
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (!event.dataTransfer) return;
    const type = event.dataTransfer.getData('application/reactflow');

    const newNode = {
      id: ObjectID(24).toHexString(),
      type: type,
      position: {
        x: xPos,
        y: yPos,
      },
      data: null,
    };

    const dropItemIndex = logicBlocksState.findIndex((item) => item.id === id);

    const updateDropItem = {
      id,
      type: 'drop',
      position: {
        x: xPos,
        y: yPos + 100,
      },
    };

    const _logicBlocksState = [...logicBlocksState];
    _logicBlocksState.splice(dropItemIndex, 1, newNode, updateDropItem);
    logicBlocks.set(_logicBlocksState);
  };

  return (
    <>
      <Card isAllowDrop={isAllowDrop} onDragOver={allowDrop} onDragLeave={notAllowDrop} onDrop={handleDrop}>
        <CardBody>
          Drop item here
          <Handle type="target" position={Position.Top} id="a" style={{ background: '#555' }} />
          <Handle type="source" position={Position.Bottom} id="c" style={{ background: '#555' }} />
        </CardBody>
      </Card>
    </>
  );
};

export default DropHereNode;
