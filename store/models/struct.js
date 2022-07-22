import { VALUE_TYPE_OPTIONS } from '@/config/constant/common';
import { createModel } from '@rematch/core';

const TYPES = [...VALUE_TYPE_OPTIONS];

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
