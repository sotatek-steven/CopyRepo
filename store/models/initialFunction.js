import { createModel } from '@rematch/core';

const initialFunction = createModel({
  state: {},
  reducers: {
    set: (state, data) => data,
  },
  effects: {},
});

export default initialFunction;
