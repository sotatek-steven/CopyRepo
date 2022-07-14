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
  },
  reducers: {
    setObjects: (state, objects) => ({ ...state, objects }),
  },
  effects: (dispatch) => {
    return {};
  },
});

export default object;
