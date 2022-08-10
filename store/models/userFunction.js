import { createModel } from '@rematch/core';

export const NEW_PARAMETER = {
  type: 'int',
  isArray: true,
  scope: 'public',
  name: '',
};

const userFunction = createModel({
  state: {
    name: '',
    parameters: [{ ...NEW_PARAMETER, id: Date.now() }],
    scope: 'public',
    type: 'executable',
    vitural: true,
    payable: true,
    modifier: true,
    returns: ['int'],
  },
  reducers: {
    updateName: (state, name) => ({ ...state, name }),
    updateParameters: (state, parameters) => ({ ...state, parameters }),
    updateReturn: (state, returnData) => ({ ...state, returns: returnData }),
  },
  effects: () => {
    return {};
  },
});

export default userFunction;
