import _ from 'lodash';
import { createEdge } from './flowElement';

export const convertToDataTransferApi = ({ nodes, edges }) => {
  const { nodes: _nodes, edges: _edges } = removeParentNode({ nodes, edges });

  const initialNode = _nodes.find((item) => item.type === 'initial');

  let block = {};

  const createBlocks = (blocks, node) => {
    const { type, position, data, id } = node;
    blocks._id = id;
    blocks.size = data.size;
    if (position) blocks.position = position;

    switch (type) {
      case 'initial':
        blocks.type = 'init';
        break;
      case 'declaration':
        blocks.type = 'declaration';
        blocks.params = data.params;
        break;
      case 'assignment':
        blocks.type = 'assignment';
        blocks.params = data.params;
        break;
      case 'require':
        blocks.type = 'require';
        blocks.params = data.params;
        break;
      case 'assert':
        blocks.type = 'assert';
        blocks.params = data.params;
        break;
      case 'break':
        blocks.type = 'logic';
        block.action = 'break';
        blocks.params = data.params;
        break;
      case 'continue':
        blocks.type = 'logic';
        block.action = 'continue';
        blocks.position = position;
        blocks.params = data.params;
        break;
      case 'emit':
        blocks.type = 'logic';
        block.action = 'continue';
        blocks.params = data.params;
        break;
      case 'delete':
        blocks.type = 'logic';
        block.action = 'delete';
        blocks.params = data.params;
        break;
      case 'logic':
        blocks.type = 'logic';
        blocks.params = data.params;
        break;
      case 'returns':
        blocks.type = 'returns';
        blocks.params = data.params;
        break;
      case 'condition': {
        blocks.type = 'condition';
        blocks.conditions = data.conditions;
        // blocks.inputs = data?.inputs;
        const { parent } = node;
        blocks.parent = { _id: parent.id, position: parent.position, size: parent.size };
        const _edgeTrue = _edges.find((edge) => edge.source === id && edge.label === 'true');
        if (_edgeTrue) {
          const nextNode = _nodes.find((item) => item.id === _edgeTrue.target);
          blocks.nextTrue = {};
          createBlocks(blocks.nextTrue, nextNode);
        }
        const _edgeFalse = _edges.find((edge) => edge.source === id && edge.label === 'false');
        if (_edgeFalse) {
          const nextNode = _nodes.find((item) => item.id === _edgeFalse.target);
          blocks.nextFalse = {};
          createBlocks(blocks.nextFalse, nextNode);
        }
        break;
      }
      case 'loopFor': {
        blocks.type = 'loopFor';
        blocks.params = { ...data, next: {} };
        const edge = _edges.find((edge) => edge.source === id);
        const nextNode = _nodes.find((item) => item.id === edge.target);
        createBlocks(blocks.params.next, nextNode);
        break;
      }
      case 'unchecked': {
        blocks.type = 'unchecked';
        blocks.params = { ...data, next: {} };
        const edge = _edges.find((edge) => edge.source === id);
        const nextNode = _nodes.find((item) => item.id === edge.target);
        createBlocks(blocks.params.next, nextNode);
        break;
      }
      case 'assembly':
        blocks.type = 'assembly';
        blocks.params = data.params;
        break;
      case 'revert':
        blocks.type = 'finish';
        blocks.action = 'revert';
        blocks.params = data.params;
        break;
      case 'return':
        blocks.type = 'finish';
        blocks.action = 'return';
        blocks.params = data.params;
        break;
      case 'activityFinal':
        blocks.type = 'activityFinal';
        break;
      case 'drop':
        block.type = 'drop';
        break;
    }

    if (type !== 'activityFinal') blocks.next = {};
    const _edge = _edges.find((edge) => edge.source === id && _.isUndefined(edge.label));
    if (!_edge) return;
    const nextNode = _nodes.find((item) => item.id === _edge.target);

    createBlocks(blocks.next, nextNode);
  };

  createBlocks(block, initialNode);
  return block;
};

const removeParentNode = ({ nodes, edges }) => {
  let _nodes = nodes;
  let _edges = edges;

  for (const node of nodes) {
    if (node.type !== 'parent') continue;
    const { id: parentNodeId, position: parentNodePosition, data: parentData } = node;

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
            size: parentData.size,
            id: parentNodeId,
          },
        };

      return node;
    });

    //remove parent node
    _nodes = _nodes.filter((node) => node.id !== parentNodeId);

    //remove edge of parent node
    _edges = _edges.filter((edge) => edge.target !== parentNodeId && edge.source !== parentNodeId);

    //create edge between pre node, direct child node and next node
    _edges.push(createEdge(preNodeId, directChildNode.id), createEdge(directChildNode.id, nextNodeId));
  }

  return {
    nodes: _nodes,
    edges: _edges,
  };
};
