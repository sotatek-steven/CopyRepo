import { getRequest } from '@/utils/httpRequest';
import { createModel } from '@rematch/core';
import { toast } from 'react-toastify';

const functions = createModel({
  state: {
    functios: [],
  },
  reducers: {
    setFunctions: (state, functios) => ({ ...state, functios }),
  },
  effects: (dispatch) => {
    const { player } = dispatch;
    return {
      async getAllUserFunctions(page, state) {
        const { code, data, message } = await getRequest({
          url: '/api/v1/functions',
          userState: state.player,
          userModoel: player,
        });
        if (code !== 200) {
          toast.error(message);
          return { code };
        }
        return { code, data };
      },
      async getDetailUserFunction(id, state) {
        console.log('id', id);
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
