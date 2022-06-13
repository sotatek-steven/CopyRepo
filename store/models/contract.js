import { createModel } from '@rematch/core';

const contract = createModel({
  state: {
    petContract: null,
    marketContract: null,
    itemContract: null,
    shopContract: null,
    mainContract: null,
    useContract: null,
  },
  reducers: {
    update: (state, data) => ({
      ...state,
      ...data,
    }),
    setMainContract: (state, mainContract) => ({
      ...state,
      mainContract,
    }),
    setUseContract: (state, useContract) => ({
      ...state,
      useContract,
    }),
  },
  effects: {},
});

export default contract;
