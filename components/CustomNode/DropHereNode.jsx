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

const DropHereNode = (props) => {
  const {
    id,
    xPos,
    yPos,
    data: { allowRemove },
  } = props;
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

  const createParentNode = (position, parentId = '') => {
    return {
      id: id,
      type: 'parent',
      position: position,
      dragHandle: 'dragHandle',
      parentNode: parentId,
      data: {
        width: 700,
        height: 500,
      },
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
      data: { allowRemove: true },
    };
  };

  const createIfElseBlocks = (dataBlock) => {
    const conditionId = ObjectID(24).toHexString();
    const dropIdTrue = ObjectID(24).toHexString();
    const dropIdFalse = ObjectID(24).toHexString();

    const nodes = [];

    nodes.push(createParentNode(dataBlock?.position, dataBlock?.parentNode));
    nodes.push(createConditionNode({ x: 275, y: 15 }, conditionId, {}));
    nodes.push(createDropItemNode({ x: 50, y: 300 }, dropIdTrue));
    nodes.push(createDropItemNode({ x: 450, y: 300 }, dropIdFalse));

    const edges = [];
    // Edge True
    edges.push(createEdge(conditionId, dropIdTrue, 'step', 'True', 'left'));
    // Edge False
    edges.push(createEdge(conditionId, dropIdFalse, 'step', 'False', 'right'));

    return { nodes, edges };
  };

  const updateWidthHeight = (listNode, currentNode) => {
    if (currentNode?.parentNode) {
      const currentNew = listNode?.find((item) => item.id === currentNode.parentNode);
      const index = listNode?.findIndex((item) => item.id === currentNew.id);
      // update width, height
      if (currentNode?.type !== 'condition') {
        listNode[index].data = {
          width: listNode[index].data?.width + 200,
          height: listNode[index].data?.height + 300,
        };
      } else {
        listNode[index].data = {
          width: listNode[index].data?.width + 600,
          height: listNode[index].data?.height + 1100,
        };
      }

      for (let i = index + 1; i < listNode.length; i++) {
        if (!listNode[i].parentNode) {
          listNode[i].position.y = listNode[i].position.y + 300;
        }
      }

      if (currentNew?.parentNode) {
        updateWidthHeight(listNode, currentNew);
      }
    }

    return listNode;
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (!event.dataTransfer) return;
    const type = event.dataTransfer.getData('application/reactflow');
    const dataBlock = blocksState.find((item) => item.id === id);
    const index = blocksState.findIndex((item) => item.id === id);

    let newBlocks = [];
    let newEdges = [];
    let yPlus = 0;
    switch (type) {
      case 'logic':
        {
          const { nodes, edges } = createIfElseBlocks(dataBlock);
          newBlocks = newBlocks.concat(nodes);
          newEdges = newEdges.concat(edges);
          yPlus = 600;
        }
        break;
      default: {
        yPlus = 300;

        if (dataBlock?.parentNode) {
          newBlocks.push({
            id: id,
            type: type,
            position: dataBlock?.position,
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
      data: { allowRemove },
      position: {
        ...dataBlock?.position,
        y: dataBlock?.position.y + yPlus,
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
      _blocksState.splice(index, 1);

      newBlocks.push({ ...updateDropItem, parentNode: dataBlock?.parentNode, extent: 'parent' });
      newEdges.push(createEdge(id, dropId));
    } else {
      _blocksState.splice(index, 2);
      _edgesState.splice(edgesState.length - 1, 1);

      newBlocks.push(updateDropItem);
      newBlocks.push(activityFinalNode);
      newEdges.push(createEdge(id, dropId));
      newEdges.push(createEdge(dropId, endId));
    }

    const currentNode = type === 'condition' ? newBlocks[1] : newBlocks[0];

    _blocksState = _blocksState.concat(newBlocks);
    _edgesState = _edgesState.concat(newEdges);

    const updateBlock = updateWidthHeight(_blocksState, currentNode);

    logicBlocks.setBlocks(updateBlock);
    logicBlocks.setEdgeBlocks(_edgesState);

    setIsAllowDrop(false);
  };

  return (
    <>
      <Card isAllowDrop={isAllowDrop} onDragOver={allowDrop} onDragLeave={notAllowDrop} onDrop={handleDrop}>
        {allowRemove && (
          <AbsoluteContainer className="action-node">
            <ButtonRemoveNode id={id} />
          </AbsoluteContainer>
        )}
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
