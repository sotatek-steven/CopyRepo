import { createModel } from '@rematch/core';

export const ModuleMode = {
  DESIGN: 'design',
  LIBRARY: 'library',
  STRUCT: 'struct',
};

const moduleMode = createModel({
  state: ModuleMode.DESIGN,
  reducers: {
    update: (state, data) => data,
  },
});

export default moduleMode;
