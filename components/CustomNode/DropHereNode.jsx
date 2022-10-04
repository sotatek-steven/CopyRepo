import {
  createDeclarationNode,
  createEdge,
  createAssignmentNode,
  createConditionNode,
  createParentNode,
  createDropItemNode,
  createReturnsNode,
  createReturnNode,
  createRequireNode,
  createRevertNode,
  createAssertNode,
  createBreakNode,
  createContinueNode,
  createEmitNode,
  createForLoopNode,
} from '@/utils/functionData/flowElement';
import { styled } from '@mui/material';
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
  const { nodes: nodesState, edges: edgesState } = useSelector((state) => state.logicBlocks);
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

  const createIfElseBlocks = (dropNode) => {
    const parentNode = createParentNode(undefined, undefined, undefined, dropNode.parentNode);
    const conditionNode = createConditionNode(undefined, undefined, undefined, parentNode.id);
    const dropTrue = createDropItemNode(undefined, undefined, undefined, parentNode.id);
    const dropFalse = createDropItemNode(undefined, undefined, undefined, parentNode.id);

    const edgeTrue = createEdge(conditionNode.id, dropTrue.id, 'step', 'true', 'left');
    const edgeFalse = createEdge(conditionNode.id, dropFalse.id, 'step', 'false', 'left');

    return { nodes: [parentNode, conditionNode, dropTrue, dropFalse], edges: [edgeTrue, edgeFalse] };
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (!event.dataTransfer) return;
    const type = event.dataTransfer.getData('application/reactflow');
    const dropNodeId = id;
    const dropNode = nodesState.find((item) => item.id === id);

    let newNodes = [];
    let newEdges = [];
    switch (type) {
      case 'if_else':
        {
          const { nodes, edges } = createIfElseBlocks(dropNode);
          newNodes = newNodes.concat(nodes);
          newEdges = newEdges.concat(edges);
        }
        break;
      case 'declaration': {
        const declarationNode = createDeclarationNode(undefined, undefined, undefined, dropNode.parentNode);
        newNodes.push(declarationNode);
        break;
      }
      case 'assignment': {
        const assignmentNode = createAssignmentNode(undefined, undefined, undefined, dropNode.parentNode);
        newNodes.push(assignmentNode);
        break;
      }
      case 'return': {
        const returnNode = createReturnNode(undefined, undefined, undefined, dropNode.parentNode);
        newNodes.push(returnNode);
        break;
      }
      case 'require': {
        const requireNode = createRequireNode(undefined, undefined, undefined, dropNode.parentNode);
        newNodes.push(requireNode);
        break;
      }
      case 'revert': {
        const revertNode = createRevertNode(undefined, undefined, undefined, dropNode.parentNode);
        newNodes.push(revertNode);
        break;
      }
      case 'assert': {
        const assertNode = createAssertNode(undefined, undefined, undefined, dropNode.parentNode);
        newNodes.push(assertNode);
        break;
      }
      case 'emit': {
        const emitNode = createEmitNode(undefined, undefined, undefined, dropNode.parentNode);
        newNodes.push(emitNode);
        break;
      }
      case 'break': {
        const breakNode = createBreakNode(undefined, undefined, undefined, dropNode.parentNode);
        newNodes.push(breakNode);
        break;
      }
      case 'continue': {
        const continueNode = createContinueNode(undefined, undefined, undefined, dropNode.parentNode);
        newNodes.push(continueNode);
        break;
      }
      case 'for_loop': {
        const forLoopNode = createForLoopNode(undefined, undefined, undefined, dropNode.parentNode);
        const dropItemNode = createDropItemNode(undefined, undefined, undefined, forLoopNode.id);
        newNodes.push(forLoopNode, dropItemNode);
        break;
      }
      default:
    }

    if (newNodes.length === 0) return;

    let _nodesState = [...nodesState];
    let _edgesState = [...edgesState];

    //find parent node if any
    let mainNode;
    if (newNodes.length === 1) mainNode = newNodes[0];
    mainNode = newNodes.find((item) => !item.parentNode || item.parentNode === dropNode.parentNode);

    // update source of edge(preNode, dropNode)
    const edgeIndex = _edgesState.findIndex((item) => item.target === dropNodeId);
    if (edgeIndex >= 0) {
      _edgesState[edgeIndex].target = mainNode.id;
    }

    // add edge(mainNode, dropNode)
    newEdges.push(createEdge(mainNode.id, dropNodeId));

    _nodesState = _nodesState.concat(newNodes);
    _edgesState = _edgesState.concat(newEdges);
    logicBlocks.set({ nodes: _nodesState, edges: _edgesState });

    setIsAllowDrop(false);
  };

  return (
    <>
      <Card
        className="nodrag"
        isAllowDrop={isAllowDrop}
        onDragOver={allowDrop}
        onDragLeave={notAllowDrop}
        onDrop={handleDrop}>
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
