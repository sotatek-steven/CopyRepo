import { ELEMENT_TYPE, EDIT_ID } from '@/config/constant/common';
import _ from 'lodash';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const VARIABLE = {
  type: {
    value: '',
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

  const getTypeByStruct = (lstStruct) => {
    return lstStruct?.map((item, idxStruct) => ({ value: `${EDIT_ID}_${idxStruct}`, label: item?.name }));
  };

  const getStructs = async (lstStruct) => {
    const typeTemp = await getTypeByStruct(lstStruct);
    const listType = _.concat(types, typeTemp);

    const data = lstStruct?.map((struct, idxStruct) => {
      const variables = struct.content.map((content, idxContent) => {
        const type = listType.find((item) => item?.label === content?.type);
        return {
          _id: `${EDIT_ID}_${idxStruct}_${idxContent}`,
          type: {
            value: type?.value || 'string',
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
    struct.setTypes(listType);
  };

  const convertStructs = (data) => {
    return data?.map((struct) => {
      const content = struct?.variables?.map((variable) => {
        const type = types.find((item) => item?.value === variable?.type.value);
        return {
          type: type?.label,
          label: variable?.name.value,
        };
      });

      return {
        name: struct?.name,
        content: content,
      };
    });
  };

  const handelAddStruct = (initStruct) => {
    const init = JSON.parse(JSON.stringify(initStruct));
    const initData = init?.map((item, index) => {
      return {
        ...item,
        _id: `${Date.now()}-${index}`,
      };
    });
    const data = _.concat(structs, initData);
    struct.setStructs(data);
    userModule.updateStructs(convertStructs(data));
  };

  const handelRemoveStruct = (structId) => {
    const iStruct = structs.findIndex(({ _id }) => _id === structId);

    if (listStructUsed?.includes(structs[iStruct]?.name)) {
      toast.warning('This struct is using');
      return;
    }
    const data = [...structs];
    data.splice(iStruct, 1);

    struct.setStructs(data);
    userModule.updateStructs(convertStructs(data));
  };

  const handelAddVariable = (structId) => {
    const iStruct = structs.findIndex(({ _id }) => _id === structId);
    if (listStructUsed?.includes(structs[iStruct]?.name)) {
      toast.warning('This struct is used');
      return;
    }
    const variable = JSON.parse(JSON.stringify(VARIABLE));
    const data = [...structs];
    data[iStruct]?.variables?.push({ ...variable, _id: Date.now(), });

    struct.setStructs(data);
    userModule.updateStructs(convertStructs(data));
  };

  const handelRemoveVariable = (structId, variableId) => {
    const iStruct = structs.findIndex(({ _id }) => _id === structId);
    if (listStructUsed?.includes(structs[iStruct]?.name)) {
      toast.warning('This struct is used');
      return;
    }
    const iVariable = structs[iStruct]?.variables.findIndex(({ _id }) => _id === variableId);
    const data = [...structs];
    data[iStruct]?.variables?.splice(iVariable, 1);

    const duplicateArr = checkDuplicateVariableName(data[iStruct].variables);

    data[iStruct].variables.forEach(({ name }) => {
      name.errorName = !!duplicateArr?.includes(name.value) && 'Variable name cannot be duplicated';
    });

    struct.setStructs(data);
    userModule.updateStructs(convertStructs(data));
  };

  const checkDuplicateStructName = () => {
    const duplicateNames = structs.map(({ name }) => name).filter((v, i, vIds) => !!v && vIds.indexOf(v) !== i);
    return duplicateNames;
  };

  const handleChangeNameStruct = (structId, e) => {
    const value = e.target.value;
    const iStruct = structs.findIndex(({ _id }) => _id === structId);
    const data = [...structs];
    data[iStruct].name = value;
    data[iStruct].errorName = false;

    if (!value?.trim()) {
      data[iStruct].errorName = 'This field is required';
    }
    const duplicateArr = checkDuplicateStructName();

    data.forEach((item) => {
      item.errorName = !!duplicateArr?.includes(item?.name) && 'Struct name cannot be duplicated';
    });

    // Add Struct to List Type
    const iType = types.findIndex(({ value }) => value === structId);
    const tempType = [...types];
    if (iType === -1) {
      tempType.push({
        value: structId,
        label: e.target.value,
      });
    } else {
      tempType[iType].label = e.target.value;
    }

    struct.setStructs(data);
    struct.setTypes(tempType);
    userModule.updateStructs(convertStructs(data));
  };

  const checkDuplicateVariableName = (variables) => {
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
          data[iStruct].variables[iVariable].name.errorName = 'This field is required';
        }
        duplicateArr = checkDuplicateVariableName(data[iStruct].variables);

        data[iStruct].variables.forEach(({ name }) => {
          name.errorName = !!duplicateArr?.includes(name.value) && 'Variable name cannot be duplicated';
        });

        break;
      case ELEMENT_TYPE.SELECT:
        data[iStruct].variables[iVariable].type.value = e.value;
        data[iStruct].variables[iVariable].type.errorType = !e.value?.trim() && 'This field is required';
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
        item.errorName = 'This field is required';
        isError = true;
      }
      item?.variables.forEach(({ type, name }) => {
        if (!type?.value?.length) {
          type.errorType = 'This field is required';
          isError = true;
        }
        if (!name?.value.trim()) {
          name.errorName = 'This field is required';
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
