import { getRequest } from '@/utils/httpRequest';
import { createModel } from '@rematch/core';

const struct = createModel({
  state: {
    originStructs: [],
    structs: [],
  },
  reducers: {
    setStructs: (state, structs) => ({ ...state, structs }),
    setOriginStructs: (state, originStructs) => ({ ...state, originStructs }),
  },
  effects: (dispatch) => {
    return {};
  },
});

export default struct;
