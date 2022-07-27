import { createModel } from '@rematch/core';

const initialModule = createModel({
  state: {},
  reducers: {
    setData: (state, data) => data,
  },
  effects: {},
});

export default initialModule;
