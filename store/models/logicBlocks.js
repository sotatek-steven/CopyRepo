import { createModel } from '@rematch/core';
import ObjectID from 'bson-objectid';
import _ from 'lodash';

const logicBlocks = createModel({
  state: {
    nodes: [],
    edges: [],
  },
  reducers: {
    set: (state, data) => data,
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
    addEdge: (state, newEdge) => {
      const { edges } = state;
      return { ...state, edges: [...edges, newEdge] };
    },
    removeEdge: (state, edgeId) => {
      const { edges } = state;
      const updatedEdges = edges.filter((el) => el.id !== edgeId);
      return { ...state, edges: updatedEdges };
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
          createDropItemNode(
            {
              x: 600,
              y: 500,
            },
            true
          )
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
        // console.log('blockData: ', blockData);
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
            case undefined:
              newNode = createDropNode(position, false);
              blocksList.push(newNode);
          }

          if (parent && newNode) {
            edgesList.push(createEdge(newNode.id, parent));
          }

          if (!next) {
            return;
          }
          createBlocks(next, null, newNode.id);
        };

        createBlocks(blockData);
        return {
          nodes: blocksList,
          edges: edgesList,
        };
      },
      convertToDataTransferApi({ nodes, edges }) {
        const { nodes: _nodes, edges: _edges } = removeParentNode({ nodes, edges });

        const initialNode = _nodes.find((item) => item.type === 'initial');

        let block = {};

        const createBlocks = (blocks, node) => {
          const { type, position, data, id } = node;

          switch (type) {
            case 'initial':
              blocks.type = 'init';
              blocks.position = position;
              break;
            case 'declaration':
              blocks.type = 'declaration';
              blocks.position = position;
              blocks.params = data;
              break;
            case 'assignment':
              blocks.type = 'assignment';
              blocks.position = position;
              blocks.params = data;
              break;
            case 'condition': {
              blocks.type = 'condition';
              blocks.position = position;
              blocks.conditions = data;
              blocks.parent = {};
              blocks.parent.position = node.parent.position;
              const _edgeTrue = _edges.find((edge) => edge.source === id && edge.label === 'True');
              if (_edgeTrue) {
                const nextNode = _nodes.find((item) => item.id === _edgeTrue.target);
                blocks.nextTrue = {};
                createBlocks(blocks.nextTrue, nextNode);
              }
              const _edgeFalse = _edges.find((edge) => edge.source === id && edge.label === 'False');
              if (_edgeFalse) {
                const nextNode = _nodes.find((item) => item.id === _edgeFalse.target);
                blocks.nextFalse = {};
                createBlocks(blocks.nextFalse, nextNode);
              }
              break;
            }
            case 'finish':
              blocks.type = 'finish';
              blocks.position = position;
              blocks.action = data.action;
              blocks.params = data.params;
              break;
            case 'logic':
              blocks.type = 'logic';
              blocks.position = position;
              blocks.params = data;
              break;
            case 'activityFinal':
              blocks.type = 'activityFinal';
              blocks.position = position;
              break;
            case 'drop':
              blocks.position = position;
              break;
          }

          const _edge = _edges.find((edge) => edge.source === id && _.isUndefined(edge.label));

          if (!_edge) return;
          const nextNode = _nodes.find((item) => item.id === _edge.target);
          blocks.next = {};
          createBlocks(blocks.next, nextNode);
        };

        createBlocks(block, initialNode);
        return block;
      },
    };
  },
});

export default logicBlocks;

const removeParentNode = ({ nodes, edges }) => {
  let _nodes = nodes;
  let _edges = edges;

  for (const node of nodes) {
    if (node.type !== 'parent') continue;
    const { id: parentNodeId, position: parentNodePosition } = node;

    const preNodeId = edges.find((edge) => edge.target === parentNodeId).source;

    const nextNodeId = edges.find((edge) => edge.source === parentNodeId).target;

    const directChildNode = nodes.find((node) => {
      const { id, parentNode } = node;
      const hasPreNode = !!edges.find((edge) => edge.target === id);
      return parentNode === parentNodeId && !hasPreNode;
    });

    //add info of parent node to data of direct child node
    _nodes = _nodes.map((node) => {
      if (node.id === directChildNode.id)
        return {
          ...node,
          parent: {
            position: parentNodePosition,
          },
        };

      return node;
    });

    //remove parent node
    _nodes = _nodes.filter((node) => node.id !== parentNodeId);

    //remove edge of parent node
    _edges = _edges.filter((edge) => edge.target !== parentNodeId && edge.source !== parentNodeId);

    //create edge between pre node, direct child node and next node
    _edges.push(createEdge(directChildNode.id, preNodeId), createEdge(nextNodeId, directChildNode.id));
  }

  return {
    nodes: _nodes,
    edges: _edges,
  };
};

export const createEdge = (target, source) => {
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

export const createDropItemNode = (position, allowRemove) => {
  return {
    id: ObjectID(24).toHexString(),
    type: 'drop',
    position,
    dragHandle: 'dragHandle',
    data: { allowRemove },
  };
};

const createDropNode = (position, allowRemove) => {
  return {
    id: ObjectID(24).toHexString(),
    type: 'drop',
    position,
    dragHandle: 'dragHandle',
    data: { allowRemove },
  };
};
