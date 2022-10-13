import ObjectID from 'bson-objectid';

export const PARENT_TYPE = ['parent', 'forLoop', 'whileLoop', 'unchecked'];

//create node
export const createInitNode = (id, position, data) => {
  return {
    id: id || ObjectID(24).toHexString(),
    type: 'initial',
    position,
    data: {
      size: data?.size || {
        width: 80,
        height: 80,
      },
    },
    dragHandle: 'dragHandle',
  };
};

export const createDeclarationNode = (id, position, data, parentId) => {
  return {
    id: id || ObjectID(24).toHexString(),
    type: 'declaration',
    position,
    data: {
      ...data,
      size: data?.size || {
        width: 200,
        height: 100,
      },
    },
    dragHandle: 'dragHandle',
    ...parentInfo(parentId),
  };
};

export const createAssignmentNode = (id, position, data, parentId) => {
  return {
    id: id || ObjectID(24).toHexString(),
    type: 'assignment',
    position,
    data: {
      ...data,
      size: data?.size || {
        width: 200,
        height: 100,
      },
    },
    dragHandle: 'dragHandle',
    ...parentInfo(parentId),
  };
};

export const createRequireNode = (id, position, data, parentId) => {
  return {
    id: id || ObjectID(24).toHexString(),
    type: 'require',
    position,
    data: {
      ...data,
      size: data?.size || {
        width: 200,
        height: 100,
      },
    },
    dragHandle: 'dragHandle',
    ...parentInfo(parentId),
  };
};

export const createAssertNode = (id, position, data, parentId) => {
  return {
    id: id || ObjectID(24).toHexString(),
    type: 'assert',
    position,
    data: {
      ...data,
      size: data?.size || {
        width: 200,
        height: 100,
      },
    },
    dragHandle: 'dragHandle',
    ...parentInfo(parentId),
  };
};

export const createRevertNode = (id, position, data, parentId) => {
  return {
    id: id || ObjectID(24).toHexString(),
    type: 'revert',
    position,
    data: {
      ...data,
      size: data?.size || {
        width: 200,
        height: 100,
      },
    },
    dragHandle: 'dragHandle',
    ...parentInfo(parentId),
  };
};

export const createReturnNode = (id, position, data, parentId) => {
  return {
    id: id || ObjectID(24).toHexString(),
    type: 'return',
    position,
    data: {
      ...data,
      size: data?.size || {
        width: 200,
        height: 100,
      },
    },
    dragHandle: 'dragHandle',
    ...parentInfo(parentId),
  };
};

export const createBreakNode = (id, position, data, parentId) => {
  return {
    id: id || ObjectID(24).toHexString(),
    type: 'break',
    position,
    data: {
      ...data,
      size: data?.size || {
        width: 200,
        height: 100,
      },
    },
    dragHandle: 'dragHandle',
    ...parentInfo(parentId),
  };
};

export const createContinueNode = (id, position, data, parentId) => {
  return {
    id: id || ObjectID(24).toHexString(),
    type: 'continue',
    position,
    data: {
      ...data,
      size: data?.size || {
        width: 200,
        height: 100,
      },
    },
    dragHandle: 'dragHandle',
    ...parentInfo(parentId),
  };
};

export const createEmitNode = (id, position, data, parentId) => {
  return {
    id: id || ObjectID(24).toHexString(),
    type: 'emit',
    position,
    data: {
      ...data,
      size: data?.size || {
        width: 200,
        height: 100,
      },
    },
    dragHandle: 'dragHandle',
    ...parentInfo(parentId),
  };
};

export const createDeleteNode = (id, position, data, parentId) => {
  return {
    id: id || ObjectID(24).toHexString(),
    type: 'delete',
    position,
    data: {
      ...data,
      size: data?.size || {
        width: 200,
        height: 100,
      },
    },
    dragHandle: 'dragHandle',
    ...parentInfo(parentId),
  };
};

