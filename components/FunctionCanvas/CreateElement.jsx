let nodeId = 0;

export const generateNodeId = () => `dndnode_${nodeId++}`;

export const createNodes = (functions, coordinates) => {
  if (!functions || !coordinates) return [];

  const nodes = coordinates.map((item) => {
    const { position, func: functionId } = item;
    const type = 'simpleRectangle';
    const data = functions.find((funcData) => {
      return funcData._id === functionId;
    });
    return {
      id: generateNodeId(),
      type,
      data: {
        ...data,
      },
      position,
    };
  });

  return nodes;
};
