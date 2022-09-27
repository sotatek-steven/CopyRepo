export const DATA = {
  _id: '000000186a345a5e804a88a4',
  type: 'init',
  size: {
    width: 80,
    height: 80,
  },
  next: {
    _id: '000000186a345a5e804a88a5',
    type: 'declaration',
    size: {
      width: 200,
      height: 100,
    },
    params: {
      indentifier: 'a',
      type: 'int',
      isArray: false,
      valueText: '321324',
      assignOperation: '=',
    },
    next: {
      _id: '000000186a345a5e804a88a7',
      size: {
        width: 85,
        height: 85,
      },
      parent: {
        _id: '000000186a345a5e804a88a6',
        size: {
          width: 700,
          height: 500,
        },
      },
      type: 'condition',
      nextTrue: {
        _id: '000000186a345a5e804a88a8',
        size: {
          width: 80,
          height: 80,
        },
        next: {},
        type: 'logic',
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
      },
      next: {
        _id: '000000186a345a5e804a88a9',
        size: {
          width: 200,
          height: 100,
        },
        next: {
          _id: '000000186a345a5e804a88aa',
          size: {
            width: 80,
            height: 80,
          },
          type: 'activityFinal',
        },
        type: 'returns',
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
      },
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
    },
  },
};
