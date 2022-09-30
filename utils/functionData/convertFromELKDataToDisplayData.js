import _ from 'lodash';

export const convertFromELKDataToDisplayData = (ELKData) => {
  if (!ELKData || _.isEmpty(ELKData)) return {};
  let nodes = [];
  let edges = [];
  const convertData = (data) => {
    if (!data || _.isEmpty(data)) return;
    const { children, edges: v } = data;
    //get node of flow
    const _nodes = children.map((item) => {
      const { id, type, data, x, y, parent, parentNode, width, height } = item;
      // const _data = type === 'parent' ? {...data, size: }
      return {
        id,
        type,
        data: { ...data, width, height },
        position: { x, y },
        parent,
        parentNode,
      };
    });

    nodes = nodes.concat(_nodes);

    //get edges of flow
    const _edges = v.map((item) => {
      const { id, source, target, type, markerEnd, style, label, sourceHandle } = item;
      return {
        id,
        source,
        target,
        type,
        markerEnd,
        style,
        label,
        sourceHandle,
      };
    });

    edges = edges.concat(_edges);

    children.forEach((element) => {
      const { children } = element;
      if (children) {
        convertData(element);
      }
    });
  };

  convertData(ELKData);
  return {
    nodes,
    edges,
  };
};
