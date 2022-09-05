import { styled } from '@mui/material';
import ObjectID from 'bson-objectid';
import React, { useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';
import ButtonRemoveNode from '../atom/ButtonRemoveNode';

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

const AbsoluteContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'end',
  position: 'absolute',
  height: 25,
  right: 0,
  top: -26,
  '.action-icon': {
    minWidth: 28,
    background: theme.palette.success.main,
    '&:hover': {
      background: theme.palette.success.light,
    },
  },
}));

const yPlus = 700;

const DropHereNode = (props) => {
  const { id, xPos, yPos } = props;
  const { nodes: blocksState, edges: edgesState } = useSelector((state) => state.logicBlocks);
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

  const createEdge = (source, target, type, label, sourceHandle) => {
    return {
      id: `${source}-${target}`,
      source,
      target,
      type: type,
      label: label,
      sourceHandle,
      markerEnd: { type: 'arrowclosed', color: '#fff' },
      style: { strokeWidth: 2 },
    };
  };

  const createParentNode = (position) => {
    return {
      id: id,
      type: 'parent',
      position: position,
      dragHandle: 'dragHandle',
    };
  };

  const createConditionNode = (position, idNode, data) => {
    return {
      id: idNode,
      type: 'condition',
      position: position,
      data,
      parentNode: id,
      extent: 'parent',
      dragHandle: 'dragHandle',
    };
  };

  const createDropItemNode = (position, idNode) => {
    return {
      id: idNode,
      type: 'drop',
      position,
      parentNode: id,
      extent: 'parent',
      dragHandle: 'dragHandle',
    };
  };

  const createIfElseBlocks = () => {
    const conditionId = ObjectID(24).toHexString();
    const dropIdTrue = ObjectID(24).toHexString();
    const dropIdFalse = ObjectID(24).toHexString();

    const nodes = [];

    nodes.push(createParentNode({ x: xPos, y: yPos }));
    nodes.push(createConditionNode({ x: 250, y: 15 }, conditionId, {}));
    nodes.push(createDropItemNode({ x: 50, y: 300 }, dropIdTrue));
    nodes.push(createDropItemNode({ x: 450, y: 300 }, dropIdFalse));

    const edges = [];
    // Edge True
    edges.push(createEdge(conditionId, dropIdTrue, 'step', 'True', 'left'));
    // Edge False
    edges.push(createEdge(conditionId, dropIdFalse, 'step', 'False', 'right'));

    return { nodes, edges };
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (!event.dataTransfer) return;
    const type = event.dataTransfer.getData('application/reactflow');
    const dataBlock = blocksState.find((item) => item.id === id);
    console.log('dataBlock', dataBlock);

    let newBlocks = [];
    let newEdges = [];
    switch (type) {
      case 'logic':
        {
          const { nodes, edges } = createIfElseBlocks();
          newBlocks = newBlocks.concat(nodes);
          newEdges = newEdges.concat(edges);
        }
        break;
      default: {
        if (dataBlock?.parentNode) {
          newBlocks.push({
            id: id,
            type: type,
            position: {
              x: xPos,
              y: yPos,
            },
            data: {},
            parentNode: dataBlock?.parentNode,
            extent: 'parent',
            dragHandle: 'dragHandle',
          });
        } else {
          newBlocks.push({
            id: id,
            type: type,
            position: {
              x: xPos,
              y: yPos,
            },
            data: {},
            dragHandle: 'dragHandle',
          });
        }
      }
    }

    const dropId = ObjectID(24).toHexString();
    const endId = ObjectID(24).toHexString();

    const updateDropItem = {
      id: dropId,
      type: 'drop',
      position: {
        x: xPos,
        y: yPos + yPlus,
      },
      dragHandle: 'dragHandle',
    };

    const activityFinalNode = {
      id: endId,
      type: 'activityFinal',
      position: {
        x: xPos,
        y: blocksState[blocksState.length - 1].position.y + yPlus,
      },
      dragHandle: 'dragHandle',
    };

    let _blocksState = [...blocksState];
    let _edgesState = [...edgesState];

    if (dataBlock?.parentNode) {
      newBlocks.push({ ...updateDropItem, parentNode: dataBlock?.parentNode, extent: 'parent' });
      newEdges.push(createEdge(id, dropId));
    } else {
      const dropItemIndex = blocksState.findIndex((item) => item.id === id);
      _blocksState.splice(dropItemIndex, 2);

      newBlocks.push(updateDropItem);
      newBlocks.push(activityFinalNode);
      newEdges.push(createEdge(id, dropId));
      newEdges.push(createEdge(dropId, endId));
    }

    _blocksState = _blocksState.concat(newBlocks);
    _edgesState = _edgesState.concat(newEdges);

    logicBlocks.setBlocks(_blocksState);
    logicBlocks.setEdgeBlocks(_edgesState);

    setIsAllowDrop(false);
  };

  return (
    <>
      <Card isAllowDrop={isAllowDrop} onDragOver={allowDrop} onDragLeave={notAllowDrop} onDrop={handleDrop}>
        <AbsoluteContainer className="action-node">
          <ButtonRemoveNode id={id} />
        </AbsoluteContainer>
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
