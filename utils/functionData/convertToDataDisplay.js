import {
  createActivityFinalNode,
  createAssemblyNode,
  createAssertNode,
  createAssignmentNode,
  createBreakNode,
  createConditionNode,
  createContinueNode,
  createDeclarationNode,
  createDeleteNode,
  createDropItemNode,
  createEdge,
  createEmitNode,
  createForLoopNode,
  createInitNode,
  createLogicNode,
  createParentNode,
  createRequireNode,
  createReturnNode,
  createReturnsNode,
  createRevertNode,
  createUncheckedNode,
} from '@/utils/functionData/flowElement';

export const convertToDataDisplay = (blockData) => {
  const blocksList = [];
  const edgesList = [];
  const createBlocks = (blockData, groupId, parent) => {
    let newNode;
    const { type, next, position, params, _id, size } = blockData;
    switch (type) {
      case 'init':
        newNode = createInitNode(_id, position, { size });
        blocksList.push(newNode);
        break;
      case 'declaration':
        newNode = createDeclarationNode(_id, position, { params, size }, groupId);
        blocksList.push(newNode);
        break;
      case 'assignment':
        newNode = createAssignmentNode(_id, position, { params, size }, groupId);
        blocksList.push(newNode);
        break;
      case 'require':
        newNode = createRequireNode(_id, position, { params, size }, groupId);
        blocksList.push(newNode);
        break;
      case 'assert':
        newNode = createAssertNode(_id, position, { params, size }, groupId);
        blocksList.push(newNode);
        break;
      case 'logic': {
        const { action } = blockData;
        switch (action) {
          case 'break':
            newNode = createBreakNode(_id, position, { params, size }, groupId);
            blocksList.push(newNode);
            break;
          case 'continue':
            newNode = createContinueNode(_id, position, { params, size }, groupId);
            blocksList.push(newNode);
            break;
          case 'emit':
            newNode = createEmitNode(_id, position, { params, size }, groupId);
            blocksList.push(newNode);
            break;
          case 'delete':
            newNode = createDeleteNode(_id, position, { params, size }, groupId);
            blocksList.push(newNode);
            break;
          default:
            newNode = createLogicNode(_id, position, { params, size }, groupId);
            blocksList.push(newNode);
            break;
        }
        break;
      }
      case 'returns':
        newNode = createReturnsNode(_id, position, { params, size }, groupId);
        blocksList.push(newNode);
        break;
      case 'condition': {
        const { nextTrue, nextFalse, conditions, parent } = blockData;
        const parentNode = createParentNode(parent?._id, parent?.position, { size: parent?.size }, groupId);
        newNode = parentNode;
        blocksList.push(parentNode);
        const conditionNode = createConditionNode(_id, position, { conditions, size }, parentNode.id);
        blocksList.push(conditionNode);
        if (nextTrue) createBlocks({ ...nextTrue, branch: 'true' }, parentNode.id, conditionNode.id);
        if (nextFalse) createBlocks({ ...nextFalse, branch: 'false' }, parentNode.id, conditionNode.id);
        break;
      }
      case 'loopFor': {
        const { start, step, condition, next } = params;
        newNode = createForLoopNode(_id, position, { start, step, condition }, groupId);
        blocksList.push(newNode);
        if (next) createBlocks(next, newNode.id);
        break;
      }
      case 'unchecked': {
        const uncheckedNode = createUncheckedNode(_id, position, { size }, groupId);
        newNode = uncheckedNode;
        blocksList.push(uncheckedNode);
        if (params.next) createBlocks(params.next, uncheckedNode.id);
        break;
      }
      case 'assembly':
        newNode = createAssemblyNode(_id, position, { params, size }, groupId);
        blocksList.push(newNode);
        break;
      case 'finish': {
        const { action } = blockData;
        switch (action) {
          case 'revert':
            newNode = createRevertNode(_id, position, { params, size }, groupId);
            blocksList.push(newNode);
            break;
          case 'return':
            newNode = createReturnNode(_id, position, { params, size }, groupId);
            blocksList.push(newNode);
            break;
        }
        break;
      }
      case 'activityFinal':
        newNode = createActivityFinalNode(_id, position, { size }, groupId);
        blocksList.push(newNode);
        break;
      case 'drop': {
        const { allowRemove } = blockData;
        newNode = createDropItemNode(_id, position, { size, allowRemove }, groupId);
        blocksList.push(newNode);
        break;
      }
    }

    if (parent && newNode) {
      let sourceHandle = undefined;
      if (blockData.branch) {
        const parentNodeData = blocksList.find((item) => item.id === parent);
        const { nextTrue, nextFalse } = parentNodeData;
        if (nextTrue && nextFalse) {
          sourceHandle = blockData.branch === 'true' ? 'left' : 'right';
        } else {
          sourceHandle = 'bottom';
        }
      }
      edgesList.push(
        createEdge(parent, newNode.id, blockData.branch ? 'step' : undefined, blockData.branch, sourceHandle)
      );
    }
    if (!next) {
      return;
    }
    createBlocks(next, groupId, newNode?.id);
  };

  createBlocks(blockData);
  return {
    nodes: blocksList,
    edges: edgesList,
  };
};
