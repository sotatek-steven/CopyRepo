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

const INIT_VALUES = [
  {
    _id: 1,
    type: '',
    isArray: false,
    scope: 'public',
    isConst: false,
    label: '',
    variableValue: '',
    isDefaultValue: false,
    functions: '',
  },
];

const value = createModel({
  state: {
    values: INIT_VALUES,
    types: TYPES,
    count: 0,
  },
  reducers: {
    setValues: (state, values) => ({ ...state, values }),
    setCount: (state, count) => ({ ...state, count }),
  },
  effects: (dispatch) => {
    return {};
  },
});

export default value;
