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
  createForLoopConditionNode,
  createInitNode,
  createLogicNode,
  createParentNode,
  createRequireNode,
  createReturnNode,
  createReturnsNode,
  createRevertNode,
} from '@/utils/functionData/flowElement';

export const convertToDataDisplay = (blockData) => {
  const blocksList = [];
  const edgesList = [];
  const createBlocks = (blockData, groupId, parent) => {
    let parentNode;
    let newNode;
    let conditionNode;
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
        parentNode = createParentNode(parent?._id, parent?.position, { size: parent?.size }, groupId);
        newNode = parentNode;
        blocksList.push(parentNode);
        conditionNode = createConditionNode(_id, position, { conditions, size }, parentNode.id);
        blocksList.push(conditionNode);
        if (nextTrue) createBlocks({ ...nextTrue, branch: 'true' }, parentNode.id, conditionNode.id);
        if (nextFalse) createBlocks({ ...nextFalse, branch: 'false' }, parentNode.id, conditionNode.id);
        break;
      }
      case 'loopFor': {
        const { parent } = blockData;
        parentNode = createParentNode(parent?._id, parent?.position, { size: parent?.size }, groupId);
        newNode = parentNode;
        blocksList.push(parentNode);
        const { start, step, condition, next } = params;
        conditionNode = createForLoopConditionNode(_id, position, { start, step, condition }, parentNode.id);
        blocksList.push(conditionNode);
        if (next) createBlocks(next, parentNode.id, conditionNode.id);
        break;
      }
      case 'unchecked': {
        const { parent, params } = blockData;
        parentNode = createParentNode(parent?._id, parent?.position, { size: parent?.size }, groupId);
        newNode = parentNode;
        blocksList.push(parentNode);
        if (params.next) createBlocks(params.next, parentNode.id, parentNode.id);
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
        newNode = createActivityFinalNode(_id, position, { size });
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
      edgesList.push(
        createEdge(
          parent,
          newNode.id,
          blockData.branch ? 'step' : undefined,
          blockData.branch,
          blockData?.branch ? (blockData.branch === 'true' ? 'left' : 'right') : undefined
        )
      );
    }
    if (!next) {
      return;
    }
    createBlocks(next, undefined, newNode?.id);
  };

  createBlocks(blockData);
  return {
    nodes: blocksList,
    edges: edgesList,
  };
};
