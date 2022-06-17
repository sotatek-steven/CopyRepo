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
          const { data } = await getRequest({
            url: '/api/v1/user-contracts',
            params: { status: 'draff' },
            userState: state.player,
            userModoel,
          });
          console.log('data all: ', data);
          userContract.setListContract(data || []);
        } catch (error) {
          console.log('error: ', error);
          userContract.setListContract([]);
        }
      },
      async getUserContractDraff(payload, state) {
        try {
          const { meta, data } = await getRequest({
            url: '/api/v1/user-contracts',
            params: { status: 'draff' },
            userState: state.player,
            userModoel,
          });
          userContract.setListContractDraff(data || []);
        } catch (error) {
          console.log('error: ', error);
          userContract.setListContractDraff([]);
        }
      },
      async getUserContractDeployed(payload, state) {
        try {
          const { meta, data } = await getRequest({
            url: '/api/v1/user-contracts',
            params: { status: 'deployed' },
            userState: state.player,
            userModoel,
          });
          userContract.setListContractDeployed(data || []);
        } catch (error) {
          console.log('error: ', error);
          userContract.setListContractDeployed([]);
        }
      },
      async createSmartContract(body, state) {
        const res = postRequest({ url: '/api/v1/user-contracts', body });
        return res;
      },
    };
  },
});

export default userContract;
