import { createModel } from '@rematch/core';
import { deleteRequest, getRequest, postRequest } from '../../utils/httpRequest';

const userContract = createModel({
  state: {
    keywords: null,
  },
  reducers: {
    update: (state, data) => ({
      ...state,
      ...data,
    }),
    setKeywords: (state, keywords) => ({
      ...state,
      keywords,
    }),
    clearKeyowrds: () => {
      return {
        keywords: null,
      };
    },
  },
  effects: (dispatch) => {
    const { userContract, player } = dispatch;
    const userModoel = player;
    return {
      async getAllUserContracts(payload, state) {
        try {
          const { meta, data } = await getRequest({
            url: '/api/v1/user-contracts',
            params: {
              page: payload.page,
              size: payload.size,
              description_like: payload.keywords,
              name_like: payload.keywords,
            },
            userState: state.player,
            userModoel,
          });
          return { meta, data };
        } catch (error) {
          console.log('error: ', error);
          userContract.setListContract([]);
        }
      },
      async getUserContractDraff(payload, state) {
        try {
          const { meta, data } = await getRequest({
            url: '/api/v1/user-contracts',
            params: {
              status: 'draff',
              page: payload.page,
              size: payload.size,
              description_like: payload.keywords,
              name_like: payload.keywords,
            },
            userState: state.player,
            userModoel,
          });
          return { meta, data };
        } catch (error) {
          console.log('error: ', error);
        }
      },
      async getUserContractDeployed(payload, state) {
        try {
          const { meta, data } = await getRequest({
            url: '/api/v1/user-contracts',
            params: {
              status: 'deployed',
              page: payload.page,
              size: payload.size,
              description_like: payload.keywords,
              name_like: payload.keywords,
            },
            userState: state.player,
            userModoel,
          });
          return { meta, data };
        } catch (error) {
          console.log('error: ', error);
        }
      },
      async createSmartContract(body, state) {
        const res = postRequest({ url: '/api/v1/user-contracts', body, userState: state.player, userModoel: player });
        return res;
      },
      async deleteSmartContract({ _id }, state) {
        const res = deleteRequest({
          url: `/api/v1/user-contracts/${_id}`,
          userState: state.player,
          userModoel: player,
        });
        return res;
      },
      async changeKeywordsSearch(keywords, state) {
        userContract.setKeywords(keywords);
      },
    };
  },
});

export default userContract;
