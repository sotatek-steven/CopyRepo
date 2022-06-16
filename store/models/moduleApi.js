import { getRequest } from '@/utils/httpRequest';
import { createModel } from '@rematch/core';

const moduleApi = createModel({
  state: {},
  reducers: {},
  effects: {
    async getModules(page) {
      const { meta, data } = await getRequest({ url: '/api/v1/modules', params: { page } })
      return { paging: meta, data };
    },
    async getDetailModule(id) {
      const { data } = await getRequest({ url: `/api/v1/modules/${id}'`, params: { page } });
      return data;
    },
  },
});

export default moduleApi;
