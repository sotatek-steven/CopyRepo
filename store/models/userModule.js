import { getRequest } from '@/utils/httpRequest';
import { createModel } from '@rematch/core';

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
        const { data } = await getRequest({
          url: `/api/v1/modules/${id}`,
          userState: state.player,
          userModoel: player,
        });
        userModule.update(data);
        return data;
      },
      async updateModule({ moduleId, moduleInfo }, state) {
        // const { _id, ...other } = payload && payload._id ? payload : state.contract.current;
        const { code, data, message } = await putRequest({
          url: `/api/v1/modules/${moduleId}`,
          userModoel: player,
          userState: state.player,
          body: moduleInfo,
        });
        if (code != 200) {
          toast.error(message);
          return;
        }
        console.log('code: ', code);
        console.log('data: ', data);
        // return { code: 200, data: null };
      },
    };
  },
});

export default userModule;
