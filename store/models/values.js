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
    valueType: '',
    isArray: false,
    scope: 'public',
    isConstant: false,
    variableName: '',
    variableValue: '',
    isDefaultValue: false,
    mapToFunctions: '',
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
