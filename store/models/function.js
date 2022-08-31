import { getRequest } from '@/utils/httpRequest';
import { createModel } from '@rematch/core';
import { toast } from 'react-toastify';

const functions = createModel({
  state: {
    functions: [],
    listType: [],
  },
  reducers: {
    setFunctions: (state, functions) => ({ ...state, functions }),
    setListType: (state, listType) => ({ ...state, listType }),
  },
  effects: (dispatch) => {
    const { functions, player } = dispatch;
    return {
      async getAllUserFunctions(page, state) {
        const { code, data, message } = await getRequest({
          url: '/api/v1/functions',
          params: { size: -1 },
          userState: state.player,
          userModoel: player,
        });
        if (code !== 200) {
          toast.error(message);
          return { code };
        }

        const listFunc = data.map((item) => {
          const { _id } = item;
          const disable = state?.userModule?.sources?.functions?.some((func) => func._id === _id);
          return {
            ...item,
            disable,
          };
        });
        functions.setFunctions(listFunc);
      },
      async getDetailUserFunction(id, state) {
        const { code, data, message } = await getRequest({
          url: `/api/v1/functions/${id}`,
          userState: state.player,
          userModoel: player,
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

export default functions;
