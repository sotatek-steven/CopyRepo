let id = 0;

export const generateNodeId = () => `dndnode_${id++}`;

export const generateEdgeId = (source, target) => `e${source}-${target}`;