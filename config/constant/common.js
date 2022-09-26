import _ from 'lodash';
import { REGEX } from './regex';

export const ELEMENT_TYPE = {
  INPUT: 'INPUT',
  SELECT: 'SELECT',
  TAG: 'TAG',
  CHECK: 'CHECK',
};

export const VARIABLE_NAME_TOOLTIP =
  'Beginning character: Must be letter\nFollowing characters only contain: Letters, digits, (_)';

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

export const LOCATION_OPTIONS = [
  {
    value: 'calldata',
    label: 'calldata',
  },
  {
    value: 'memory',
    label: 'memory',
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

export const CONDITION_TYPE = {
  NONE: 'end',
  AND: 'and',
  OR: 'or',
};

export const CONDITION_OPTION = [
  {
    value: CONDITION_TYPE.AND,
    label: 'AND',
  },
  {
    value: CONDITION_TYPE.OR,
    label: 'OR',
  },
  {
    value: CONDITION_TYPE.NONE,
    label: 'NONE',
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

export const VISIBILITY_OPTIONS = [
  {
    value: 'external',
    label: 'External',
  },
  {
    value: 'internal',
    label: 'Internal',
  },
  {
    value: 'public',
    label: 'Public',
  },
  {
    value: 'private',
    label: 'Private',
  },
];

// export const VIRTUAL_OPTIONS = [
//   {
//     value: 'true',
//     label: 'True',
//   },
//   {
//     value: 'false',
//     label: 'False',
//   },
// ];

export const FUNCTION_TYPE_OPTIONS = [
  {
    value: 'readonly',
    label: 'Readonly',
  },
  {
    value: 'not-readonly',
    label: 'Not Readonly',
  },
];

export const STATE_MUTABILITY_OPTIONS = [
  {
    value: 'pure',
    label: 'Pure',
  },
  {
    value: 'view',
    label: 'View',
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

export const INIT_VALUE_TYPE = [
  {
    type: '',
    isArray: false,
    scope: 'public',
    constant: '',
    label: '',
    valueDefault: '',
    isDefaultValue: true,
    functions: [],
  },
];

export const INIT_OBJECT_TYPE = [
  {
    type: '',
    item: '',
    isArray: false,
    scope: 'public',
    name: '',
    functions: [],
    assignedValues: [],
  },
];

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
  POOLINFO: 'PoolInfo',
  USERINFO: 'UserInfo',
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

export const ASSIGN_TYPE = {
  VALUE_INPUT: 'value_input',
  PARAMS: 'params',
  STATE: 'state',
  EXPRESSION: 'expression',
};

export const ASSIGN_TYPE_OPTION = [
  {
    value: ASSIGN_TYPE.VALUE_INPUT,
    label: 'Value Input',
  },
  {
    value: ASSIGN_TYPE.STATE,
    label: 'State Variable',
  },
  {
    value: ASSIGN_TYPE.PARAMS,
    label: 'Params',
  },
  {
    value: ASSIGN_TYPE.EXPRESSION,
    label: 'Expression',
  },
];

export const LOCATION_TYPE = {
  MEMORY: 'memory',
  CALL_DATA: 'calldata',
  STORAGE: 'storage',
};

export const LOCATION_TYPE_OPTION = [
  {
    value: LOCATION_TYPE.MEMORY,
    label: 'Memory',
  },
  {
    value: LOCATION_TYPE.CALL_DATA,
    label: 'Call Data',
  },
  {
    value: LOCATION_TYPE.STORAGE,
    label: 'Storage',
  },
];

const mapBrkets = { '{': 1, '}': '{', '[': 1, ']': '[', '(': 1, ')': '(' };
const mapAsignOerations = {
  '=': '=',
  '+=': '+',
  '-=': '-',
  '*=': '*',
  '/=': '/',
};

export const isKey = (c) => {
  if (c == '_') {
    return true;
  }
  if (!isNaN(c)) {
    return true;
  }
  if (typeof c == 'string' && c.toLowerCase() !== c.toUpperCase()) {
    return true;
  }
  return false;
};

export const canSplit = (startSequence, c, element) => {
  if (startSequence) return false;
  if (c == ' ') return true;
  if ('=!<>+-&|'.includes(c) && '=!<>+-&|'.includes(element[element.length - 1])) {
    return false;
  }
  if (!isKey(c)) {
    return true;
  }
  if (!element.length) {
    return false;
  }
  if (!isKey(element[element.length - 1])) {
    return true;
  }
};

export const checkBacklash = (startSequence, backlashes, c) => {
  if (c != '\\') {
    if (backlashes.length > 0 && backlashes.length % 2) {
      throw { message: 'backlash is wrong. number is odd' };
    }
    backlashes.splice(0);
    return;
  }
  if (!startSequence) {
    throw { message: 'backlash is wrong' };
  }
  backlashes.push(c);
};

export const splitElements = (text) => {
  text = text.trim();
  const brackets = [];
  let startSequence = undefined;
  let backlashes = [];
  const elements = [];
  const element = [];
  let startComment = false;
  for (const c of text.split('')) {
    if (c == '\n') {
      startComment = false;
      elements.push(element.join(''));
      elements.push('\n');
      element.splice(0);
      continue;
    }
    if (startComment) {
      continue;
    }
    if (canSplit(startSequence, c, element)) {
      if (c == '/' && element.length == 1 && element[0] == '/') {
        startComment = true;
        element.splice(0);
        continue;
      }
      if (element.length == 0 || (element.length == 1 && [' ', '\t'].includes(element[0]))) {
        console.log('splitElements');
      } else {
        elements.push(element.join(''));
      }

      element.splice(0);
    }
    element.push(c);
    checkBacklash(startSequence, backlashes, c);
    if (startSequence && c == startSequence) {
      startSequence = undefined;
      continue;
    }
    if (startSequence && c != startSequence) {
      continue;
    }
    if (['"', "'"].includes(c)) {
      startSequence = c;
      continue;
    }

    if (!mapBrkets[c]) {
      continue;
    }
    if (mapBrkets[c] === 1) {
      brackets.push(c);
      continue;
    }

    if (!brackets.length) {
      throw { message: 'Has syntax at block, the brackets is empty', currentChar: c, brackets: brackets, element };
    }
    if (brackets[brackets.length - 1] !== mapBrkets[c]) {
      console.log('content');
      throw {
        message: 'Has syntax at block, the last brackets is difference',
        currentChar: c,
        brackets: brackets,
        element,
      };
    }
    brackets.pop();
  }
  elements.push(element.join('').trim());
  return elements;
};

export const convertToDeclaration = (parts) => {
  let node = {};
  const arrayIndexs = [];
  let isArray = false;
  let index = 0;
  let arraySigns = 0;
  const beginElements = [];
  let assignOperation = undefined;
  parts = parts.map((item) => (item = item.trim()));

  if (parts[parts.length - 1] === ';') {
    parts = _.dropRight(parts);
  }

  while (index < parts.length) {
    if (parts[index] == '[') {
      arrayIndexs.push(parts[index]);
      isArray = true;
      arraySigns++;
      index++;
      continue;
    }
    if (parts[index] == ']') {
      arrayIndexs.push(parts[index]);
      arraySigns--;
      index++;
      continue;
    }
    if (arraySigns > 0) {
      arrayIndexs.push(parts[index]);
      index++;
      continue;
    }
    if (mapAsignOerations[parts[index]]) {
      assignOperation = parts[index];
      parts.splice(0, index + 1);
      index = 0;
      break;
    }

    beginElements.push(parts[index]);
    index++;
  }
  if (beginElements[beginElements.length - 1] == ')') {
    beginElements.splice(0);
    index = 0;
  }

  if (beginElements.length >= 2) node.indentifier = beginElements.pop();
  if (beginElements.length) node.type = beginElements.shift();
  if (beginElements.length) node.location = beginElements.shift();
  node.isArray = !!node.type && isArray;
  node.errorIsArray = false;

  if (arraySigns) {
    node.errorIsArray = true;
  }

  if (assignOperation) {
    const value = parts.reduce((value, item) => {
      return value.concat(item);
    }, '');
    node.value = value;
  }
  return node;
};

export const generateDataType = () => {
  const types = [
    {
      value: 'address',
      label: 'address',
    },
    {
      value: 'bool',
      label: 'bool',
    },
  ];

  // generate bytes type
  for (let i = 0; i <= 32; i++) {
    const value = i > 0 ? `bytes${i}` : 'bytes';
    types.push({
      value: value,
      label: value,
    });
  }
  // add IERC type
  types.push({
    value: `IERC20`,
    label: `IERC20`,
  });
  // generate int type
  for (let i = 0; i <= 256; i += 8) {
    const value = i > 0 ? `int${i}` : 'int';
    types.push({
      value: value,
      label: value,
    });
  }
  // generate uint type
  for (let i = 0; i <= 256; i += 8) {
    const value = i > 0 ? `uint${i}` : 'uint';
    types.push({
      value: value,
      label: value,
    });
  }
  // add string type
  types.push({
    value: `string`,
    label: `string`,
  });

  return types;
};

export const getFirstNearSpace = (textValue, position) => {
  const regex = new RegExp(REGEX.SPECIAL_CHARACTER);
  textValue = textValue?.trim();
  let iBeforeSpace = 0;
  let iBehindSpace = 0;

  for (let index = 0; index < textValue.length; index++) {
    if (iBehindSpace) {
      break;
    }
    if (regex.test(textValue.charAt(index))) {
      if (index > iBeforeSpace && index < position) {
        iBeforeSpace = index;
      } else if (index >= position) {
        iBehindSpace = index;
      }
    }
  }
  return { iBeforeSpace, iBehindSpace };
};
