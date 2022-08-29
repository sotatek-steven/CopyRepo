export const FAKE_DATA = {
  type: 'init',
  position: {
    x: 600,
    y: 300,
  },
  next: {
    next: {
      type: 'condition',
      parent: {
        position: {
          x: 600,
          y: 800,
        },
      },
      position: {
        x: 600,
        y: 800,
      },
      nextTrue: {
        position: {
          x: 900,
          y: 800,
        },
        type: 'finish',
        action: 'return',
        params: {
          operations: [
            {
              operation: 'end',
            },
          ],
        },
      },
      next: {
        next: {
          type: 'condition',
          parent: {
            position: {
              x: 600,
              y: 1100,
            },
          },
          position: {
            x: 600,
            y: 1100,
          },
          nextTrue: {
            next: {
              type: 'finish',
              position: {
                x: 800,
                y: 1100,
              },
              action: 'return',
              params: {
                operations: [
                  {
                    operation: 'end',
                  },
                ],
              },
            },
            type: 'logic',
            position: {
              x: 800,
              y: 1100,
            },
            params: {
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
          },
          next: {
            next: {
              next: {
                type: 'condition',
                parent: {
                  position: {
                    x: 600,
                    y: 1700,
                  },
                },
                position: {
                  x: 600,
                  y: 1700,
                },
                nextTrue: {
                  type: 'logic',
                  position: {
                    x: 800,
                    y: 1700,
                  },
                  params: {
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
                },
                next: {
                  next: {
                    next: {
                      next: {
                        type: 'activityFinal',
                        position: {
                          x: 900,
                          y: 1100,
                        },
                      },
                      type: 'logic',
                      position: {
                        x: 600,
                        y: 2300,
                      },
                      params: {
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
                    },
                    type: 'logic',
                    position: {
                      x: 600,
                      y: 2100,
                    },
                    params: {
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
                  },
                  type: 'logic',
                  position: {
                    x: 600,
                    y: 1900,
                  },
                  params: {
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
                },
                conditions: [
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
              },
              type: 'declaration',
              params: {
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
            },
            type: 'declaration',
            position: {
              x: 600,
              y: 1500,
            },
            params: {
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
          },
          conditions: [
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
        },
        type: 'declaration',
        position: {
          x: 600,
          y: 950,
        },
        params: {
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
      },
      conditions: [
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
    },
    type: 'declaration',
    position: {
      x: 600,
      y: 500,
    },
    params: {
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
  },
};
