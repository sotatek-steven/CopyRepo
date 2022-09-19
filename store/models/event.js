import { createModel } from '@rematch/core';

const event = createModel({
  state: {
    dataEvent: [],
    numberError: 0,
  },
  reducers: {
    setDataEvent: (state, dataEvent) => ({ ...state, dataEvent }),
    setNumberError: (state, numberError) => ({ ...state, numberError }),
  },
  effects: (dispatch) => {
    return {};
  },
});

export default event;
