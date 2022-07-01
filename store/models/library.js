import { getRequest } from '@/utils/httpRequest';
import { createModel } from '@rematch/core';

const library = createModel({
  state: [],
  reducers: {
    update: (state, data) => data,
    // add: (state, data) => [...state, ...data],
  },
  effects: (dispatch) => {
    const { player } = dispatch;
    return {
      async getAllUserLibraries(page, state) {
        const { meta, data } = await getRequest({
          url: '/api/v1/libraries',
          params: { size: -1 },
          userState: state.player,
          userModoel: player,
        });
        return { meta, data };
      },
    };
  },
});

export default library;
