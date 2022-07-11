import { createModel } from '@rematch/core';

const TYPES = ['int', 'boolean', 'string'];

const struct = createModel({
  state: {
    originStructs: [],
    structs: [],
    types: TYPES,
  },
  reducers: {
    setStructs: (state, structs) => ({ ...state, structs }),
    setOriginStructs: (state, originStructs) => ({ ...state, originStructs }),
    setTypes: (state, types) => ({ ...state, types }),
  },
  effects: (dispatch) => {
    return {};
  },
});

export default struct;
