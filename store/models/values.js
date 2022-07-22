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
    values: INIT_VALUE_TYPE,
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
