import { getRequest } from '@/utils/httpRequest';
import { createModel } from '@rematch/core';

const struct = createModel({
  state: {
    isChanged: false,
    originStructs: [],
    structs: [],
  },
  reducers: {
    setStructs: (state, structs) => ({ ...state, structs }),
    setOriginStructs: (state, originStructs) => ({ ...state, originStructs }),
    setIsChanged: (state, isChanged) => ({ ...state, isChanged }),
  },
  effects: (dispatch) => {
    return {};
  },
});

export default struct;
