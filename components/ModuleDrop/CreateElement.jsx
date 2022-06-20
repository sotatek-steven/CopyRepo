import { MarkerType } from "react-flow-renderer";

let nodeId = 0;

export const generateNodeId = () => `dndnode_${nodeId++}`;

export const generateEdgeId = (source, target) => `e${source}-${target}`;

export const createNodes = (modulesData) => {
  const nodes = modulesData.map((item) => {
    const type = 'rectangle';
    const position = {
      x: item.position.left,
      y: item.position.top,
    }
    return {
      id: generateNodeId(),
      type,
      data: {
        ...item.module,
        label: 'Input Node',
      },
      position,
    }
  });

  return nodes;
}

export const createEdges = (nodes) => {
  if (!nodes || nodes.length < 2) return [];
  const edges = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const source = nodes[i].id;
    const target = nodes[i + 1].id;
    const id = generateEdgeId(source, target);
    edges.push({
      id,
      source,
      target,
      markerEnd: { type: 'arrowclosed', color: '#fff' },
      style: { strokeWidth: 2 },
    })
  };
  return edges;
}