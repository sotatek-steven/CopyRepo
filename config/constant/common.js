export const ELEMENT_TYPE = {
  INPUT: 'INPUT',
  SELECT: 'SELECT',
  TAG: 'TAG',
};

export const MODE = {
  CREATE: 'CREATE',
  EDIT: 'EDIT',
  CLONE: 'CLONE',
};

export const HTTP_CODE = {
  SUCCESS: 200,
};

export const NEW_ID = 'NEW_ID';
export const EDIT_ID = 'EDIT_ID';

export const MODULE_OWNER = {
  SYSTEM: 'SYSTEM',
  MODULE_SYSTEM: 'System module',
  CUSTOM_MODULE: 'Custom module',
};

export const MODE_ACTION_MODULE = {
  DETAILS: 'Details',
  CUSTOM_DESIGN: 'Design',
  SYSTEM_DESIGN: 'Show Design',
  CLONE: 'Clone',
  DELETE: 'Delete',
};

export const IS_ARRAY_OPTION = [
  {
    value: true,
    label: 'True',
  },
  {
    value: false,
    label: 'False',
  },
];

export const OBJECT_TYPE = {
  STRUCT: 'struct',
  ENUM: 'enum',
};

export const EVENT_ERROR_TYPE = {
  EVENT: 'events',
  ERROR: 'errors',
};

export const EVENT_ERROR_OPTION = [
  {
    value: EVENT_ERROR_TYPE.EVENT,
    label: 'Event',
  },
  {
    value: EVENT_ERROR_TYPE.ERROR,
    label: 'Error',
  },
];

export const SCOPE_OPTIONS = [
  {
    value: 'public',
    label: 'Public',
  },
  {
    value: 'private',
    label: 'Private',
  },
  {
    value: 'internal',
    label: 'Internal',
  },
];

export const BOOLEAN_OPTIONS = [
  {
    value: true,
    label: 'True',
  },
  {
    value: false,
    label: 'False',
  },
];

export const IS_CONSTANT = [
  {
    value: 'constant',
    label: 'Constant',
  },
  {
    value: 'immutable',
    label: 'Immutable',
  },
  {
    value: '',
    label: 'None',
  },
];

