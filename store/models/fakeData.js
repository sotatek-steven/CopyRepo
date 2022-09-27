export const FAKE_NODES = [
  {
    id: '000000181fa190a61484cb73',
    type: 'initial',
    position: {
      x: 600,
      y: 300,
    },
    dragHandle: 'dragHandle',
  },
  {
    id: '000000181fa190a61484cb74',
    type: 'declaration',
    position: {
      x: 600,
      y: 500,
    },
    data: {
      indentifier: 'pool',
      type: 'PoolInfo',
      location: 'storage',
      isArray: false,
      position: 'localVariabel',
      used: 0,
      assignOperation: '=',
      value: {
        type: 'expression',
        operations: [
          {
            indentifier: 'poolInfo',
            type: 'variable',
            at: [
              {
                type: 'variable',
                position: 'param',
                indentifier: '_pid',
              },
            ],
            operation: 'end',
            position: 'globalVariable',
          },
        ],
      },
    },
    dragHandle: 'dragHandle',
  },
  {
    id: '000000181fa190a61484cb75',
    type: 'parent',
    position: {
      x: 600,
      y: 800,
    },
    style: {
      width: 300,
      height: 200,
    },
  },
  {
    id: '000000181fa190a61484cb76',
    type: 'condition',
    position: {
      x: 600,
      y: 800,
    },
    data: [
      {
        indentifier: 'block',
        type: 'variable',
        operation: 'call',
        position: null,
      },
      {
        indentifier: 'number',
        type: 'variable',
        operation: 'lte',
      },
      {
        indentifier: 'pool',
        type: 'variable',
        operation: 'call',
        position: 'localVariabel',
      },
      {
        indentifier: 'lastRewardBlock',
        type: 'variable',
        operation: 'end',
      },
    ],
    parentNode: '000000181fa190a61484cb75',
    extent: 'parent',
    dragHandle: 'dragHandle',
  },
  {
    id: '000000181fa190a61484cb77',
    type: 'finish',
    position: {
      x: 900,
      y: 800,
    },
    data: {
      action: 'return',
      params: {
        operations: [
          {
            operation: 'end',
          },
        ],
      },
    },
    parentNode: '000000181fa190a61484cb75',
    extent: 'parent',
    dragHandle: 'dragHandle',
  },
  {
    id: '000000181fa190a61484cb78',
    type: 'declaration',
    position: {
      x: 600,
      y: 950,
    },
    data: {
      indentifier: 'lpSupply',
      type: 'uint256',
      isArray: false,
      position: 'localVariabel',
      used: 0,
      assignOperation: '=',
      value: {
        type: 'expression',
        operations: [
          {
            indentifier: 'pool',
            type: 'variable',
            operation: 'call',
            position: 'localVariabel',
          },
          {
            indentifier: 'lpToken',
            type: 'variable',
            operation: 'call',
          },
          {
            indentifier: 'balanceOf',
            type: 'function',
            params: [
              {
                type: 'expression',
                operations: [
                  {
                    type: 'function',
                    indentifier: 'address',
                    params: [
                      {
                        type: 'variable',
                        position: null,
                        indentifier: 'this',
                      },
                    ],
                  },
                ],
              },
            ],
            operation: 'end',
          },
        ],
      },
    },
    dragHandle: 'dragHandle',
  },
  {
    id: '000000181fa190a61484cb79',
    type: 'parent',
    position: {
      x: 600,
      y: 1100,
    },
    style: {
      width: 300,
      height: 200,
    },
    dragHandle: 'dragHandle',
  },
  {
    id: '000000181fa190a61484cb7a',
    type: 'condition',
    position: {
      x: 600,
      y: 1100,
    },
    data: [
      {
        indentifier: 'lpSupply',
        type: 'variable',
        operation: 'eq',
        position: 'localVariabel',
      },
      {
        value: '0',
        type: 'value',
        operation: 'end',
      },
    ],
    parentNode: '000000181fa190a61484cb79',
    extent: 'parent',
    dragHandle: 'dragHandle',
  },
  {
    id: '000000181fa190a61484cb7b',
    type: 'logic',
    position: {
      x: 800,
      y: 1100,
    },
    data: {
      operations: [
        {
          indentifier: 'pool',
          type: 'variable',
          operation: 'call',
          position: 'localVariabel',
        },
        {
          indentifier: 'lastRewardBlock',
          type: 'variable',
          operation: 'end',
        },
      ],
      isArray: false,
      assignOperation: '=',
      value: {
        type: 'expression',
        operations: [
          {
            indentifier: 'block',
            type: 'variable',
            operation: 'call',
            position: null,
          },
          {
            indentifier: 'number',
            type: 'variable',
            operation: 'end',
          },
        ],
      },
    },
    parentNode: '000000181fa190a61484cb79',
    extent: 'parent',
    dragHandle: 'dragHandle',
  },
  {
    id: '000000181fa190a61484cb7c',
    type: 'finish',
    position: {
      x: 800,
      y: 1100,
    },
    data: {
      action: 'return',
      params: {
        operations: [
          {
            operation: 'end',
          },
        ],
      },
    },
    dragHandle: 'dragHandle',
  },
  {
    id: '000000181fa190a61484cb7d',
    type: 'declaration',
    position: {
      x: 600,
      y: 1500,
    },
    data: {
      indentifier: 'multiplier',
      type: 'uint256',
      isArray: false,
      position: 'localVariabel',
      used: 0,
      assignOperation: '=',
      value: {
        type: 'expression',
        operations: [
          {
            indentifier: 'getMultiplier',
            type: 'function',
            params: [
              {
                type: 'expression',
                operations: [
                  {
                    indentifier: 'pool',
                    type: 'variable',
                    operation: 'call',
                    position: 'localVariabel',
                  },
                  {
                    indentifier: 'lastRewardBlock',
                    type: 'variable',
                    operation: 'end',
                  },
                ],
              },
              {
                type: 'expression',
                operations: [
                  {
                    indentifier: 'block',
                    type: 'variable',
                    operation: 'call',
                    position: null,
                  },
                  {
                    indentifier: 'number',
                    type: 'variable',
                    operation: 'end',
                  },
                ],
              },
            ],
            operation: 'end',
          },
        ],
      },
    },
    dragHandle: 'dragHandle',
  },
  {
    id: '000000181fa190a61484cb7e',
    type: 'declaration',
    data: {
      indentifier: 'rewards',
      type: 'uint256',
      isArray: false,
      position: 'localVariabel',
      used: 0,
      assignOperation: '=',
      value: {
        type: 'expression',
        operations: [
          {
            type: 'expression',
            indentifier: 'expression',
            operations: [
              {
                indentifier: 'multiplier',
                type: 'variable',
                operation: 'mul',
                position: 'localVariabel',
              },
              {
                indentifier: 'rewardPerBlock',
                type: 'variable',
                operation: 'mul',
                position: 'globalVariable',
              },
              {
                indentifier: 'pool',
                type: 'variable',
                operation: 'call',
                position: 'localVariabel',
              },
              {
                indentifier: 'allocPoint',
                type: 'variable',
                operation: 'end',
              },
            ],
            operation: 'div',
          },
          {
            indentifier: 'totalAllocPoint',
            type: 'variable',
            operation: 'end',
            position: 'globalVariable',
          },
        ],
      },
    },
    dragHandle: 'dragHandle',
  },
  {
    id: '000000181fa190a61484cb7f',
    type: 'parent',
    position: {
      x: 600,
      y: 1700,
    },
    style: {
      width: 300,
      height: 200,
    },
    dragHandle: 'dragHandle',
  },
  {
    id: '000000181fa190a61484cb80',
    type: 'condition',
    position: {
      x: 600,
      y: 1700,
    },
    data: [
      {
        indentifier: 'devaddr',
        type: 'variable',
        operation: 'ne',
        position: 'globalVariable',
      },
      {
        indentifier: 'address',
        type: 'function',
        params: [
          {
            type: 'value',
            position: null,
            value: '0',
          },
        ],
        operation: 'end',
      },
    ],
    parentNode: '000000181fa190a61484cb7f',
    extent: 'parent',
    dragHandle: 'dragHandle',
  },
  {
    id: '000000181fa190a61484cb81',
    type: 'logic',
    position: {
      x: 800,
      y: 1700,
    },
    data: {
      isArray: false,
      value: {
        type: 'expression',
        operations: [
          {
            indentifier: 'rewardToken',
            type: 'variable',
            operation: 'call',
            position: 'globalVariable',
          },
          {
            indentifier: 'transfer',
            type: 'function',
            params: [
              {
                type: 'variable',
                position: 'globalVariable',
                indentifier: 'devaddr',
              },
              {
                type: 'expression',
                operations: [
                  {
                    indentifier: 'rewards',
                    type: 'variable',
                    operation: 'div',
                    position: 'localVariabel',
                  },
                  {
                    value: '10',
                    type: 'value',
                    operation: 'end',
                  },
                ],
              },
            ],
            operation: 'end',
          },
        ],
      },
    },
    parentNode: '000000181fa190a61484cb7f',
    extent: 'parent',
    dragHandle: 'dragHandle',
  },
  {
    id: '000000181fa190a61484cb82',
    type: 'logic',
    position: {
      x: 600,
      y: 1900,
    },
    data: {
      isArray: false,
      value: {
        type: 'expression',
        operations: [
          {
            indentifier: 'rewardToken',
            type: 'variable',
            operation: 'call',
            position: 'globalVariable',
          },
          {
            indentifier: 'transfer',
            type: 'function',
            params: [
              {
                type: 'expression',
                operations: [
                  {
                    type: 'function',
                    indentifier: 'address',
                    params: [
                      {
                        type: 'variable',
                        position: null,
                        indentifier: 'this',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'variable',
                position: 'localVariabel',
                indentifier: 'rewards',
              },
            ],
            operation: 'end',
          },
        ],
      },
    },
    dragHandle: 'dragHandle',
  },
  {
    id: '000000181fa190a61484cb83',
    type: 'logic',
    position: {
      x: 600,
      y: 2100,
    },
    data: {
      operations: [
        {
          indentifier: 'pool',
          type: 'variable',
          operation: 'call',
          position: 'localVariabel',
        },
        {
          indentifier: 'accRewardPerShare',
          type: 'variable',
          operation: 'end',
        },
      ],
      isArray: false,
      assignOperation: '=',
      value: {
        type: 'expression',
        operations: [
          {
            indentifier: 'pool',
            type: 'variable',
            operation: 'call',
            position: 'localVariabel',
          },
          {
            indentifier: 'accRewardPerShare',
            type: 'variable',
            operation: 'add',
          },
          {
            type: 'expression',
            indentifier: 'expression',
            operations: [
              {
                type: 'expression',
                indentifier: 'expression',
                operations: [
                  {
                    indentifier: 'rewards',
                    type: 'variable',
                    operation: 'mul',
                    position: 'localVariabel',
                  },
                  {
                    indentifier: 'REWARD_PRECISION',
                    type: 'variable',
                    operation: 'end',
                    position: 'globalVariable',
                  },
                ],
                operation: 'div',
              },
              {
                indentifier: 'lpSupply',
                type: 'variable',
                operation: 'end',
                position: 'localVariabel',
              },
            ],
            operation: 'end',
          },
        ],
      },
    },
    dragHandle: 'dragHandle',
  },
  {
    id: '000000181fa190a61484cb84',
    type: 'logic',
    position: {
      x: 600,
      y: 2300,
    },
    data: {
      operations: [
        {
          indentifier: 'pool',
          type: 'variable',
          operation: 'call',
          position: 'localVariabel',
        },
        {
          indentifier: 'lastRewardBlock',
          type: 'variable',
          operation: 'end',
        },
      ],
      isArray: false,
      assignOperation: '=',
      value: {
        type: 'expression',
        operations: [
          {
            indentifier: 'block',
            type: 'variable',
            operation: 'call',
            position: null,
          },
          {
            indentifier: 'number',
            type: 'variable',
            operation: 'end',
          },
        ],
      },
    },
    dragHandle: 'dragHandle',
  },
  {
    id: '000000181fa190a61484cb85',
    type: 'activityFinal',
    position: {
      x: 900,
      y: 1100,
    },
    dragHandle: 'dragHandle',
  },
];

export const FAKE_EDGES = [
  {
    id: '000000181fa190a61484cb73-000000181fa190a61484cb74',
    source: '000000181fa190a61484cb73',
    target: '000000181fa190a61484cb74',
    markerEnd: {
      type: 'arrowclosed',
      color: '#fff',
    },
    style: {
      strokeWidth: 2,
    },
  },
  {
    id: '000000181fa190a61484cb76-000000181fa190a61484cb77',
    source: '000000181fa190a61484cb76',
    label: 'True',
    target: '000000181fa190a61484cb77',
    markerEnd: {
      type: 'arrowclosed',
      color: '#fff',
    },
    style: {
      strokeWidth: 2,
    },
  },
  {
    id: '000000181fa190a61484cb74-000000181fa190a61484cb75',
    source: '000000181fa190a61484cb74',
    target: '000000181fa190a61484cb75',
    markerEnd: {
      type: 'arrowclosed',
      color: '#fff',
    },
    style: {
      strokeWidth: 2,
    },
  },
  {
    id: '000000181fa190a61484cb75-000000181fa190a61484cb78',
    source: '000000181fa190a61484cb75',
    target: '000000181fa190a61484cb78',
    markerEnd: {
      type: 'arrowclosed',
      color: '#fff',
    },
    style: {
      strokeWidth: 2,
    },
  },
  {
    id: '000000181fa190a61484cb7a-000000181fa190a61484cb7b',
    label: 'True',
    source: '000000181fa190a61484cb7a',
    target: '000000181fa190a61484cb7b',
    markerEnd: {
      type: 'arrowclosed',
      color: '#fff',
    },
    style: {
      strokeWidth: 2,
    },
  },
  {
    id: '000000181fa190a61484cb7b-000000181fa190a61484cb7c',
    source: '000000181fa190a61484cb7b',
    target: '000000181fa190a61484cb7c',
    markerEnd: {
      type: 'arrowclosed',
      color: '#fff',
    },
    style: {
      strokeWidth: 2,
    },
  },
  {
    id: '000000181fa190a61484cb78-000000181fa190a61484cb79',
    source: '000000181fa190a61484cb78',
    target: '000000181fa190a61484cb79',
    markerEnd: {
      type: 'arrowclosed',
      color: '#fff',
    },
    style: {
      strokeWidth: 2,
    },
  },
  {
    id: '000000181fa190a61484cb79-000000181fa190a61484cb7d',
    source: '000000181fa190a61484cb79',
    target: '000000181fa190a61484cb7d',
    markerEnd: {
      type: 'arrowclosed',
      color: '#fff',
    },
    style: {
      strokeWidth: 2,
    },
  },
  {
    id: '000000181fa190a61484cb7d-000000181fa190a61484cb7e',
    source: '000000181fa190a61484cb7d',
    target: '000000181fa190a61484cb7e',
    markerEnd: {
      type: 'arrowclosed',
      color: '#fff',
    },
    style: {
      strokeWidth: 2,
    },
  },
  {
    id: '000000181fa190a61484cb80-000000181fa190a61484cb81',
    source: '000000181fa190a61484cb80',
    target: '000000181fa190a61484cb81',
    label: 'True',
    markerEnd: {
      type: 'arrowclosed',
      color: '#fff',
    },
    style: {
      strokeWidth: 2,
    },
  },
  {
    id: '000000181fa190a61484cb7e-000000181fa190a61484cb7f',
    source: '000000181fa190a61484cb7e',
    target: '000000181fa190a61484cb7f',
    markerEnd: {
      type: 'arrowclosed',
      color: '#fff',
    },
    style: {
      strokeWidth: 2,
    },
  },
  {
    id: '000000181fa190a61484cb7f-000000181fa190a61484cb82',
    source: '000000181fa190a61484cb7f',
    target: '000000181fa190a61484cb82',
    markerEnd: {
      type: 'arrowclosed',
      color: '#fff',
    },
    style: {
      strokeWidth: 2,
    },
  },
  {
    id: '000000181fa190a61484cb82-000000181fa190a61484cb83',
    source: '000000181fa190a61484cb82',
    target: '000000181fa190a61484cb83',
    markerEnd: {
      type: 'arrowclosed',
      color: '#fff',
    },
    style: {
      strokeWidth: 2,
    },
  },
  {
    id: '000000181fa190a61484cb83-000000181fa190a61484cb84',
    source: '000000181fa190a61484cb83',
    target: '000000181fa190a61484cb84',
    markerEnd: {
      type: 'arrowclosed',
      color: '#fff',
    },
    style: {
      strokeWidth: 2,
    },
  },
  {
    id: '000000181fa190a61484cb84-000000181fa190a61484cb85',
    source: '000000181fa190a61484cb84',
    target: '000000181fa190a61484cb85',
    markerEnd: {
      type: 'arrowclosed',
      color: '#fff',
    },
    style: {
      strokeWidth: 2,
    },
  },
];
