import { createModel } from '@rematch/core';

export const NEW_PARAMETER = {
  type: 'int',
  isArray: false,
  scope: 'public',
  label: {
    _id: null,
    value: '',
    errorMessage: '',
  },
  location: '',
};

export const INITIAL_FUNCTION_DATA = {
  _id: null,
  name: {
    value: '',
    errorMessage: '',
  },
  scopes: {
    scope: 'external',
    virtual: false,
    payable: false,
    type: '',
    overrides: null,
  },
  params: [],
  modifier: [],
  returns: [],
  type: 'not-readonly',
};

const functionDefinition = createModel({
  state: INITIAL_FUNCTION_DATA,
  reducers: {
    update: (state, data) => data,
    updateName: (state, name) => ({ ...state, name }),
    updateParameters: (state, params) => ({ ...state, params }),
    updateScope: (state, scope) => ({ ...state, scopes: { ...state.scopes, scope } }),
    updateType: (state, type) => ({ ...state, type }),
    updateStateMutability: (state, type) => ({ ...state, scopes: { ...state.scopes, type } }),
    updateReturns: (state, returnData) => ({ ...state, returns: returnData }),
    updateVirtual: (state, virtual) => ({ ...state, scopes: { ...state.scopes, virtual } }),
    updatePayable: (state, payable) => ({ ...state, scopes: { ...state.scopes, payable } }),
  },
  effects: () => {
    return {
      convertToFEDataDisplay(data) {
        const { _id, name, params, scopes, returns } = data;
        const _params = params.map((item) => ({
          ...item,
          label: {
            value: item.label,
            errorMessage: '',
          },
        }));

        const _returns = returns.map((item) => ({
          ...item,
          label: {
            value: item.label,
            errorMessage: '',
          },
        }));

        return {
          _id,
          name: {
            value: name,
            errorMessage: '',
          },
          scopes,
          params: _params,
          returns: _returns,
          type: scopes.type === '' ? 'not-readonly' : 'readonly',
        };
      },
      convertToDataTransferApi(data) {
        const _data = { ...data };
        delete _data.type;
        const { name, params, scopes, returns } = _data;
        const _params = params.map((item) => {
          return {
            ...item,
            label: item.label.value,
          };
        });

        const _returns = returns.map((item) => {
          return {
            ...item,
            label: item.label.value,
          };
        });

        return {
          ..._data,
          name: name.value,
          scopes,
          params: _params,
          returns: _returns,
        };
      },
    };
  },
});

export default functionDefinition;
