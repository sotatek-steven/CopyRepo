import { compareMappingVariable } from '@/components/MappingTabPanel/utils';
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
    registerOption: (state, option, mappingId) => {
      const updatedOptions = state.map((item) => {
        if (!compareMappingVariable(item, option)) return item;
        return {
          ...item,
          subscriber: mappingId,
        };
      });
      return updatedOptions;
    },
    unregisterOption(state, option) {
      const updatedOptions = state.map((item) => {
        if (!compareMappingVariable(item, option)) return item;
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
          subscriber: subscriber === mappingId ? null : subscriber,
        };
      });

      return updatedOptions;
    },
  },
  effects: () => ({}),
});

export default mappingVariableOptions;
