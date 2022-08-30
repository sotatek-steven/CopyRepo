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
        const edgesList = [];
        const createBlocks = (blockData, groupId, parent) => {
          let parentNode;
          let newNode;
          let conditionNode;
          const { type, next, position, nextTrue, nextFalse, params } = blockData;
          switch (type) {
            case 'init':
              newNode = createInitNode(position);
              blocksList.push(newNode);
              break;
            case 'declaration':
              newNode = createDeclarationNode(position, params, groupId);
              blocksList.push(newNode);
              break;
            case 'assignment':
              newNode = createAssignmentNode(position, params, groupId);
              blocksList.push(newNode);
              break;
            case 'condition':
              parentNode = createParentNode(blockData.parent.position, groupId);
              newNode = parentNode;
              blocksList.push(parentNode);
              conditionNode = createConditionNode(position, blockData.conditions, parentNode.id);
              blocksList.push(conditionNode);
              if (nextTrue) createBlocks({ ...nextTrue, branch: 'true' }, parentNode.id, conditionNode.id);
              if (nextFalse) createBlocks({ ...nextFalse, branch: 'false' }, parentNode.id, conditionNode.id);
              break;
            case 'logic':
              newNode = createLogicNode(position, params, groupId);
              blocksList.push(newNode);
              break;
            case 'finish':
              newNode = createFinishNode(position, { action: blockData.action, params }, groupId);
              blocksList.push(newNode);
              break;
            case 'activityFinal':
              newNode = createActivityFinalNode(position);
              blocksList.push(newNode);
              break;
          }

          if (parent && newNode) {
            edgesList.push(createEdge(newNode.id, parent));
          }
          if (!next) return;
          createBlocks(next, null, newNode.id);
        };

        createBlocks(blockData);
        return {
          nodes: blocksList,
          edges: edgesList,
        };
      },
      // convertToDataTransferApi(data) {},
    };
  },
});

export default logicBlocks;

const createEdge = (target, source) => {
  return {
    id: `${source}-${target}`,
    source,
    target,
    markerEnd: { type: 'arrowclosed', color: '#fff' },
    style: { strokeWidth: 2 },
  };
};

const createInitNode = (position) => {
  return {
    id: ObjectID(24).toHexString(),
    type: 'initial',
    position,
  };
};

const createDeclarationNode = (position, data, groupId) => {
  if (groupId)
    return {
      id: ObjectID(24).toHexString(),
      type: 'declaration',
      position,
      data,
      parentNode: groupId,
      extent: 'parent',
    };
  return {
    id: ObjectID(24).toHexString(),
    type: 'declaration',
    position,
    data,
  };
};

const createAssignmentNode = (position, data, groupId) => {
  if (groupId)
    return {
      id: ObjectID(24).toHexString(),
      type: 'assignment',
      position,
      data,
      parentNode: groupId,
      extent: 'parent',
    };
  return {
    id: ObjectID(24).toHexString(),
    type: 'assignment',
    position,
    data,
  };
};

const createConditionNode = (position, data, groupId) => {
  if (groupId)
    return {
      id: ObjectID(24).toHexString(),
      type: 'condition',
      position: position,
      data,
      parentNode: groupId,
      extent: 'parent',
    };
  return {
    id: ObjectID(24).toHexString(),
    type: 'condition',
    position: position,
    data,
  };
};

const createParentNode = (position, groupId) => {
  if (groupId)
    return {
      id: ObjectID(24).toHexString(),
      type: 'parent',
      position,
      style: {
        width: 300,
        height: 200,
      },
      parentNode: groupId,
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

const createLogicNode = (position, data, groupId) => {
  if (groupId)
    return {
      id: ObjectID(24).toHexString(),
      type: 'logic',
      position,
      data,
      parentNode: groupId,
      extent: 'parent',
    };
  return {
    id: ObjectID(24).toHexString(),
    type: 'logic',
    position,
    data,
  };
};

const createFinishNode = (position, data, groupId) => {
  if (groupId)
    return {
      id: ObjectID(24).toHexString(),
      type: 'finish',
      position,
      data,
      parentNode: groupId,
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
