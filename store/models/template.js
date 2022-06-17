import { getRequest } from '@/utils/httpRequest';
import { createModel } from '@rematch/core';

const template = createModel({
  state: {
    listTemplate: [],
  },
  reducers: {
    update: (state, data) => ({
      ...state,
      ...data,
    }),
    setListTemplate: (state, listTemplate) => ({
      ...state,
      listTemplate,
    }),
    clearAll: () => {
      return {
        listTemplate: [],
      };
    },
  },
  effects: (dispatch) => {
    const { template, player } = dispatch;
    return {
      async getTemplate(domain, state) {
        const { data } = await getRequest({
          url: '/api/v1/templates',
          params: { domain },
          userState: state.player,
          userModoel: player,
        });
        template.setListTemplate(data || []);
      },
    };
  },
});

export default template;
