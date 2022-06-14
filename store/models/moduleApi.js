import { createModel } from '@rematch/core';

const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmE2ZGQ2YjY2YWVlNzgzOGI0YTMzOTUiLCJjcmVhdGVkQXQiOiIyMDIyLTA2LTEzVDA3OjEzOjQwLjA0MVoiLCJvd25lciI6IjB4MjEyMWQ0NjQ4NTNhYzRmMDUxM2VmODE5YjBjYjVhMWUyYTZkZTJiNyIsImlhdCI6MTY1NTEwNDQyMH0.41ZOtEuS-mtQNBHRnt4jeWO-6GcBzQ5t4LoA9D-9PSs';

const moduleApi = createModel({
  state: {},
  reducers: {},
  effects: {
    async getModules(page) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/modules`;
      const { meta: paging, data } = await fetch(url,
        {
          headers: {
            Authorization: TOKEN,
          },
          params: {
            page,
          },
        });
      return { paging, data };
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
