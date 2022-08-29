import React from 'react';
import { Button } from '@mui/material';
import useBlock from '@/hooks/useBlock';
import IconDeleteNode from 'assets/icon/IconDeleteNode.svg';
import { useSelector } from 'react-redux';

const ButtonRemoveNode = ({ id }) => {
  const logicBlocksState = useSelector((state) => state.logicBlocks);
  const { removeNode, deleteDropNode } = useBlock();

  const onClick = () => {
    const node = logicBlocksState.find((item) => item?.id === id);
    if (node?.type !== 'drop') {
      removeNode(id);
    } else {
      deleteDropNode(id);
    }
  };

  return (
    <Button className="action-icon" onClick={onClick}>
      <IconDeleteNode />
    </Button>
  );
};

export default ButtonRemoveNode;
