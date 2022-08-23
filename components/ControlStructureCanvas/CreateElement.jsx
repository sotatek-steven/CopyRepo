import ObjectID from 'bson-objectid';

export const createNodes = (data) => {
  const nodes = data.map((item) => {
    return {
      id: ObjectID(32).toHexString(),
      data: {
        ...item,
        label: item?.indentifier,
      },
      type: item?.type,
      position: item?.position,
    };
  });
  return nodes;
};

export const createEdges = (nodes) => {
  if (!nodes || nodes.length < 2) return [];
  const edges = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const source = nodes[i].id;
    const target = nodes[i + 1].id;
    edges.push({
      id: `${source}-${target}`,
      source,
      target,
      markerEnd: { type: 'arrowclosed', color: '#fff' },
      style: { strokeWidth: 2 },
    });
  }
  return edges;
};
