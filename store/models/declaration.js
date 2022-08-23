import { createModel } from '@rematch/core';

const INIT_DATA = {
  declarationType: '',
  isArray: '',
  location: '',
  indentifier: '',
  isAssign: false,
  assignType: '',
  inputText: '',
};

const declaration = createModel({
  state: {
    declarations: [],
    declaration: INIT_DATA,
    listType: [],
    position: {},
  },
  reducers: {
    updateDeclarations: (state, declarations) => ({ ...state, declarations }),
    updateDeclaration: (state, declaration) => ({ ...state, declaration }),
    resetDeclaration: (state) => ({ ...state, declaration: INIT_DATA }),
    setListType: (state, listType) => ({ ...state, listType }),
    setPosition: (state, position) => ({ ...state, position }),
  },
  effects: (dispatch) => {
    return {};
  },
});

export default declaration;
