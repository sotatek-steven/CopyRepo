import { createModel } from '@rematch/core';

const eventError = createModel({
  state: {
    dataEventError: [],
  },
  reducers: {
    setDataEventError: (state, dataEventError) => ({ ...state, dataEventError }),
  },
  effects: (dispatch) => {
    return {};
  },
});

export default eventError;
