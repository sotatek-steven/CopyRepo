import { createModel } from '@rematch/core';

const ticket = createModel({
  state: {
    selected: null,
    isApprovedForAll: false,
    isUpdated: false,
  },
  reducers: {
    update: (state, data) => ({
      ...state,
      ...data,
    }),
  },
  effects: {},
});

export default ticket;
