import { createModel } from '@rematch/core';
import { getRequest, postRequest } from '../../utils/httpRequest';

const userContract = createModel({
  state: {
    listUserContract: [],
    listUserContractDraff: [],
    listUserContractDeployed: [],
  },
  reducers: {
    update: (state, data) => ({
      ...state,
      ...data,
    }),
    setListContract: (state, listUserContract) => ({
      ...state,
      listUserContract,
    }),
    setListContractDraff: (state, listUserContractDraff) => ({
      ...state,
      listUserContractDraff,
    }),
    setListContractDeployed: (state, listUserContractDeployed) => ({
      ...state,
      listUserContractDeployed,
    }),
    clearAll: () => {
      return {
        listUserContract: [],
        listUserContractDraff: [],
        listUserContractDeployed: [],
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
            params: { page: payload.page, size: payload.size },
            userState: state.player,
            userModoel,
          });
          return { meta, data };
          // userContract.setListContract(data || []);
        } catch (error) {
          console.log('error: ', error);
          userContract.setListContract([]);
        }
      },
      async getUserContractDraff(payload, state) {
        try {
          const { meta, data } = await getRequest({
            url: '/api/v1/user-contracts',
            params: { status: 'draff', page: payload.page, size: payload.size },
            userState: state.player,
            userModoel,
          });
          return { meta, data };
          // userContract.setListContractDraff(data || []);
        } catch (error) {
          console.log('error: ', error);
          userContract.setListContractDraff([]);
        }
      },
      async getUserContractDeployed(payload, state) {
        try {
          const { meta, data } = await getRequest({
            url: '/api/v1/user-contracts',
            params: { status: 'deployed', page: payload.page, size: payload.size },
            userState: state.player,
            userModoel,
          });
          return { meta, data };
          // userContract.setListContractDeployed(data || []);
        } catch (error) {
          console.log('error: ', error);
          userContract.setListContractDeployed([]);
        }
      },
      async createSmartContract(body, state) {
        const res = postRequest({ url: '/api/v1/user-contracts', body, userState: state.player, userModoel: player });
        return res;
      },
    };
  },
});

export default userContract;
