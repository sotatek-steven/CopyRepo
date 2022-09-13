import { OBJECT_TYPE } from '@/config/constant/common';
import { createModel } from '@rematch/core';

const TYPES = [
  {
    value: OBJECT_TYPE.STRUCT,
    label: 'Structs',
  },
  {
    value: 'enum',
    label: 'Enums',
  },
];

const object = createModel({
  state: {
    objects: [],
    types: TYPES,
    numberError: 0,
    errorFunctions: [],
  },
  reducers: {
    setObjects: (state, objects) => ({ ...state, objects }),
    setNumberError: (state, numberError) => ({ ...state, numberError }),
    setErrorFunctions: (state, errorFunctions) => ({ ...state, errorFunctions }),
  },
  effects: (dispatch) => {
    return {};
  },
});

export default object;
