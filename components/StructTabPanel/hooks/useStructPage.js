import { ELEMENT_TYPE } from '@/config/constant/common';
import { useState } from 'react';

const NEW_ID = 'ITEM';

const TYPES = ['int', 'boolean', 'string'];

const STRUCTS = [
  {
    name: '',
    _id: 1,
    errorName: false,
    variables: [
      {
        _id: 1,
        type: {
          value: [],
          errorType: false,
        },
        name: {
          value: '',
          errorName: false,
        },
      },
    ],
  },
];

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
  const [structs, setStructs] = useState(JSON.parse(JSON.stringify(STRUCTS)));
  const [types, setTypes] = useState(TYPES);
  const [count, setCount] = useState(0);

  const handelAddStruct = () => {
    const struct = JSON.parse(JSON.stringify(STRUCT));

    setStructs((prev) => {
      const temp = [...prev];
      temp.push({ ...struct, _id: `${NEW_ID}_${count}` });
      return temp;
    });
    setCount((prev) => prev + 1);
  };

  const handelRemoveStruct = (structId) => {
    const iStruct = structs.findIndex(({ _id }) => _id === structId);
    setStructs((prev) => {
      const temp = [...prev];
      temp.splice(iStruct, 1);
      return temp;
    });
  };

  const handelAddVariable = (structId) => {
    const variable = JSON.parse(JSON.stringify(VARIABLE));
    const iStruct = structs.findIndex(({ _id }) => _id === structId);

    setStructs((prev) => {
      const temp = [...prev];
      temp[iStruct]?.variables?.push({ ...variable, _id: `${NEW_ID}_${count}` });
      return temp;
    });
    setCount((prev) => prev + 1);
  };

  const handelRemoveVariable = (structId, variableId) => {
    const iStruct = structs.findIndex(({ _id }) => _id === structId);
    const iVariable = structs[iStruct]?.variables.findIndex(({ _id }) => _id === variableId);
    setStructs((prev) => {
      const temp = [...prev];
      temp[iStruct]?.variables?.splice(iVariable, 1);
      return temp;
    });
  };

  const handleChangeNameStruct = (structId, e) => {
    const value = e.target.value;
    const iStruct = structs.findIndex(({ _id }) => _id === structId);
    const temp = [...structs];
    temp[iStruct].name = value;
    temp[iStruct].errorName = !value?.trim() && 'This is field required';

    setStructs(temp);
  };

  const handleChangeVariable = (structId, variableId, e, type) => {
    const iStruct = structs.findIndex(({ _id }) => _id === structId);
    const iVariable = structs[iStruct]?.variables.findIndex(({ _id }) => _id === variableId);
    const temp = [...structs];

    switch (type) {
      case ELEMENT_TYPE.INPUT:
        temp[iStruct].variables[iVariable].name.value = e.target.value;
        temp[iStruct].variables[iVariable].name.errorName = !e.target.value?.trim() && 'This is field required';
        break;
      case ELEMENT_TYPE.TAG:
        if (!types.includes(e.value)) {
          setTypes((prev) => {
            const temp = [...prev];
            temp.push(e.value);
            return temp;
          });
        }
        temp[iStruct].variables[iVariable].type.value = [e.value];
        temp[iStruct].variables[iVariable].type.errorType = !e.value?.trim() && 'This is field required';
        break;
      default:
        break;
    }

    setStructs(temp);
  };

  const handleError = () => {
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
      setStructs(lstStruct);
    }

    return isError;
  };

  return {
    structs,
    types,
    setStructs,
    handelAddStruct,
    handelRemoveStruct,
    handelAddVariable,
    handelRemoveVariable,
    handleChangeNameStruct,
    handleChangeVariable,
    handleError,
  };
};

export default useStructPage;
