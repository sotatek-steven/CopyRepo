import { createModel } from '@rematch/core';

/**
 * all global mapping variable
 * {
 *    ...,
 *    subscriber: mappingId //mapping item has this variable
 * }
 */

const mappingVariableOptions = createModel({
  state: [],
  reducers: {
    update: (state, data) => data,
    registerOption: (state, optionId, mappingId) => {
      const updatedOptions = state.map((item) => {
        const { _id } = item;
        if (_id !== optionId) return item;
        return {
          ...item,
          subscriber: mappingId,
        };
      });
      return updatedOptions;
    },
    unregisterOption(state, optionId) {
      const updatedOptions = state.map((item) => {
        const { _id } = item;
        if (_id !== optionId) return item;
        return {
          ...item,
          subscriber: null,
        };
      });

      return updatedOptions;
    },
    unregisterAllOptions(state, mappingId) {
      const updatedOptions = state.map((item) => {
        const { subscriber } = item;
        return {
          ...item,
          mappingId: subscriber === mappingId ? null : subscriber,
        };
      });
      return updatedOptions;
    },
  },
  effects: () => ({}),
});

export default mappingVariableOptions;
