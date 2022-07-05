import { getRequest, putRequest } from '@/utils/httpRequest';
import { createModel } from '@rematch/core';
import { ContractFactory } from 'ethers';
import { toast } from 'react-toastify';

const TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmE2ZGQ2YjY2YWVlNzgzOGI0YTMzOTUiLCJjcmVhdGVkQXQiOiIyMDIyLTA2LTE0VDA0OjA0OjE5LjIwMFoiLCJvd25lciI6IjB4MjEyMWQ0NjQ4NTNhYzRmMDUxM2VmODE5YjBjYjVhMWUyYTZkZTJiNyIsImlhdCI6MTY1NTE3OTQ1OX0.arzYQ9qS7Qja0ZVTkzDqXPdSjyp5BZwotajTUx6K7bw';

const contract = createModel({
  state: {
    current: {
      _id: null,
      owner: null,
      name: null,
      description: null,
      domain: null,
      tags: [],
      modules: [],
      status: null,
      coordinates: [],
      address: '',
      transaction: '',
      module_keys: '',
    },
    infoContractModalOpen: false,
  },
  reducers: {
    update: (state, data) => ({
      ...state,
      ...data,
    }),
    setAddress: (state, address) => ({
      ...state,
      current: { ...state.current, address },
    }),
    setTransaction: (state, transaction) => ({
      ...state,
      current: { ...state.current, transaction },
    }),
    setModules: (state, modules) => {
      const module_keys = modules.join('-');
      return {
        ...state,
        current: { ...state.current, modules, module_keys },
      };
    },
    setCoordinates: (state, coordinates) => ({
      ...state,
      current: { ...state.current, coordinates },
    }),
    setCurrent: (state, current) => ({
      ...state,
      current,
    }),
    updateCurrent: (state, data) => ({
      ...state,
      current: { ...state.current, ...data },
    }),
    setInfoContractModalOpen: (state, infoContractModalOpen) => ({
      ...state,
      infoContractModalOpen,
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
        const module_keys = (data.modules || []).join('-');
        contract.setCurrent({ ...data, module_keys });
        return data;
      },
      async updateContract(payload, state) {
        const { _id, ...other } = payload && payload._id ? payload : state.contract.current;
        const { code, data, message } = await putRequest({
          url: `/api/v1/user-contracts/${_id}`,
          userModoel: player,
          userState: state.player,
          body: other,
        });
        if (code == 200) {
          const module_keys = (data.modules || []).join('-');
          contract.setCurrent({ ...data, module_keys });
        } else {
          toast.error(message);
        }
        return { code: 200, data: null };
      },
      async deployContract({ signer, deploying, deployed }, state) {
        const { abi, bytecode, parameters, _id } = state.contract.current;
        let factory = new ContractFactory(abi, bytecode, signer);
        const params = parameters.map((param) => param.value);
        deploying();
        const depoyedContract = await factory.deploy(...params);
        await contract.updateContract({ _id, address: depoyedContract.address });
        contract.setAddress(depoyedContract.address);
        contract.setTransaction(depoyedContract.deployTransaction.hash);
        console.log(depoyedContract);
        toast.success('Deploy success', {
          style: { top: '3.5em' },
        });
        deployed();
      },
    };
  },
});

export default contract;
