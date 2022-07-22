import { createModel } from '@rematch/core';

const TYPES = [
  {
    value: 'address',
    label: 'address',
  },
  {
    value: 'bool',
    label: 'bool',
  },
  {
    value: 'int',
    label: 'int',
  },
  {
    value: 'int8',
    label: 'int8',
  },
  {
    value: 'int16',
    label: 'int16',
  },
  {
    value: 'int32',
    label: 'int32',
  },
  {
    value: 'int64',
    label: 'int64',
  },
  {
    value: 'int128',
    label: 'int128',
  },
  {
    value: 'int256',
    label: 'int256',
  },
  {
    value: 'uint',
    label: 'uint',
  },
  {
    value: 'uint8',
    label: 'uint8',
  },
  {
    value: 'uint16',
    label: 'uint16',
  },
  {
    value: 'uint32',
    label: 'uint32',
  },
  {
    value: 'uint64',
    label: 'uint64',
  },
  {
    value: 'uint128',
    label: 'uint128',
  },
  {
    value: 'uint256',
    label: 'uint256',
  },
  {
    value: 'string',
    label: 'string',
  },
];

const struct = createModel({
  state: {
    originStructs: [],
    structs: [],
    types: TYPES,
  },
  reducers: {
    setStructs: (state, structs) => ({ ...state, structs }),
    setOriginStructs: (state, originStructs) => ({ ...state, originStructs }),
    setTypes: (state, types) => ({ ...state, types }),
  },
  effects: (dispatch) => {
    return {};
  },
});

export default struct;
