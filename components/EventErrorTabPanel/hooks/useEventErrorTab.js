import { ELEMENT_TYPE } from '@/config/constant/common';
import { REGEX } from '@/config/constant/regex';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

const INIT_ITEM = {
  type: '',
  parameters: [],
  functions: [],
};

const INIT_PARAM = {
  type: '',
  name: '',
  errorName: null,
};

const regex = new RegExp(REGEX.VARIABLE_NAME);

const useEventErrorTab = () => {
  const { dataEventError } = useSelector((state) => state.eventError);
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
          }
        }
        break;

      case ELEMENT_TYPE.SELECT:
        data[iItem][field] = e?.value;
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

    eventError.setDataEventError(data);
  };

  const handleRemoveParam = (itemId, paramId) => {
    const iItem = dataEventError.findIndex(({ _id }) => _id === itemId);
    const iParam = dataEventError[iItem]?.parameters.findIndex(({ _id }) => _id === paramId);
    const data = [...dataEventError];
    data[iItem]?.parameters?.splice(iParam, 1);

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
