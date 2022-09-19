import { createModel } from '@rematch/core';

const error = createModel({
  state: {
    dataError: [],
    numberError: 0,
  },
  reducers: {
    setDataError: (state, dataError) => ({ ...state, dataError }),
    setNumberError: (state, numberError) => ({ ...state, numberError }),
    resetError: (state) => ({ ...state, dataError: [], numberError: 0 }),
  },
  effects: (dispatch) => {
    return {};
  },
});

export default error;
