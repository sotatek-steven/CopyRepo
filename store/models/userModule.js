import { deleteRequest, getRequest, postRequest, putRequest } from '@/utils/httpRequest';
import { createModel } from '@rematch/core';
import { toast } from 'react-toastify';

const userModule = createModel({
  state: {
    _id: null,
    owner: null,
    code: null,
    name: null,
    description: null,
    domain: null,
    tags: [],
    color: null,
    domainId: null,
    gasFee: null,
    variables: {
      mappings: [],
      values: [],
      structs: [],
    },
  },
  reducers: {
    update: (state, data) => ({
      ...state,
      ...data,
    }),
    set: (state, data) => ({
      ...data,
    }),
    updateLibraries: (state, data) => ({
      ...state,
      sources: {
        ...state.sources,
        libraries: data,
      },
    }),
    updateStructs: (state, structs) => ({
      ...state,
      sources: {
        ...state.sources,
        structs,
      },
    }),
    updateFunctions: (state, functions) => ({
      ...state,
      sources: {
        ...state.sources,
        functions,
      },
    }),
    updateCoordinates: (state, coordinates) => ({
      ...state,
      sources: {
        ...state.sources,
        coordinates,
      },
    }),
    updateMappings: (state, mappings) => ({
      ...state,
      variables: {
        ...state.variables,
        mappings,
      },
    }),
    updateObjects: (state, structs) => ({
      ...state,
      variables: {
        ...state.variables,
        structs,
      },
    }),
    updateValues: (state, values) => ({
      ...state,
      variables: {
        ...state.variables,
        values,
      },
    }),
    updateVariables: (state, variables) => ({
      ...state,
      variables,
    }),
  },
  effects: (dispatch) => {
    const { player, modules } = dispatch;
    return {
      async getModules(page, state) {
        const { meta, data } = await getRequest({
          url: '/api/v1/modules',
          params: { size: -1 },
          userState: state.player,
          userModoel: player,
        });
        modules.setModules(data);
        return { meta, data };
      },
      async getDetailModule(id, state) {
        const { code, data, message } = await getRequest({
          url: `/api/v1/modules/${id}`,
          userState: state.player,
          userModoel: player,
        });

        if (code !== 200) {
          toast.error(message);
          return;
        }
        return data;
      },
      async createModule({ moduleInfo }, state) {
        try {
          const { code, data, message } = await postRequest({
            url: `/api/v1/modules`,
            userModoel: player,
            userState: state.player,
            body: moduleInfo,
          });
          if (code !== 200) {
            toast.error(message);
            return;
          }
          return { code, data };
        } catch (error) {
          console.log('error: ', error);
        }
      },
      async updateModule(payload, state) {
        const { _id, ...dataModule } = state.userModule;

        const body = { ...dataModule };
        const { code, data, message } = await putRequest({
          url: `/api/v1/modules/${_id}`,
          userModoel: player,
          userState: state.player,
          body: body,
        });
        if (code !== 200) {
          toast.error(message);
          return { code };
        }
        return { code, data };
      },
      async cloneModule(payload, state) {
        const { _id, name, description, domainId, tags } = payload;
        const body = { from: _id, name, description, domainId, tags };
        const { code, data, message } = await postRequest({
          url: `/api/v1/modules/clone`,
          userModoel: player,
          userState: state.player,
          body: body,
        });
        if (code !== 200) {
          toast.error(message);
          return { code };
        } else {
          toast.success('Save Successfully!');
        }
        return { code, data };
      },
      async deleteModule(payload, state) {
        const { _id } = payload;

        const { code, data, message } = await deleteRequest({
          url: `/api/v1/modules/${_id}`,
          userModoel: player,
          userState: state.player,
        });

        if (code !== 200) {
          toast.error(message);
          return { code };
        }
        return { code, data };
      },
    };
  },
});

export default userModule;
