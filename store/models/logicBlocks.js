import { createModel } from '@rematch/core';
import ObjectID from 'bson-objectid';

const logicBlocks = createModel({
  state: {
    nodes: [],
    edges: [],
  },
  reducers: {
    setBlocks: (state, data) => {
      return { ...state, nodes: data };
    },
    setEdgeBlocks: (state, data) => {
      return { ...state, edges: data };
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
      createInitNode() {
        const nodes = [];
        const edges = [];

        nodes.push(
          createInitNode({
            x: 600,
            y: 300,
          })
        );

        nodes.push(
          createDropItemNode({
            x: 600,
            y: 500,
          })
        );
        nodes.push(
          createActivityFinalNode({
            x: 600,
            y: 700,
          })
        );

        for (let index = 1; index < nodes.length; index++) {
          edges.push(createEdge(nodes[index].id, nodes[index - 1].id));
        }

        return { nodes, edges };
      },
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

export const createInitNode = (position) => {
  return {
    id: ObjectID(24).toHexString(),
    type: 'initial',
    position,
    dragHandle: 'dragHandle',
  };
};

export const createDeclarationNode = (position, data, groupId) => {
  if (groupId)
    return {
      id: ObjectID(24).toHexString(),
      type: 'declaration',
      position,
      data,
      parentNode: groupId,
      extent: 'parent',
      dragHandle: 'dragHandle',
    };
  return {
    id: ObjectID(24).toHexString(),
    type: 'declaration',
    position,
    data,
    dragHandle: 'dragHandle',
  };
};

export const createAssignmentNode = (position, data, groupId) => {
  if (groupId)
    return {
      id: ObjectID(24).toHexString(),
      type: 'assignment',
      position,
      data,
      parentNode: groupId,
      extent: 'parent',
      dragHandle: 'dragHandle',
    };
  return {
    id: ObjectID(24).toHexString(),
    type: 'assignment',
    position,
    data,
    dragHandle: 'dragHandle',
  };
};

export const createConditionNode = (position, data, groupId) => {
  if (groupId)
    return {
      id: ObjectID(24).toHexString(),
      type: 'condition',
      position: position,
      data,
      parentNode: groupId,
      extent: 'parent',
      dragHandle: 'dragHandle',
    };
  return {
    id: ObjectID(24).toHexString(),
    type: 'condition',
    position: position,
    data,
    dragHandle: 'dragHandle',
  };
};

export const createParentNode = (position, groupId) => {
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
      dragHandle: 'dragHandle',
    };
  return {
    id: ObjectID(24).toHexString(),
    type: 'parent',
    position,
    style: {
      width: 300,
      height: 200,
    },
    dragHandle: 'dragHandle',
  };
};

export const createLogicNode = (position, data, groupId) => {
  if (groupId)
    return {
      id: ObjectID(24).toHexString(),
      type: 'logic',
      position,
      data,
      parentNode: groupId,
      extent: 'parent',
      dragHandle: 'dragHandle',
    };
  return {
    id: ObjectID(24).toHexString(),
    type: 'logic',
    position,
    data,
    dragHandle: 'dragHandle',
  };
};

export const createFinishNode = (position, data, groupId) => {
  if (groupId)
    return {
      id: ObjectID(24).toHexString(),
      type: 'finish',
      position,
      data,
      parentNode: groupId,
      extent: 'parent',
      dragHandle: 'dragHandle',
    };
  return {
    id: ObjectID(24).toHexString(),
    type: 'finish',
    position,
    data,
    dragHandle: 'dragHandle',
  };
};

export const createActivityFinalNode = (position) => {
  return {
    id: ObjectID(24).toHexString(),
    type: 'activityFinal',
    position,
    dragHandle: 'dragHandle',
  };
};

export const createDropItemNode = (position) => {
  return {
    id: ObjectID(24).toHexString(),
    type: 'drop',
    position,
    dragHandle: 'dragHandle',
  };
};
