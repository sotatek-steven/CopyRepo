import { getRequest } from '@/utils/httpRequest';
import { createModel } from '@rematch/core';
import { ContractFactory } from 'ethers';

const TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmE2ZGQ2YjY2YWVlNzgzOGI0YTMzOTUiLCJjcmVhdGVkQXQiOiIyMDIyLTA2LTE0VDA0OjA0OjE5LjIwMFoiLCJvd25lciI6IjB4MjEyMWQ0NjQ4NTNhYzRmMDUxM2VmODE5YjBjYjVhMWUyYTZkZTJiNyIsImlhdCI6MTY1NTE3OTQ1OX0.arzYQ9qS7Qja0ZVTkzDqXPdSjyp5BZwotajTUx6K7bw';

const contract = createModel({
  state: {
    _id: null,
    owner: null,
    name: null,
    description: null,
    domain: null,
    tags: [],
    modules: [],
    status: null,
    coordinates: null,
    address: '',
    transaction: '',
  },
  reducers: {
    update: (state, data) => ({
      ...state,
      ...data,
    }),
    setAddress: (state, address) => ({
      ...state,
      address,
    }),
    setTransaction: (state, transaction) => ({
      ...state,
      transaction,
    }),
  },
  effects: (dispatch) => {
    const { contract, player } = dispatch;
    return {
      async getDetailContract(id, state) {
        const { data } = await getRequest({
          url: `/api/v1/user-contracts/${id}`,
          userModoel: player,
          userState: state.player,
        });
        contract.update(data);
        return data;
      },
      async updateContract(contract, state) {
        const id = contract._id;
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user-contracts/${id}`;
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            Authorization: TOKEN,
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify(contract),
        });
        const responseJson = await response.json();
        return responseJson;
      },
      async deployContract({ signer, deploying, deployed }, state) {
        const { abi, bytecode, parameters, _id } = state.contract;
        let factory = new ContractFactory(abi, bytecode, signer);
        const params = parameters.map((param) => param.value);
        deploying();
        const depoyedContract = await factory.deploy(...params);
        await contract.updateContract({ _id, address: depoyedContract.address });
        contract.setAddress(depoyedContract.address);
        contract.setTransaction(depoyedContract.deployTransaction.hash);
        console.log(depoyedContract);
        deployed();
      },
    };
  },
});

export default contract;
