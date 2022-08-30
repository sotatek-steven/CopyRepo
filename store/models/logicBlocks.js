import { createModel } from '@rematch/core';
import ObjectID from 'bson-objectid';

const logicBlocks = createModel({
  state: {
    nodes: [
      {
        id: ObjectID(24).toHexString(),
        type: 'initial',
        position: {
          x: 600,
          y: 300,
        },
      },
      {
        id: ObjectID(24).toHexString(),
        type: 'drop',
        position: {
          x: 600,
          y: 500,
        },
      },
      {
        id: ObjectID(24).toHexString(),
        type: 'activityFinal',
        position: {
          x: 600,
          y: 700,
        },
      },
    ],
    edges: [],
  },
  reducers: {
    setBlocks: (state, data) => {
      return { ...state, nodes: data };
    },
    updateBlock: (state, blockId, blockData) => {
      const { nodes: blocksList } = state;
      const updatedBlocksList = blocksList.map((item) => {
        if (item.id === blockId)
          return {
            ...item,
            data: blockData,
          };

        return item;
      });
      return { ...state, nodes: updatedBlocksList };
    },
    addBlock: (state, block) => {
      const { nodes: blocksList } = state;
      return { ...state, nodes: [...blocksList, block] };
    },
    removeBlock: (state, blockId) => {
      const { nodes: blocksList } = state;
      const updatedBlocksList = blocksList.filter((el) => el.id !== blockId);
      return { ...state, nodes: updatedBlocksList };
    },
  },
  effects: (dispatch) => {
    return {
      convertToFEDataDisplay(blockData) {
        const blocksList = [];
        const createBlocks = (blockData, parentNodeId) => {
          let parentNode;
          const { type, next, position, nextTrue, nextFalse, params } = blockData;
          switch (type) {
            case 'init':
              blocksList.push(createInitNode(position));
              break;
            case 'declaration':
              blocksList.push(createDeclarationNode(position, params, parentNodeId));
              break;
            case 'assignment':
              blocksList.push(createAssignmentNode(position, params, parentNodeId));
              break;
            case 'condition':
              parentNode = createParentNode(blockData.parent.position, parentNodeId);
              blocksList.push(parentNode);
              blocksList.push(createConditionNode(position, blockData.conditions, parentNode.id));
              if (nextTrue) createBlocks({ ...nextTrue, branch: 'true' }, parentNode.id);
              if (nextFalse) createBlocks({ ...nextFalse, branch: 'false' }, parentNode.id);
              break;
            case 'logic':
              blocksList.push(createLogicNode(position, params, parentNodeId));
              break;
            case 'finish':
              blocksList.push(createFinishNode(position, { action: blockData.action, params }, parentNodeId));
              break;
            case 'activityFinal':
              blocksList.push(createActivityFinalNode(position));
              break;
          }

          if (!next) return;
          createBlocks(next);
        };

        createBlocks(blockData);
        return blocksList;
      },
      // convertToDataTransferApi(data) {},
      checkDeclarationEditing() {
        console.log('logicBlocks', logicBlocks);
      },
    };
  },
});

export default logicBlocks;

const createInitNode = (position) => {
  return {
    id: ObjectID(24).toHexString(),
    type: 'initial',
    position,
  };
};

const createDeclarationNode = (position, data, parentNodeId) => {
  if (parentNodeId)
    return {
      id: ObjectID(24).toHexString(),
      type: 'declaration',
      position,
      data,
      parentNode: parentNodeId,
      extent: 'parent',
    };
  return {
    id: ObjectID(24).toHexString(),
    type: 'declaration',
    position,
    data,
  };
};

const createAssignmentNode = (position, data, parentNodeId) => {
  if (parentNodeId)
    return {
      id: ObjectID(24).toHexString(),
      type: 'assignment',
      position,
      data,
      parentNode: parentNodeId,
      extent: 'parent',
    };
  return {
    id: ObjectID(24).toHexString(),
    type: 'assignment',
    position,
    data,
  };
};

const createConditionNode = (position, data, parentNodeId) => {
  if (parentNodeId)
    return {
      id: ObjectID(24).toHexString(),
      type: 'condition',
      position: position,
      data,
      parentNode: parentNodeId,
      extent: 'parent',
    };
  return {
    id: ObjectID(24).toHexString(),
    type: 'condition',
    position: position,
    data,
  };
};

const createParentNode = (position, parentNodeId) => {
  if (parentNodeId)
    return {
      id: ObjectID(24).toHexString(),
      type: 'parent',
      position,
      style: {
        width: 300,
        height: 200,
      },
      parentNode: parentNodeId,
    };
  return {
    id: ObjectID(24).toHexString(),
    type: 'parent',
    position,
    style: {
      width: 300,
      height: 200,
    },
  };
};

const createLogicNode = (position, data, parentNodeId) => {
  if (parentNodeId)
    return {
      id: ObjectID(24).toHexString(),
      type: 'logic',
      position,
      data,
      parentNode: parentNodeId,
      extent: 'parent',
    };
  return {
    id: ObjectID(24).toHexString(),
    type: 'logic',
    position,
    data,
  };
};

const createFinishNode = (position, data, parentNodeId) => {
  if (parentNodeId)
    return {
      id: ObjectID(24).toHexString(),
      type: 'finish',
      position,
      data,
      parentNode: parentNodeId,
      extent: 'parent',
    };
  return {
    id: ObjectID(24).toHexString(),
    type: 'finish',
    position,
    data,
  };
};

const createActivityFinalNode = (position) => {
  return {
    id: ObjectID(24).toHexString(),
    type: 'activityFinal',
    position,
  };
};
