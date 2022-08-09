import { createModel } from '@rematch/core';

const enumState = createModel({
  state: {
    originEnums: [],
    enums: [],
  },
  reducers: {
    setEnums: (state, enums) => ({ ...state, enums }),
    setOriginEnums: (state, originEnums) => ({ ...state, originEnums }),
  },
  effects: (dispatch) => {
    return {};
  },
});

export default enumState;
