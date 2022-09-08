import { createModel } from '@rematch/core';

const eventError = createModel({
  state: {
    dataEventError: [],
    numberError: 0,
  },
  reducers: {
    setDataEventError: (state, dataEventError) => ({ ...state, dataEventError }),
    setNumberError: (state, numberError) => ({ ...state, numberError }),
  },
  effects: (dispatch) => {
    return {};
  },
});

export default eventError;
