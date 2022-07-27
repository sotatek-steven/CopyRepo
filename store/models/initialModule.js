import { createModel } from '@rematch/core';

const initialModule = createModel({
  state: {},
  reducers: {
    setData: (state, data) => {
      const mappings = data.variables.mappings.map((mapping) => {
        const { functions, type } = mapping;

        //update functions of mapping
        const updatedFunctions = functions.map((item) => {
          const { func, variable } = item;
          return {
            func,
            variable,
          };
        });
        mapping.functions = updatedFunctions;

        //update type of mapping
        delete type._id;
        mapping.type = type;
        return mapping;
      });

      data.variables.mappings = mappings;
      return data;
    },
  },
  effects: {},
});

export default initialModule;
