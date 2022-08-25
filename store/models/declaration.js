import { createModel } from '@rematch/core';

const declaration = createModel({
  state: {
    declarations: [],
    listType: [],
    declaEditing: '',
  },
  reducers: {
    updateDeclarations: (state, declarations) => ({ ...state, declarations }),
    setListType: (state, listType) => ({ ...state, listType }),
    setDeclaEditing: (state, declaEditing) => ({ ...state, declaEditing }),
  },
  effects: (dispatch) => {
    return {};
  },
});

export default declaration;
