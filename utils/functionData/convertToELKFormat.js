import { PARENT_TYPE } from './flowElement';

export const convertToELKFormat = ({ nodes, edges }) => {
  if (nodes.length === 0 && edges.length === 0) return;

  const flowList = getAllFlow({ nodes, edges });

  const createGraph = (flow) => {
    const children = flow.map((nodeId) => {
      const nodeData = nodes.find((item) => item.id === nodeId);

      const { type } = nodeData;
      if (PARENT_TYPE.includes(type)) {
        const child = nodes.find((item) => item.parentNode === nodeData.id);
        const subFlow = flowList.find((item) => item.includes(child.id));
        if (type === 'parent')
          return {
            ...nodeData.data.size,
            ...nodeData,
            ...createGraph(subFlow),
            layoutOptions: {
              'nodePlacement.strategy': 'SIMPLE',
              'elk.direction': 'DOWN',
              'spacing.nodeNodeBetweenLayers': 55,
            },
          };
        return {
          ...nodeData.data.size,
          ...nodeData,
          ...createGraph(subFlow),
          labels: [
            {
              text: 'abc',
              width: 200,
              height: 70,
            },
          ],
          layoutOptions: {
            'nodeLabels.placement': '[H_CENTER, V_TOP, INSIDE]',
            'nodePlacement.strategy': 'SIMPLE',
            'elk.direction': 'DOWN',
          },
        };
      }

      return {
        ...nodeData.data.size,
        ...nodeData,
      };
    });

    let edgeList = [];
    flow.forEach((nodeId) => {
      const _edges = edges.filter((item) => item.source === nodeId);
      edgeList = edgeList.concat(_edges);
    });

    return {
      children,
      edges: edgeList,
    };
  };

  const initialBlock = nodes.find((item) => item.type === 'initial');

  const initialFlow = flowList.find((flow) => flow.includes(initialBlock.id));
  let graphLayout = createGraph(initialFlow);
  graphLayout.id = '0';
  graphLayout.layoutOptions = {
    'elk.direction': 'DOWN',
    interactiveLayout: 'true',
    'spacing.nodeNodeBetweenLayers': 30,
  };

  return graphLayout;
};

const getAllFlow = ({ nodes, edges }) => {
  const adjList = {};
  for (const { source, target } of edges) {
    if (!adjList[source]) {
      adjList[source] = [];
    }
    adjList[source].push(target);
  }

  const result = [];
  // eslint-disable-next-line no-undef
  const visited = new Set();
  const sourceNodes = Object.keys(adjList);
  const otherNodes = nodes.filter((item) => !sourceNodes.includes(item.id));
  const otherNodesId = otherNodes.map((item) => item.id);
  const _nodes = sourceNodes.concat(otherNodesId);

  for (const node of _nodes) {
    if (visited.has(node)) continue;

    const queue = [node];
    const flow = [];
    visited.add(node);
    while (queue.length) {
      const u = queue.shift();
      flow.push(u);
      if (!adjList[u]) continue;
      for (const v of adjList[u]) {
        if (!visited.has(v)) {
          queue.push(v);
          visited.add(v);
        }
      }
    }

    result.push(flow);
  }

  return result;
};