export const VALUE_TYPE_OPTIONS = [
  {
    value: 'address',
    label: 'address',
  },
  {
    value: 'bool',
    label: 'bool',
  },
  {
    value: 'bytes1',
    label: 'bytes1',
  },
  {
    value: 'bytes2',
    label: 'bytes2',
  },
  {
    value: 'bytes3',
    label: 'bytes3',
  },
  {
    value: 'bytes4',
    label: 'bytes4',
  },
  {
    value: 'bytes5',
    label: 'bytes5',
  },
  {
    value: 'bytes6',
    label: 'bytes6',
  },
  {
    value: 'bytes7',
    label: 'bytes7',
  },
  {
    value: 'bytes8',
    label: 'bytes8',
  },
  {
    value: 'bytes9',
    label: 'bytes9',
  },
  {
    value: 'bytes10',
    label: 'bytes10',
  },
  {
    value: 'bytes11',
    label: 'bytes11',
  },
  {
    value: 'bytes12',
    label: 'bytes12',
  },
  {
    value: 'bytes13',
    label: 'bytes13',
  },
  {
    value: 'bytes14',
    label: 'bytes14',
  },
  {
    value: 'bytes15',
    label: 'bytes15',
  },
  {
    value: 'bytes16',
    label: 'bytes16',
  },
  {
    value: 'bytes17',
    label: 'bytes17',
  },
  {
    value: 'bytes18',
    label: 'bytes18',
  },
  {
    value: 'bytes19',
    label: 'bytes19',
  },
  {
    value: 'bytes20',
    label: 'bytes20',
  },
  {
    value: 'bytes21',
    label: 'bytes21',
  },
  {
    value: 'bytes22',
    label: 'bytes22',
  },
  {
    value: 'bytes23',
    label: 'bytes23',
  },
  {
    value: 'bytes24',
    label: 'bytes24',
  },
  {
    value: 'bytes25',
    label: 'bytes25',
  },
  {
    value: 'bytes26',
    label: 'bytes26',
  },
  {
    value: 'bytes27',
    label: 'bytes27',
  },
  {
    value: 'bytes28',
    label: 'bytes28',
  },
  {
    value: 'bytes29',
    label: 'bytes29',
  },
  {
    value: 'bytes30',
    label: 'bytes30',
  },
  {
    value: 'bytes31',
    label: 'bytes31',
  },
  {
    value: 'bytes32',
    label: 'bytes32',
  },
  {
    value: 'IERC20',
    label: 'IERC20',
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

export const TITLE_VALUES_TAB = [
  {
    id: 1,
    label: 'VALUE_TYPE',
    value: 'value_type',
  },
  {
    id: 2,
    label: 'IS_ARRAY',
    value: 'is_array',
  },
  {
    id: 3,
    label: 'SCOPE',
    value: 'scope',
  },
  {
    id: 4,
    label: 'CONSTANT',
    value: 'is_constant',
  },
  {
    id: 5,
    label: 'VARIABLE_NAME *',
    value: 'variable_name',
  },
  {
    id: 6,
    label: 'VARIABLE_VALUE',
    value: 'variable_value',
  },
  {
    id: 7,
    label: 'IS_DEFAULT_VALUE',
    value: 'is_default_value',
  },
  {
    id: 8,
    label: 'MAP_TO_FUNCTION',
    value: 'map_to_function',
  },
];

export const VALUE_TYPE_ENUM = {
  IECR20: 'IERC20',
  ADRESS: 'address',
  BOOL: 'bool',
  BYTE1: 'bytes1',
  BYTE2: 'bytes2',
  BYTE3: 'bytes3',
  BYTE4: 'bytes4',
  BYTE5: 'bytes5',
  BYTE6: 'bytes6',
  BYTE7: 'bytes7',
  BYTE8: 'bytes8',
  BYTE9: 'bytes9',
  BYTE10: 'bytes10',
  BYTE11: 'bytes11',
  BYTE12: 'bytes12',
  BYTE13: 'bytes13',
  BYTE14: 'bytes14',
  BYTE15: 'bytes15',
  BYTE16: 'bytes16',
  BYTE17: 'bytes17',
  BYTE18: 'bytes18',
  BYTE19: 'bytes19',
  BYTE20: 'bytes20',
  BYTE21: 'bytes21',
  BYTE22: 'bytes22',
  BYTE23: 'bytes23',
  BYTE24: 'bytes24',
  BYTE25: 'bytes25',
  BYTE26: 'bytes26',
  BYTE27: 'bytes27',
  BYTE28: 'bytes28',
  BYTE29: 'bytes29',
  BYTE30: 'bytes30',
  BYTE31: 'bytes31',
  BYTE32: 'bytes32',
  STRING: 'string',
};

export const PLACE_HOLDER = {
  [VALUE_TYPE_ENUM.IECR20]: '0x0000000000000000000000000000000000000000',
  [VALUE_TYPE_ENUM.ADRESS]: '0x0000000000000000000000000000000000000000',
  [VALUE_TYPE_ENUM.BOOL]: 'false',
  [VALUE_TYPE_ENUM.BYTE1]: '0x00',
  [VALUE_TYPE_ENUM.BYTE2]: '0x0000',
  [VALUE_TYPE_ENUM.BYTE3]: '0x000000',
  [VALUE_TYPE_ENUM.BYTE4]: '0x00000000',
  [VALUE_TYPE_ENUM.BYTE5]: '0x0000000000',
  [VALUE_TYPE_ENUM.BYTE6]: '0x000000000000',
  [VALUE_TYPE_ENUM.BYTE7]: '0x00000000000000',
  [VALUE_TYPE_ENUM.BYTE8]: '0x0000000000000000',
  [VALUE_TYPE_ENUM.BYTE9]: '0x000000000000000000',
  [VALUE_TYPE_ENUM.BYTE10]: '0x00000000000000000000',
  [VALUE_TYPE_ENUM.BYTE11]: '0x0000000000000000000000',
  [VALUE_TYPE_ENUM.BYTE12]: '0x000000000000000000000000',
  [VALUE_TYPE_ENUM.BYTE13]: '0x00000000000000000000000000',
  [VALUE_TYPE_ENUM.BYTE14]: '0x0000000000000000000000000000',
  [VALUE_TYPE_ENUM.BYTE15]: '0x000000000000000000000000000000',
  [VALUE_TYPE_ENUM.BYTE16]: '0x00000000000000000000000000000000',
  [VALUE_TYPE_ENUM.BYTE17]: '0x0000000000000000000000000000000000',
  [VALUE_TYPE_ENUM.BYTE18]: '0x000000000000000000000000000000000000',
  [VALUE_TYPE_ENUM.BYTE19]: '0x00000000000000000000000000000000000000',
  [VALUE_TYPE_ENUM.BYTE20]: '0x0000000000000000000000000000000000000000',
  [VALUE_TYPE_ENUM.BYTE21]: '0x000000000000000000000000000000000000000000',
  [VALUE_TYPE_ENUM.BYTE22]: '0x00000000000000000000000000000000000000000000',
  [VALUE_TYPE_ENUM.BYTE23]: '0x0000000000000000000000000000000000000000000000',
  [VALUE_TYPE_ENUM.BYTE24]: '0x000000000000000000000000000000000000000000000000',
  [VALUE_TYPE_ENUM.BYTE25]: '0x00000000000000000000000000000000000000000000000000',
  [VALUE_TYPE_ENUM.BYTE26]: '0x0000000000000000000000000000000000000000000000000000',
  [VALUE_TYPE_ENUM.BYTE27]: '0x000000000000000000000000000000000000000000000000000000',
  [VALUE_TYPE_ENUM.BYTE28]: '0x00000000000000000000000000000000000000000000000000000000',
  [VALUE_TYPE_ENUM.BYTE29]: '0x0000000000000000000000000000000000000000000000000000000000',
  [VALUE_TYPE_ENUM.BYTE30]: '0x000000000000000000000000000000000000000000000000000000000000',
  [VALUE_TYPE_ENUM.BYTE31]: '0x00000000000000000000000000000000000000000000000000000000000000',
  [VALUE_TYPE_ENUM.BYTE32]: '0x0000000000000000000000000000000000000000000000000000000000000000',
  [VALUE_TYPE_ENUM.STRING]: 'an empty string (empty value)',
};

export const INIT_VALUE_TYPE = {
  _id: Date.now(),
  type: '',
  isArray: false,
  scope: 'public',
  constant: '',
  label: '',
  valueDefault: '',
  isDefaultValue: true,
  functions: [],
};

export const INIT_OBJECT_TYPE = {
  type: '',
  item: '',
  isArray: false,
  scope: 'public',
  name: '',
  functions: [],
  assignedValues: [],
};

export const STRUCT = [
  {
    _id: Date.now(),
    name: '',
    errorName: null,
    variables: [
      {
        _id: Date.now(),
        type: {
          value: '',
          errorType: null,
        },
        name: {
          value: '',
          errorName: null,
        },
      },
    ],
  },
];

export const ENUM_ITEM = [
  {
    _id: Date.now(),
    name: '',
    errorName: null,
    values: [
      {
        _id: Date.now(),
        name: '',
      },
    ],
  },
];

export const FUNCTION_TYPE = {
  POOLINFO: 'POOLINFO',
  USERINFO: 'USERINFO',
};

export const STRUCT_POOLINFO = {
  name: 'PoolInfo',
  variables: [
    {
      _id: 'IpToken',
      type: {
        value: 'IERC20',
      },
      name: {
        value: 'IpToken',
      },
    },
    {
      _id: 'allocPoint',
      type: {
        value: 'uint256',
      },
      name: {
        value: 'allocPoint',
      },
    },
    {
      _id: 'lastRewardBlock',
      type: {
        value: 'uint256',
      },
      name: {
        value: 'lastRewardBlock',
      },
    },
    {
      _id: 'accRewardPerShare',
      type: {
        value: 'uint256',
      },
      name: {
        value: 'accRewardPerShare',
      },
    },
  ],
};

export const STRUCT_USERINFO = {
  name: 'UserInfo',
  variables: [
    {
      _id: 'amount',
      type: {
        value: 'uint256',
      },
      name: {
        value: 'amount',
      },
    },
    {
      _id: 'rewardDebt',
      type: {
        value: 'uint256',
      },
      name: {
        value: 'rewardDebt',
      },
    },
  ],
};
