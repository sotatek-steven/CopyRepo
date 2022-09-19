import { ELEMENT_TYPE } from '@/config/constant/common';
import { REGEX } from '@/config/constant/regex';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const INIT_ITEM = {
  type: 'errors',
  parameters: [],
  function: [],
};

const INIT_PARAM = {
  type: 'address',
  name: '',
  errorName: null,
};

const regex = new RegExp(REGEX.VARIABLE_NAME);

const useErrorTab = () => {
  const { dataError } = useSelector((state) => state.error);
  const moduleDetail = useSelector((state) => state.userModule);
  const { duplicateNames } = useSelector((state) => state.modules);
  const { error, userModule } = useDispatch();
  const [typeParam, setTypeParam] = useState('');

  const handleAddItem = () => {
    const init = JSON.parse(JSON.stringify(INIT_ITEM));
    const data = [...dataError];
    data.push({ ...init, _id: Date.now() });

    error.setDataError(data);
    const { errors } = convertToErrorModule(data);
    userModule.updateErrors(errors);
  };

  const handleRemoveItem = (itemId) => {
    const iItem = dataError.findIndex(({ _id }) => _id === itemId);
    const data = [...dataError];
    data.splice(iItem, 1);

    const { data: dataEE, numErr } = checkValidateItemName(data);
    error.setDataError(dataEE);
    error.setNumberError(numErr);

    const { errors } = convertToErrorModule(dataEE);
    userModule.updateErrors(errors);
  };

  useEffect(() => {
    if (dataError?.length) {
      const { data, numErr } = checkValidateItemName(dataError);
      error.setDataError(data);
      error.setNumberError(numErr);

      const { errors } = convertToErrorModule(data);
      userModule.updateErrors(errors);
    }
  }, [duplicateNames]);

  const checkValidateItemName = (data) => {
    let numErr = 0;
    const listFuncName = moduleDetail?.sources?.functions?.map((item) => item?.name);
    data.forEach((item) => {
      const isDuplicateModuleName = moduleDetail?.name === item?.name;
      const isDuplicateFuncName = listFuncName?.includes(item?.name);
      const isDuplicateVariableName = duplicateNames?.includes(item?.name);
      if (item?.name) {
        if (isDuplicateVariableName) {
          item.errorName = 'Found existing state variable with the same name';
          numErr++;
        } else if (isDuplicateModuleName) {
          item.errorName = 'Found existing module with the same name';
          numErr++;
        } else if (isDuplicateFuncName) {
          item.errorName = 'Found existing function with the same name';
          numErr++;
        } else {
          item.errorName = null;
        }
      } else if (item?.errorName) {
        numErr++;
      }
    });
    return { data, numErr };
  };

  const handleChangeItem = (itemId, field, e, type) => {
    const iItem = dataError.findIndex(({ _id }) => _id === itemId);
    const data = [...dataError];

    switch (type) {
      case ELEMENT_TYPE.INPUT:
        data[iItem][field] = e.target.value;
        if (field === 'name') {
          data[iItem]['errorName'] = null;

          if (!e.target.value.trim()) {
            data[iItem]['errorName'] = 'This field is required';
          }
        }
        break;

      case ELEMENT_TYPE.SELECT:
        if (field === 'type') {
          data[iItem][field] = e?.value;
          data[iItem]['functions'] = [];
        }
        if (field === 'functions') {
          data[iItem][field] = e?.map((item) => item?.value);
          if (e?.length) {
            const funcId = e[0]?.value?.split('-')[0];
            const eventName = e[0]?.value?.split('-')[1];
            const functionSelected = moduleDetail.sources?.functions?.find((item) => item?._id === funcId);
            const eventSelected = functionSelected?.[`${data[iItem]?.type}`]?.find((item) => item?.name === eventName);
            const params = eventSelected?.params?.map((param) => {
              return {
                _id: param?._id,
                type: param?.type,
                name: '',
                errorName: null,
              };
            });
            data[iItem]['parameters'] = params;
          }
        }
        break;

      default:
        break;
    }

    const { data: dataEE, numErr } = checkValidateItemName(data);
    error.setDataError(dataEE);
    error.setNumberError(numErr);

    const { errors } = convertToErrorModule(dataEE);
    userModule.updateErrors(errors);
  };

  const handleAddParam = (itemId) => {
    const iItem = dataError.findIndex(({ _id }) => _id === itemId);
    const data = [...dataError];
    const dataParam = JSON.parse(JSON.stringify(INIT_PARAM));
    data[iItem]['parameters'] = _.concat(data[iItem]['parameters'], [{ ...dataParam, _id: Date.now() }]);
    data[iItem]['functions'] = [];

    error.setDataError(data);
    const { errors } = convertToErrorModule(data);
    userModule.updateErrors(errors);
  };

  const handleRemoveParam = (itemId, paramId) => {
    const iItem = dataError.findIndex(({ _id }) => _id === itemId);
    const data = [...dataError];

    // Remove Param
    data[iItem]['parameters'] = _.remove(data[iItem]['parameters'], (item) => item?._id !== paramId);
    data[iItem]['functions'] = [];

    error.setDataError(data);
    const { errors } = convertToErrorModule(data);
    userModule.updateErrors(errors);
  };

  const handleChangeParam = (itemId, paramId, e, field, type) => {
    const iItem = dataError.findIndex(({ _id }) => _id === itemId);
    const iParam = dataError[iItem]?.parameters.findIndex(({ _id }) => _id === paramId);
    const data = [...dataError];

    switch (type) {
      case ELEMENT_TYPE.INPUT:
        data[iItem].parameters[iParam][field] = e.target.value;
        if (field === 'name') {
          data[iItem].parameters[iParam]['errorName'] = null;

          if (!e.target.value.trim()) {
            data[iItem].parameters[iParam]['errorName'] = 'Name should not be blank';
          } else if (!regex.test(e.target.value)) {
            data[iItem].parameters[iParam]['errorName'] = 'Invalid name';
          }
        }
        break;

      case ELEMENT_TYPE.SELECT:
        data[iItem].parameters[iParam][field] = e?.value;
        data[iItem]['functions'] = [];
        setTypeParam(Date.now());
        break;

      default:
        break;
    }

    error.setDataError(data);
    const { errors } = convertToErrorModule(data);
    userModule.updateErrors(errors);
  };

  const convertToErrorModule = (listData) => {
    let errors = [];
    listData?.forEach((data) => {
      const params = data?.parameters?.map((param) => {
        return {
          label: param?.name,
          type: param?.type,
        };
      });
      const functions = data?.functions?.map((funcItem) => {
        return {
          func: funcItem?.split('-')[0],
          name: funcItem?.split('-')[1],
        };
      });

      const item = {
        name: data?.name,
        params,
        functions,
      };

      errors.push(item);
    });

    return { errors };
  };

  const convertToErrorShow = (listData) => {
    const cloneData = listData?.map((data) => {
      const parameters = data?.params?.map((param) => {
        return {
          _id: param?._id,
          type: param?.type,
          name: param?.label,
          errorName: null,
        };
      });
      const functions = data?.functions?.map((item) => {
        return `${item?.func}-${item?.name}`;
      });

      return {
        _id: data?._id,
        type: data?.type,
        name: data?.name,
        parameters,
        functions,
        errorName: null,
      };
    });

    const { data, numErr } = checkValidateItemName(cloneData);
    error.setDataError(data);
    error.setNumberError(numErr);

    const { errors } = convertToErrorModule(data);
    userModule.updateErrors(errors);
  };

  const checkErrorTab = () => {
    let isError = false;
    const data = [...dataError];
    let numErr = 0;
    data.forEach((item) => {
      if (!item?.name?.trim()) {
        item.errorName = 'This field is required';
        isError = true;
      } else if (item?.errorName) {
        isError = true;
        numErr++;
      }
    });

    error.setDataError(data);
    error.setNumberError(numErr);

    const { errors } = convertToErrorModule(data);
    userModule.updateErrors(errors);

    return isError;
  };

  return {
    typeParam,
    dataError,
    handleAddItem,
    handleRemoveItem,
    handleChangeItem,
    handleAddParam,
    handleRemoveParam,
    handleChangeParam,
    convertToErrorShow,
    checkErrorTab,
    convertToErrorModule,
  };
};

export default useErrorTab;
