import { createModel } from '@rematch/core';

const INIT_DATA = {
  type: '',
  isArray: '',
  location: '',
  name: '',
  isAssign: false,
  assignType: '',
  inputText: '',
};

const declaration = createModel({
  state: {
    declaration: INIT_DATA,
    listType: [],
  },
  reducers: {
    updateDeclaration: (state, declaration) => ({ ...state, declaration }),
    resetDeclaration: (state) => ({ ...state, declaration: INIT_DATA }),
    setListType: (state, listType) => ({ ...state, listType }),
  },
  effects: (dispatch) => {
    return {};
  },
});

export default declaration;
