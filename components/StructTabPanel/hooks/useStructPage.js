import { ELEMENT_TYPE, NEW_ID, EDIT_ID } from '@/config/constant/common';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const STRUCT = {
  name: '',
  errorName: null,
  variables: [
    {
      type: {
        value: [],
        errorType: null,
      },
      name: {
        value: '',
        errorName: null,
      },
    },
  ],
};

const VARIABLE = {
  type: {
    value: [],
    errorType: null,
  },
  name: {
    value: '',
    errorName: null,
  },
};

const useStructPage = () => {
  const { structs, types } = useSelector((state) => state.struct);
  const { objects } = useSelector((state) => state.object);

  const listStructUsed = useMemo(() => {
    return objects?.map(({ item }) => item);
  }, [objects]);

  const { struct, userModule } = useDispatch();

  const [count, setCount] = useState(0);

  const getStructs = (lstStruct) => {
    const data = lstStruct?.map((struct, idxStruct) => {
      const variables = struct.content.map((content, idxContent) => {
        return {
          _id: `${EDIT_ID}_${idxStruct}_${idxContent}`,
          type: {
            value: [content?.type],
          },
          name: {
            value: content?.label,
          },
        };
      });

      return {
        _id: `${EDIT_ID}_${idxStruct}`,
        structId: struct?._id,
        name: struct?.name,
        variables: variables,
      };
    });
    const dataOrigin = JSON.parse(JSON.stringify(data));
    struct.setOriginStructs(dataOrigin);
    struct.setStructs(data);
    userModule.updateStructs(convertStructs(data));
  };

  const convertStructs = (data) => {
    return data?.map((struct) => {
      const content = struct?.variables?.map((variable) => {
        return {
          type: variable?.type.value[0],
          label: variable?.name.value,
        };
      });

      return {
        name: struct?.name,
        content: content,
      };
    });
  };

  const handelAddStruct = () => {
    const init = JSON.parse(JSON.stringify(STRUCT));
    const data = [...structs];
    data.push({ ...init, _id: `${NEW_ID}_${count}` });
    struct.setStructs(data);
    userModule.updateStructs(convertStructs(data));
    setCount((prev) => prev + 1);
  };

  const handelRemoveStruct = (structId) => {
    const iStruct = structs.findIndex(({ _id }) => _id === structId);

    if (listStructUsed?.includes(structs[iStruct]?.structId)) {
      toast.warning('This struct is used');
      return;
    }
    const data = [...structs];
    data.splice(iStruct, 1);

    struct.setStructs(data);
    userModule.updateStructs(convertStructs(data));
  };

  const handelAddVariable = (structId) => {
    const iStruct = structs.findIndex(({ _id }) => _id === structId);
    if (listStructUsed?.includes(structs[iStruct]?.structId)) {
      toast.warning('This struct is used');
      return;
    }
    const variable = JSON.parse(JSON.stringify(VARIABLE));
    const data = [...structs];
    data[iStruct]?.variables?.push({ ...variable, _id: `${NEW_ID}_${count}` });

    struct.setStructs(data);
    userModule.updateStructs(convertStructs(data));
    setCount((prev) => prev + 1);
  };

  const handelRemoveVariable = (structId, variableId) => {
    const iStruct = structs.findIndex(({ _id }) => _id === structId);
    if (listStructUsed?.includes(structs[iStruct]?.structId)) {
      toast.warning('This struct is used');
      return;
    }
    const iVariable = structs[iStruct]?.variables.findIndex(({ _id }) => _id === variableId);
    const data = [...structs];
    data[iStruct]?.variables?.splice(iVariable, 1);

    const duplicateArr = checkDuplicateName(data[iStruct].variables);

    data[iStruct].variables.forEach(({ name }) => {
      name.errorName = !!duplicateArr?.includes(name.value) && 'Variable name cannot be duplicated';
    });

    struct.setStructs(data);
    userModule.updateStructs(convertStructs(data));
  };

  const handleChangeNameStruct = (structId, e) => {
    const value = e.target.value;
    const iStruct = structs.findIndex(({ _id }) => _id === structId);
    const data = [...structs];
    data[iStruct].name = value;
    data[iStruct].errorName = !value?.trim() && 'This is field required';

    struct.setStructs(data);
    userModule.updateStructs(convertStructs(data));
  };

  const checkDuplicateName = (variables) => {
    const duplicateNames = variables.map(({ name }) => name.value).filter((v, i, vIds) => !!v && vIds.indexOf(v) !== i);
    return duplicateNames;
  };

  const handleChangeVariable = (structId, variableId, e, type) => {
    const iStruct = structs.findIndex(({ _id }) => _id === structId);
    const iVariable = structs[iStruct]?.variables.findIndex(({ _id }) => _id === variableId);
    const data = [...structs];
    let duplicateArr = [];

    switch (type) {
      case ELEMENT_TYPE.INPUT:
        data[iStruct].variables[iVariable].name.value = e.target.value;
        data[iStruct].variables[iVariable].name.errorName = false;
        if (!e.target.value?.trim()) {
          data[iStruct].variables[iVariable].name.errorName = 'This is field required';
        }
        duplicateArr = checkDuplicateName(data[iStruct].variables);

        data[iStruct].variables.forEach(({ name }) => {
          name.errorName = !!duplicateArr?.includes(name.value) && 'Variable name cannot be duplicated';
        });

        break;
      case ELEMENT_TYPE.TAG:
        if (!types.includes(e.value)) {
          const temp = [...types];
          temp.push(e.value);
          struct.setTypes(temp);
        }
        data[iStruct].variables[iVariable].type.value = [e.value];
        data[iStruct].variables[iVariable].type.errorType = !e.value?.trim() && 'This is field required';
        break;
      default:
        break;
    }

    struct.setStructs(data);
    userModule.updateStructs(convertStructs(data));
  };

  const handleErrorStructs = () => {
    let isError = false;
    const lstStruct = JSON.parse(JSON.stringify(structs));
    lstStruct?.forEach((item) => {
      if (!item?.name?.trim()) {
        item.errorName = 'This is field required';
        isError = true;
      }
      item?.variables.forEach(({ type, name }) => {
        if (!type?.value.length) {
          type.errorType = 'This is field required';
          isError = true;
        }
        if (!name?.value.trim()) {
          name.errorName = 'This is field required';
          isError = true;
        }
      });
    });

    if (isError) {
      toast.error('You must save the module before leaving', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: true,
      });
      struct.setStructs(lstStruct);
      userModule.updateStructs(convertStructs(lstStruct));
    }

    return isError;
  };

  return {
    structs,
    types,
    getStructs,
    convertStructs,
    handelAddStruct,
    handelRemoveStruct,
    handelAddVariable,
    handelRemoveVariable,
    handleChangeNameStruct,
    handleChangeVariable,
    handleErrorStructs,
  };
};

export default useStructPage;
