import { getRequest, postRequest, putRequest } from '@/utils/httpRequest';
import { createModel } from '@rematch/core';
import { toast } from 'react-toastify';

const userModule = createModel({
  state: {
    _id: null,
    owner: null,
    code: null,
    name: null,
    description: null,
    domain: null,
    tags: [],
    color: null,
    domainId: null,
  },
  reducers: {
    update: (state, data) => ({
      ...state,
      ...data,
    }),
    set: (state, data) => ({
      ...data,
    }),
  },
  effects: (dispatch) => {
    const { userModule, player } = dispatch;
    return {
      async getModules(page, state) {
        const { meta, data } = await getRequest({
          url: '/api/v1/modules',
          params: { size: -1 },
          userState: state.player,
          userModoel: player,
        });
        return { meta, data };
      },
      async getDetailModule(id, state) {
        const { code, data, message } = await getRequest({
          url: `/api/v1/modules/${id}`,
          userState: state.player,
          userModoel: player,
        });

        if (code !== 200) {
          toast.error(message);
          return;
        }
        return data;
      },
      async createModule({ moduleInfo }, state) {
        try {
          const { code, data, message } = await postRequest({
            url: `/api/v1/modules`,
            userModoel: player,
            userState: state.player,
            body: moduleInfo,
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
      async updateModule({ moduleId, moduleInfo }, state) {
        const { code, data, message } = await putRequest({
          url: `/api/v1/modules/${moduleId}`,
          userModoel: player,
          userState: state.player,
          body: moduleInfo,
        });
        if (code !== 200) {
          toast.error(message);
          return;
        }
        return data;
      },
    };
  },
});

export default userModule;
