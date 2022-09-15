import { generateDataType } from '@/config/constant/common';
import { createModel } from '@rematch/core';

const struct = createModel({
  state: {
    originStructs: [],
    structs: [],
    types: generateDataType(),
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
