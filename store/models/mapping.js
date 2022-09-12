import { createModel } from '@rematch/core';

const mapping = createModel({
  state: {
    numberError: 0,
    errorFunctions: [],
  },
  reducers: {
    setNumberError: (state, numberError) => ({ ...state, numberError }),
    setErrorFunctions: (state, errorFunctions) => ({ ...state, errorFunctions }),
  },
  effects: (dispatch) => {
    return {};
  },
});

export default mapping;
