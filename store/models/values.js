import { INIT_VALUE_TYPE } from '@/config/constant/common';
import { createModel } from '@rematch/core';

const TYPES = [
  {
    value: 'structs',
    label: 'Structs',
  },
  {
    value: 'enums',
    label: 'Enums',
  },
];

const value = createModel({
  state: {
    values: [INIT_VALUE_TYPE],
    types: TYPES,
    numberError: 0,
    errorFunctions: [],
  },
  reducers: {
    setValues: (state, values) => ({ ...state, values }),
    setNumberError: (state, numberError) => ({ ...state, numberError }),
    setErrorFunctions: (state, errorFunctions) => ({ ...state, errorFunctions }),
    resetError: (state) => ({ ...state, numberError: 0, errorFunctions: [] }),
  },
  effects: (dispatch) => {
    return {};
  },
});

export default value;
