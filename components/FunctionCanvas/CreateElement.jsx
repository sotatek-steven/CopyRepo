import _ from 'lodash';

export const createNodes = (functions, coordinates) => {
  if (!functions || !coordinates) return [];
  let edges = [];

  const nodes = coordinates.map((item) => {
    const { position, func: functionId } = item;
    const type = 'simpleRectangle';
    const data = functions.find((funcData) => {
      return funcData._id === functionId;
    });

    edges = _.unionBy(_.concat(edges, createEdges(item?.func, data?.dependencies)), 'id');
    return {
      id: item?.func,
      type,
      data: {
        ...data,
      },
      position,
    };
  });

  return { nodes, edges };
};

export const createEdges = (nodeId, dependencies) => {
  if (!dependencies?.length) return [];
  const edges = dependencies?.map((depen) => {
    return {
      id: `${depen}-${nodeId}`,
      source: depen,
      target: nodeId,
      markerEnd: { type: 'arrowclosed', color: '#fff' },
      style: { strokeWidth: 2 },
    };
  });

  return edges;
};
