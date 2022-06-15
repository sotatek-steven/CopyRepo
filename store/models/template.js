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
    const { template } = dispatch;
    return {
      async getTemplate(payload, state) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/templates?domain=${payload}`, {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            Authorization: `Bearer ${state.player.playerAuth?.token}`,
            // Authorization: `Bearer ${fakeToken}`,
          },
        });
        const res = await response.json();
        if (res.code === 200) {
          const { data } = res;
          template.setListTemplate(data);
          return data;
        } else if (res.code === 1001) {
          // token expired
          template.clearAll();
        }
        return null;
      },
    };
  },
});

export default template;
