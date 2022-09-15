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

    let dependencies = data?.dependencies;

    if (data?.modifiers?.length) {
      let modiDepen = [];
      data?.modifiers.forEach((modi) => {
        const idDepen = [];
        modi?.content?.dependencies.forEach((depen) => {
          if (Object.keys(depen).includes('_id')) {
            idDepen.push(depen?._id);
          } else {
            idDepen.push(depen);
          }
        });
        modiDepen = _.concat(modiDepen, idDepen);
      });
      dependencies = _.uniq(_.concat(dependencies, modiDepen));
    }

    edges = _.unionBy(_.concat(edges, createEdges(item?.func, dependencies)), 'id');
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
