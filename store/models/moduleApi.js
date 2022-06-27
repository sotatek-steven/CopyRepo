import { getRequest } from '@/utils/httpRequest';
import { createModel } from '@rematch/core';

const moduleApi = createModel({
  state: {},
  reducers: {},
  effects: (dispatch) => {
    const { player } = dispatch;
    return {
      async getModules(page, state) {
        const { meta, data } = await getRequest({
          url: '/api/v1/modules',
          params: { size: -1 },
          userState: state.player,
          userModoel: player,
        })
        return { meta, data };
      },
      async getDetailModule(id, state) {
        const { data } = await getRequest({
          url: `/api/v1/modules/${id}`,
          userState: state.player,
          userModoel: player,
        });
        return { data };
      },
    }
  }
});

export default moduleApi;
