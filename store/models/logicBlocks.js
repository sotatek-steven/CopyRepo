import {
  createActivityFinalNode,
  createDropItemNode,
  createEdge,
  createInitNode,
} from '@/utils/functionData/flowElement';
import { createModel } from '@rematch/core';

const logicBlocks = createModel({
  state: {
    nodes: [],
    edges: [],
  },
  reducers: {
    set: (state, data) => data,
    setNodes: (state, data) => {
      return { ...state, nodes: data };
    },
    setEdges: (state, data) => {
      return { ...state, edges: data };
    },
    updateNode: (state, nodeId, nodeData) => {
      const { nodes: blocksList } = state;
      const updatedBlocksList = blocksList.map((item) => {
        if (item.id === nodeId) {
          return {
            ...item,
            data: { ...item.data, ...nodeData },
          };
        }

        return item;
      });
      return { ...state, nodes: updatedBlocksList };
    },
    addNode: (state, block) => {
      const { nodes: blocksList } = state;
      return { ...state, nodes: [...blocksList, block] };
    },
    removeNode: (state, nodeId) => {
      const { nodes: blocksList } = state;
      const updatedBlocksList = blocksList.filter((el) => el.id !== nodeId);
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

        nodes.push(createInitNode());

        nodes.push(createDropItemNode());
        nodes.push(createActivityFinalNode());

        for (let index = 1; index < nodes.length; index++) {
          edges.push(createEdge(nodes[index - 1].id, nodes[index].id));
        }

        return { nodes, edges };
      },
    };
  },
});

export default logicBlocks;