export const createLogicNode = (id, position, data, parentId) => {
  return {
    id: id || ObjectID(24).toHexString(),
    type: 'logic',
    position,
    data: {
      size: data?.size || {
        width: 200,
        height: 100,
      },
    },
    dragHandle: 'dragHandle',
    ...parentInfo(parentId),
  };
};

export const createParentNode = (id, position, data, parentId) => {
  return {
    id: id || ObjectID(24).toHexString(),
    type: 'parent',
    position,
    data: {
      size: data?.size || {
        width: 700,
        height: 500,
      },
    },
    dragHandle: 'dragHandle',
    ...parentInfo(parentId),
  };
};

export const createForLoopNode = (id, position, data, parentId) => {
  return {
    id: id || ObjectID(24).toHexString(),
    type: 'forLoop',
    position,
    data: {
      ...data,
      size: data?.size || {
        width: 200,
        height: 100,
      },
    },
    dragHandle: 'dragHandle',
    ...parentInfo(parentId),
  };
};

export const createWhileLoopNode = (id, position, data, parentId) => {
  return {
    id: id || ObjectID(24).toHexString(),
    type: 'whileLoop',
    position,
    data: {
      ...data,
      size: data?.size || {
        width: 200,
        height: 100,
      },
    },
    dragHandle: 'dragHandle',
    ...parentInfo(parentId),
  };
};

export const createUncheckedNode = (id, position, data, parentId) => {
  return {
    id: id || ObjectID(24).toHexString(),
    type: 'unchecked',
    position,
    data: {
      size: data?.size || {
        width: 200,
        height: 100,
      },
    },
    dragHandle: 'dragHandle',
    ...parentInfo(parentId),
  };
};

export const createAssemblyNode = (id, position, data, parentId) => {
  return {
    id: id || ObjectID(24).toHexString(),
    type: 'assembly',
    position,
    data: {
      ...data,
      size: data?.size || {
        width: 200,
        height: 100,
      },
    },
    dragHandle: 'dragHandle',
    ...parentInfo(parentId),
  };
};

export const createReturnsNode = (id, position, data, parentId) => {
  return {
    id: id || ObjectID(24).toHexString(),
    type: 'returns',
    position,
    data: {
      ...data,
      size: data?.size || {
        width: 200,
        height: 100,
      },
    },
    dragHandle: 'dragHandle',
    ...parentInfo(parentId),
  };
};

export const createConditionNode = (id, position, data, parentId) => {
  return {
    id: id || ObjectID(24).toHexString(),
    type: 'condition',
    position: position,
    data: {
      ...data,
      size: data?.size || {
        width: 140,
        height: 140,
      },
    },
    dragHandle: 'dragHandle',
    ...parentInfo(parentId),
  };
};

export const createActivityFinalNode = (_id, position, data, parentId) => {
  return {
    id: ObjectID(24).toHexString(),
    type: 'activityFinal',
    position,
    data: {
      size: data?.size || {
        width: 80,
        height: 80,
      },
    },
    dragHandle: 'dragHandle',
    ...parentInfo(parentId),
  };
};

export const createDropItemNode = (_id, position, data, parentId) => {
  return {
    id: ObjectID(24).toHexString(),
    type: 'drop',
    position,
    data: {
      allowRemove: data?.allowRemove || false,
      size: data?.size || {
        width: 200,
        height: 100,
      },
    },
    dragHandle: 'dragHandle',
    ...parentInfo(parentId),
  };
};

export const parentInfo = (parentId) =>
  parentId
    ? {
        parentNode: parentId,
        extent: 'parent',
      }
    : {};

export const createEdge = (source, target, type, label, sourceHandle) => {
  return {
    id: `${source}-${target}`,
    source,
    target,
    type,
    label,
    sourceHandle,
    markerEnd: { type: 'arrowclosed', color: '#fff' },
    style: { strokeWidth: 2 },
  };
};
