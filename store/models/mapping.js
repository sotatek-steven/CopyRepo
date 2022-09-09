import { createModel } from '@rematch/core';

const mapping = createModel({
  state: {
    numberError: 0,
  },
  reducers: {
    setNumberError: (state, numberError) => ({ ...state, numberError }),
  },
  effects: (dispatch) => {
    return {};
  },
});

export default mapping;
