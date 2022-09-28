export const convertToELKFormat = ({ nodes, edges }) => {
  const flowList = getAllFlow({ nodes, edges });

  const createGraph = (flow, layoutOptions) => {
    const children = flow.map((nodeId) => {
      const nodeData = nodes.find((item) => item.id === nodeId);
      if (nodeData.type === 'parent') {
        const child = nodes.find((item) => item.parentNode === nodeData.id);
        const subFlow = flowList.find((item) => item.includes(child.id));
        return {
          ...nodeData.data.size,
          ...nodeData,
          ...createGraph(subFlow, { 'nodePlacement.strategy': 'SIMPLE', 'elk.direction': 'DOWN' }),
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
      layoutOptions,
    };
  };

  const initialBlock = nodes.find((item) => item.type === 'initial');

  let layoutOptions = {
    'elk.direction': 'DOWN',
    interactiveLayout: 'true',
  };
  const initialFlow = flowList.find((item) => item.includes(initialBlock.id));
  let graphLayout = createGraph(initialFlow, layoutOptions);
  graphLayout.id = '0';

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
  for (const node of nodes) {
    if (visited.has(node.id)) continue;

    const queue = [node.id];
    const flow = [];
    visited.add(node.id);
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
