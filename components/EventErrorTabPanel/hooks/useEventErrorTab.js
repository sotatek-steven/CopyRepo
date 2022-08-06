import { ELEMENT_TYPE } from '@/config/constant/common';
import { REGEX } from '@/config/constant/regex';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

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

  const { eventError } = useDispatch();

  const handleAddItem = () => {
    const init = JSON.parse(JSON.stringify(INIT_ITEM));
    const data = [...dataEventError];
    data.push({ ...init, _id: Date.now() });

    eventError.setDataEventError(data);
  };

  const handleRemoveItem = (itemId) => {
    const iItem = dataEventError.findIndex(({ _id }) => _id === itemId);
    const data = [...dataEventError];
    data.splice(iItem, 1);

    eventError.setDataEventError(data);
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
          const eventId = e?.value?.split('-')[1];

          const functionSelected = moduleDetail.sources?.functions?.find((item) => item?._id === funcId);
          const eventSelected = functionSelected?.events?.find((item) => item?._id === eventId);

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
  };

  const handleAddParam = (itemId) => {
    const iItem = dataEventError.findIndex(({ _id }) => _id === itemId);
    const data = [...dataEventError];
    const dataParam = JSON.parse(JSON.stringify(INIT_PARAM));
    data[iItem]['parameters'].push({ dataParam, _id: Date.now() });
    data[iItem]['function'] = '';

    eventError.setDataEventError(data);
  };

  const handleRemoveParam = (itemId, paramId) => {
    const iItem = dataEventError.findIndex(({ _id }) => _id === itemId);
    const iParam = dataEventError[iItem]?.parameters.findIndex(({ _id }) => _id === paramId);
    const data = [...dataEventError];
    data[iItem]?.parameters?.splice(iParam, 1);
    data[iItem]['function'] = '';

    eventError.setDataEventError(data);
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
          } else if (!regex.test(e.target.value.trim())) {
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
  };

  return {
    dataEventError,
    handleAddItem,
    handleRemoveItem,
    handleChangeItem,
    handleAddParam,
    handleRemoveParam,
    handleChangeParam,
  };
};

export default useEventErrorTab;
