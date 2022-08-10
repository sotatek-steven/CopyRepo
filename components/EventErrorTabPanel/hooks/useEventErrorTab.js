import { ELEMENT_TYPE, EVENT_ERROR_TYPE } from '@/config/constant/common';
import { REGEX } from '@/config/constant/regex';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const INIT_ITEM = {
  type: '',
  parameters: [],
  function: '',
};

const INIT_PARAM = {
  type: '',
  name: '',
  errorName: null,
};

const regex = new RegExp(REGEX.VARIABLE_NAME);

const useEventErrorTab = () => {
  const { dataEventError } = useSelector((state) => state.eventError);
  const moduleDetail = useSelector((state) => state.userModule);

  const { eventError, userModule } = useDispatch();

  const handleAddItem = () => {
    const init = JSON.parse(JSON.stringify(INIT_ITEM));
    const data = [...dataEventError];
    data.push({ ...init, _id: Date.now() });

    eventError.setDataEventError(data);
    const { events, errors } = convertToEventErrorModule(data);
    userModule.updateEvents(events);
    userModule.updateErrors(errors);
  };

  const handleRemoveItem = (itemId) => {
    const iItem = dataEventError.findIndex(({ _id }) => _id === itemId);
    const data = [...dataEventError];
    data.splice(iItem, 1);

    eventError.setDataEventError(data);
    const { events, errors } = convertToEventErrorModule(data);
    userModule.updateEvents(events);
    userModule.updateErrors(errors);
  };

  const checkValidateItemName = (name) => {
    let isValid = true;
    const isDuplicateModuleName = moduleDetail?.name?.toUpperCase() === name?.toUpperCase();
    const listFuncName = moduleDetail?.sources?.functions?.map((item) => item?.name?.toUpperCase());
    const isDuplicateFuncName = listFuncName?.includes(name?.toUpperCase());
    if (!regex.test(name.trim()) || isDuplicateModuleName || isDuplicateFuncName) {
      isValid = false;
    }

    return isValid;
  };

  const handleChangeItem = (itemId, field, e, type) => {
    const iItem = dataEventError.findIndex(({ _id }) => _id === itemId);
    const data = [...dataEventError];

    switch (type) {
      case ELEMENT_TYPE.INPUT:
        data[iItem][field] = e.target.value;
        if (field === 'name') {
          data[iItem]['errorName'] = null;

          if (!e.target.value.trim()) {
            data[iItem]['errorName'] = 'This field is required';
          } else if (!checkValidateItemName(e.target.value)) {
            data[iItem]['errorName'] = 'Invalid Event name';
          }
        }
        break;

      case ELEMENT_TYPE.SELECT:
        data[iItem][field] = e?.value;

        if (field === 'function') {
          const funcId = e?.value?.split('-')[0];
          const eventName = e?.value?.split('-')[1];
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
        break;

      default:
        break;
    }

    eventError.setDataEventError(data);
    const { events, errors } = convertToEventErrorModule(data);
    userModule.updateEvents(events);
    userModule.updateErrors(errors);
  };

  const handleAddParam = (itemId) => {
    const iItem = dataEventError.findIndex(({ _id }) => _id === itemId);
    const data = [...dataEventError];
    const dataParam = JSON.parse(JSON.stringify(INIT_PARAM));
    data[iItem]['parameters'].push({ dataParam, _id: Date.now() });
    data[iItem]['function'] = '';

    eventError.setDataEventError(data);
    const { events, errors } = convertToEventErrorModule(data);
    userModule.updateEvents(events);
    userModule.updateErrors(errors);
  };

  const handleRemoveParam = (itemId, paramId) => {
    const iItem = dataEventError.findIndex(({ _id }) => _id === itemId);
    const iParam = dataEventError[iItem]?.parameters.findIndex(({ _id }) => _id === paramId);
    const data = [...dataEventError];
    data[iItem]?.parameters?.splice(iParam, 1);
    data[iItem]['function'] = '';

    eventError.setDataEventError(data);
    const { events, errors } = convertToEventErrorModule(data);
    userModule.updateEvents(events);
    userModule.updateErrors(errors);
  };

  const handleChangeParam = (itemId, paramId, e, field, type) => {
    const iItem = dataEventError.findIndex(({ _id }) => _id === itemId);
    const iParam = dataEventError[iItem]?.parameters.findIndex(({ _id }) => _id === paramId);
    const data = [...dataEventError];

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
        data[iItem]['function'] = '';
        break;

      default:
        break;
    }

    eventError.setDataEventError(data);
    const { events, errors } = convertToEventErrorModule(data);

    userModule.updateEvents(events);
    userModule.updateErrors(errors);
  };

  const convertToEventErrorModule = (listData) => {
    let events = [];
    let errors = [];
    listData?.forEach((data) => {
      const params = data?.parameters.map((param) => {
        return {
          label: param?.name,
          type: param?.type,
        };
      });
      const functions = [
        {
          func: data?.function?.split('-')[0],
          name: data?.function?.split('-')[1],
        },
      ];
      const item = {
        name: data?.name,
        params,
        functions,
      };

      if (data?.type === EVENT_ERROR_TYPE.EVENT) {
        events.push(item);
      } else if (data?.type === EVENT_ERROR_TYPE.ERROR) {
        errors.push(item);
      }
    });

    return { events, errors };
  };

  const convertToEventErrorShow = (listData) => {
    const cloneData = listData?.map((data) => {
      const parameters = data?.params?.map((param) => {
        return {
          _id: param?._id,
          type: param?.type,
          name: param?.label,
          errorName: null,
        };
      });
      let func = '';
      if (data?.functions?.length) {
        func = `${data.functions[0].func}-${data?.functions[0].name}`;
      }

      return {
        _id: data?._id,
        type: data?.type,
        name: data?.name,
        parameters,
        function: func,
        errorName: null,
      };
    });
    eventError.setDataEventError(cloneData);
    return cloneData;
  };

  const checkErrorTab = () => {
    let isError = false;
    const data = [...dataEventError];
    data.forEach((item) => {
      if (!item?.name.trim()) {
        item.errorName = 'This field is required';
        isError = true;
      } else if (!checkValidateItemName(item?.name)) {
        item.errorName = item?.type === EVENT_ERROR_TYPE.EVENT ? 'Invalid Event name' : 'Invalid Error name';
        isError = true;
      }
      item?.parameters.forEach((param) => {
        if (!param?.name.trim()) {
          param.errorName = 'Name should not be blank';
          isError = true;
        } else if (!regex.test(param?.name)) {
          param.errorName = 'Invalid name';
          isError = true;
        }
      });
    });

    eventError.setDataEventError(data);
    if (isError) {
      toast.warning('Event & Error tab has errors');
    }

    return isError;
  };

  return {
    dataEventError,
    handleAddItem,
    handleRemoveItem,
    handleChangeItem,
    handleAddParam,
    handleRemoveParam,
    handleChangeParam,
    convertToEventErrorShow,
    checkErrorTab,
  };
};

export default useEventErrorTab;
