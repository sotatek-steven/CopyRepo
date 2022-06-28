import { getRequest } from '@/utils/httpRequest';
import { createModel } from '@rematch/core';

const template = createModel({
  state: {
    listTemplate: [],
    listDomain: [],
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
    setListDomain: (state, listDomain) => ({
      ...state,
      listDomain,
    }),
    clearDomain: () => {
      return {
        listDomain: [],
      };
    },
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
        return data;
      },
      async getTemplateDomain(params, state) {
        const { data } = await getRequest({
          url: '/api/v1/domains',
          params: params.size,
          userState: state.player,
          userModoel: player,
        });
        template.setListDomain(data || []);
        return data;
      },
      async getTemplateDetails(id, state) {
        const { data } = await getRequest({
          url: `/api/v1/templates/${id}`,
          userState: state.player,
          userModoel: player,
        });
        return data;
      },
    };
  },
});

export default template;
