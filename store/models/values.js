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
    count: 0,
    numberError: 0,
    errorFunctions: [],
  },
  reducers: {
    setValues: (state, values) => ({ ...state, values }),
    setCount: (state, count) => ({ ...state, count }),
    setNumberError: (state, numberError) => ({ ...state, numberError }),
    setErrorFunctions: (state, errorFunctions) => ({ ...state, errorFunctions }),
  },
  effects: (dispatch) => {
    return {};
  },
});

export default value;
