export const DATA = {
  nodes: [
    {
      id: '000000186a345a5e804a88a4',
      type: 'initial',
      data: {
        size: {
          width: 80,
          height: 80,
        },
      },
      dragHandle: 'dragHandle',
    },
    {
      id: '000000186a345a5e804a88a5',
      type: 'declaration',
      data: {
        params: {
          indentifier: 'a',
          type: 'int',
          isArray: false,
          valueText: '321324',
          assignOperation: '=',
        },
        size: {
          width: 200,
          height: 100,
        },
      },
      dragHandle: 'dragHandle',
    },
    {
      id: '000000186a345a5e804a88a6',
      type: 'parent',
      data: {
        size: {
          width: 700,
          height: 500,
        },
      },
      dragHandle: 'dragHandle',
    },
    {
      id: '000000186a345a5e804a88a7',
      type: 'condition',
      data: {
        conditions: [
          {
            indentifier: 'IUniswapV2Factory',
            type: 'function',
            params: [
              {
                type: 'variable',
                position: 'globalVariable',
                indentifier: 'factory',
              },
            ],
            operation: 'call',
          },
          {
            indentifier: 'getPair',
            type: 'function',
            params: [
              {
                type: 'variable',
                position: 'param',
                indentifier: 'tokenA',
              },
              {
                type: 'variable',
                position: 'param',
                indentifier: 'tokenB',
              },
            ],
            operation: 'eq',
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
        size: {
          width: 85,
          height: 85,
        },
      },
      dragHandle: 'dragHandle',
      parentNode: '000000186a345a5e804a88a6',
      extent: 'parent',
    },
    {
      id: '000000186a345a5e804a88a8',
      type: 'logic',
      data: {
        params: {
          isArray: false,
          valueText: 'IUniswapV2Factory ( factory ) . createPair ( tokenA , tokenB )',
          value: {
            type: 'expression',
            operations: [
              {
                indentifier: 'IUniswapV2Factory',
                type: 'function',
                params: [
                  {
                    type: 'variable',
                    position: 'globalVariable',
                    indentifier: 'factory',
                  },
                ],
                operation: 'call',
              },
              {
                indentifier: 'createPair',
                type: 'function',
                params: [
                  {
                    type: 'variable',
                    position: 'param',
                    indentifier: 'tokenA',
                  },
                  {
                    type: 'variable',
                    position: 'param',
                    indentifier: 'tokenB',
                  },
                ],
                operation: 'end',
              },
            ],
          },
        },
        size: {
          width: 80,
          height: 80,
        },
      },
      dragHandle: 'dragHandle',
      parentNode: '000000186a345a5e804a88a6',
      extent: 'parent',
    },
    {
      id: '000000186a345a5e804a88a9',
      type: 'returns',
      data: {
        params: {
          variables: [
            {
              type: 'uint256',
              indentifier: 'reserveA',
              position: 'localVariabel',
              used: 0,
            },
            {
              type: 'uint256',
              indentifier: 'reserveB',
              position: 'localVariabel',
              used: 0,
            },
          ],
          isArray: false,
          assignOperation: '=',
          valueText: 'UniswapV2Library . getReserves ( factory , tokenA , tokenB )',
          value: {
            type: 'expression',
            operations: [
              {
                indentifier: 'UniswapV2Library',
                type: 'variable',
                operation: 'call',
                position: null,
              },
              {
                indentifier: 'getReserves',
                type: 'function',
                params: [
                  {
                    type: 'variable',
                    position: 'globalVariable',
                    indentifier: 'factory',
                  },
                  {
                    type: 'variable',
                    position: 'param',
                    indentifier: 'tokenA',
                  },
                  {
                    type: 'variable',
                    position: 'param',
                    indentifier: 'tokenB',
                  },
                ],
                operation: 'end',
              },
            ],
          },
        },
        size: {
          width: 200,
          height: 100,
        },
      },
      dragHandle: 'dragHandle',
    },
    {
      id: '000000186a345a5e804a88aa',
      type: 'activityFinal',
      data: {
        size: {
          width: 80,
          height: 80,
        },
      },
      dragHandle: 'dragHandle',
    },
  ],
  edges: [
    {
      id: '000000186a345a5e804a88a4-000000186a345a5e804a88a5',
      source: '000000186a345a5e804a88a4',
      target: '000000186a345a5e804a88a5',
      markerEnd: {
        type: 'arrowclosed',
        color: '#fff',
      },
      style: {
        strokeWidth: 2,
      },
    },
    {
      id: '000000186a345a5e804a88a7-000000186a345a5e804a88a8',
      source: '000000186a345a5e804a88a7',
      target: '000000186a345a5e804a88a8',
      type: 'step',
      label: 'true',
      sourceHandle: 'left',
      markerEnd: {
        type: 'arrowclosed',
        color: '#fff',
      },
      style: {
        strokeWidth: 2,
      },
    },
    {
      id: '000000186a345a5e804a88a5-000000186a345a5e804a88a6',
      source: '000000186a345a5e804a88a5',
      target: '000000186a345a5e804a88a6',
      markerEnd: {
        type: 'arrowclosed',
        color: '#fff',
      },
      style: {
        strokeWidth: 2,
      },
    },
    {
      id: '000000186a345a5e804a88a6-000000186a345a5e804a88a9',
      source: '000000186a345a5e804a88a6',
      target: '000000186a345a5e804a88a9',
      markerEnd: {
        type: 'arrowclosed',
        color: '#fff',
      },
      style: {
        strokeWidth: 2,
      },
    },
    {
      id: '000000186a345a5e804a88a9-000000186a345a5e804a88aa',
      source: '000000186a345a5e804a88a9',
      target: '000000186a345a5e804a88aa',
      markerEnd: {
        type: 'arrowclosed',
        color: '#fff',
      },
      style: {
        strokeWidth: 2,
      },
    },
  ],
};
