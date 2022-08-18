import { getRequest, postRequest, putRequest } from '@/utils/httpRequest';
import { createModel } from '@rematch/core';
import { toast } from 'react-toastify';

export const NEW_PARAMETER = {
  type: 'int',
  isArray: false,
  scope: 'public',
  label: '',
  location: 'memory',
};

const userFunction = createModel({
  state: {
    name: '',
    tags: '',
    description: '',
    scopes: {
      scope: 'external',
      virtual: false,
      payable: false,
      type: '',
      overrides: null,
    },
    params: [],
    type: 'not-readonly',
    modifier: [],
    returns: [],
  },
  reducers: {
    update: (state, data) => data,
    updateName: (state, name) => ({ ...state, name }),
    updateParameters: (state, params) => ({ ...state, params }),
    updateScope: (state, scope) => ({ ...state, scopes: { ...state.scopes, scope } }),
    updateType: (state, type) => ({ ...state, type }),
    updateStateMutability: (state, type) => ({ ...state, scopes: { ...state.scopes, type } }),
    updateReturn: (state, returnData) => ({ ...state, returns: returnData }),
    updateVirtual: (state, virtual) => ({ ...state, scopes: { ...state.scopes, virtual } }),
    updatePayable: (state, payable) => ({ ...state, scopes: { ...state.scopes, payable } }),
  },
  effects: (dispatch) => {
    const { player } = dispatch;
    return {
      async getDetailFunction(id, state) {
        console.log('id: ', id);
        const { code, data, message } = await getRequest({
          url: `/api/v1/functions/${id}`,
          userState: state.player,
          userModoel: player,
        });

        if (code !== 200) {
          toast.error(message);
          return;
        }
        return data;
      },
      async createFunction({ functionInfo }, state) {
        try {
          const { code, data, message } = await postRequest({
            url: `/api/v1/functions`,
            userModoel: player,
            userState: state.player,
            body: functionInfo,
          });
          if (code !== 200) {
            toast.error(message);
            return;
          }
          return { code, data };
        } catch (error) {
          console.log('error: ', error);
        }
      },
      async updateFunction(functionInfo, state) {
        const _id = functionInfo ? functionInfo._id : state.userFunction;
        const functionData = functionInfo || state.userFunction;

        const { code, data, message } = await putRequest({
          url: `/api/v1/functions/${_id}`,
          userModoel: player,
          userState: state.player,
          body: functionData,
        });
        if (code !== 200) {
          toast.error(message);
          return { code };
        }
        return { code, data };
      },
    };
  },
});

export default userFunction;
