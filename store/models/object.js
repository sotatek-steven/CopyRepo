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

const object = createModel({
  state: {
    objects: [],
    types: TYPES,
    count: 0,
  },
  reducers: {
    setObjects: (state, objects) => ({ ...state, objects }),
    setCount: (state, count) => ({ ...state, count }),
  },
  effects: (dispatch) => {
    return {};
  },
});

export default object;
