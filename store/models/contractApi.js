import { createModel } from '@rematch/core';

const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmE2ZGQ2YjY2YWVlNzgzOGI0YTMzOTUiLCJjcmVhdGVkQXQiOiIyMDIyLTA2LTE0VDA0OjA0OjE5LjIwMFoiLCJvd25lciI6IjB4MjEyMWQ0NjQ4NTNhYzRmMDUxM2VmODE5YjBjYjVhMWUyYTZkZTJiNyIsImlhdCI6MTY1NTE3OTQ1OX0.arzYQ9qS7Qja0ZVTkzDqXPdSjyp5BZwotajTUx6K7bw';

const contractApi = createModel({
  state: {
    id: null,
    owner: null,
    name: null,
    description: null,
    domain: null,
    status: null,
    tags: [],
    modules: [],
  },
  reducers: {
    update: (state, data) => ({
      ...state,
      ...data,
    }),
  },
  effects: (dispatch) => {
    const { contractApi } = dispatch;
    return {
      async getContracts(page) {
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
      async getDetailContract(id) {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user-contracts/${id}`;
        const response = await fetch(url, {
          headers: {
            Authorization: TOKEN,
          },
        });

        const responseJson = await response.json();
        const { data } = responseJson;
        contractApi.update(state, data);
        return data;
      },
    }
  }
});

export default contractApi;
