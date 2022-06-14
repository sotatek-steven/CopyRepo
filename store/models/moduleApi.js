import { createModel } from '@rematch/core';

const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmE2ZGQ2YjY2YWVlNzgzOGI0YTMzOTUiLCJjcmVhdGVkQXQiOiIyMDIyLTA2LTE0VDA0OjA0OjE5LjIwMFoiLCJvd25lciI6IjB4MjEyMWQ0NjQ4NTNhYzRmMDUxM2VmODE5YjBjYjVhMWUyYTZkZTJiNyIsImlhdCI6MTY1NTE3OTQ1OX0.arzYQ9qS7Qja0ZVTkzDqXPdSjyp5BZwotajTUx6K7bw';

const moduleApi = createModel({
  state: {},
  reducers: {},
  effects: {
    async getModules(page) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/modules`;
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
      console.log(responseJson);
      const { meta, data } = responseJson;
      return { paging: meta, data };
    },
    async getDetailModule(id) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1${id}`;
      const { data } = await fetch(url, {
        headers: {
          Authorization: TOKEN,
        },
      });
      return data;
    },
  },
});

export default moduleApi;
