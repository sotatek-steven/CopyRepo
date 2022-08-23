import { getRequest, postRequest, putRequest } from '@/utils/httpRequest';
import { createModel } from '@rematch/core';
import { toast } from 'react-toastify';

const userFunction = createModel({
  state: null,
  reducers: {
    update: (state, data) => data,
    updateDefinition: (state, data) => ({ ...state, ...data }), //data = {name, scope, returns, params, modifier}
  },
  effects: (dispatch) => {
    const { player } = dispatch;
    return {
      async getDetailFunction(id, state) {
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
      async createFunction(functionInfo, state) {
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
        const { _id } = functionInfo;
        const functionData = functionInfo;

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
