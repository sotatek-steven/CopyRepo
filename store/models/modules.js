import { createModel } from '@rematch/core';

const modules = createModel({
  state: {
    modules: [],
  },
  reducers: {
    setModules: (state, modules) => ({ ...state, modules }),
  },
});

export default modules;
