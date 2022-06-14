import { createModel } from '@rematch/core';

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
    const { userContract } = dispatch;
    return {
      async getAllUserContracts(payload, state) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user-contracts`, {
          headers: {
            Authorization: `Bearer ${state.player.playerAuth?.token}`,
          },
        });
        const res = await response.json();
        if (res.code === 200) {
          const { data } = res;
          userContract.setListContract(data);
          return data;
        } else if (res.code === 1001) {
          // token expired
          userContract.clearAll();
        }
        return null;
      },
      async getUserContractDraff(payload, state) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user-contracts?status=draff`, {
          headers: {
            Authorization: `Bearer ${state.player.playerAuth?.token}`,
          },
        });
        const res = await response.json();
        if (res.code === 200) {
          const { data } = res;
          userContract.setListContractDraff(data);
          return data;
        } else if (res.code === 1001) {
          // token expired
          userContract.clearAll();
        }
        return null;
      },
      async getUserContractDeployed(payload, state) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user-contracts?status=deployped`, {
          headers: {
            Authorization: `Bearer ${state.player.playerAuth?.token}`,
          },
        });
        const res = await response.json();
        if (res.code === 200) {
          const { data } = res;
          userContract.setListContractDeployed(data);
          return data;
        } else if (res.code === 1001) {
          // token expired
          userContract.clearAll();
        }
        return null;
      },
    };
  },
});

export default userContract;
