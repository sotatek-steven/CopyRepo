import { getRequest } from '@/utils/httpRequest';
import { createModel } from '@rematch/core';

const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmE2ZGQ2YjY2YWVlNzgzOGI0YTMzOTUiLCJjcmVhdGVkQXQiOiIyMDIyLTA2LTE0VDA0OjA0OjE5LjIwMFoiLCJvd25lciI6IjB4MjEyMWQ0NjQ4NTNhYzRmMDUxM2VmODE5YjBjYjVhMWUyYTZkZTJiNyIsImlhdCI6MTY1NTE3OTQ1OX0.arzYQ9qS7Qja0ZVTkzDqXPdSjyp5BZwotajTUx6K7bw';

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
  },
  reducers: {
    update: (state, data) => ({
      ...state,
      ...data,
    }),
  },
  effects: (dispatch) => {
    const { contract, player } = dispatch;
    return {
      async getContracts(page, state) {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user-contracts`;
        const response = await fetch(url,
          {
            headers: {
              Authorization: TOKEN,
            },
            params: {
              page,
            },
          });
        const responseJson = await response.json();
        const { meta, data } = responseJson;
        return { paging: meta, data };
      },
      async getDetailContract(id, state) {
        const { data } = await getRequest({url: `/api/v1/user-contracts/${id}`, userModoel: player, userState: state.player});
        contract.update(data);
        return data;
      },
      async updateContract(contract, state) {
        const id = contract._id;
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user-contracts/${id}`;
        const response = await fetch (url, {
          method: 'PUT',
          headers: {
            Authorization: TOKEN,
            'Content-type': 'application/json; charset=UTF-8'
          },
          body: JSON.stringify(contract),
        });
        const responseJson = await response.json();
        console.log(responseJson);
        return responseJson;
      }
    }
  }
});

export default contract;
