import { createModel } from '@rematch/core';

const modules = createModel({
  state: {
    modules: [],
    duplicateNames: [],
  },
  reducers: {
    setModules: (state, modules) => ({ ...state, modules }),
    setDuplicateNames: (state, duplicateNames) => ({ ...state, duplicateNames }),
  },
});

export default modules;
