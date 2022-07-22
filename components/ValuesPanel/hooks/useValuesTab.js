import { ELEMENT_TYPE, NEW_ID } from '@/config/constant/common';
import { REGEX } from '@/config/constant/regex';
import { useDispatch, useSelector } from 'react-redux';

const OBJECT = {
  _id: Date.now(),
  type: '',
  isArray: false,
  scope: 'public',
  isConst: false,
  label: '',
  variableValue: '',
  isDefaultValue: false,
  functions: '',
};

const useValuesTab = () => {
  const { values, count } = useSelector((state) => state.value);
  const { value } = useDispatch();

  const handleAddValues = () => {
    const init = JSON.parse(JSON.stringify(OBJECT));
    const data = [...values];
    data.push({ ...init, _id: `${NEW_ID}_${count}` });
    value.setValues(data);
    value.setCount(count + 1);
  };

  const handleRemoveValue = (valueId) => {
    const iValue = values.findIndex(({ _id }) => _id === valueId);
    const data = [...values];
    data.splice(iValue, 1);

    value.setValues(data);
  };

  const handleChangeValue = (valueId, field, e, type) => {
    const iValue = values.findIndex(({ _id }) => _id === valueId);
    const data = [...values];
    switch (type) {
      case ELEMENT_TYPE.INPUT:
        data[iValue][field] = e.target.value;

        if (field === 'label') {
          if (data[iValue]['isConst'] == true) data[iValue][field] = e.target.value.toUpperCase();

          data[iValue]['errorName'] = null;
          const regex = new RegExp(REGEX.VARIABLE_NAME);
          if (!e.target.value.trim()) {
            data[iValue]['errorName'] = 'Variable name should not be empty';
          } else if (!regex.test(e.target.value.trim())) {
            data[iValue]['errorName'] = 'Invalid variable name';
          }
        }

        break;

      case ELEMENT_TYPE.SELECT:
        if (field === 'isArray' && e.target.value === true) {
          data[iValue]['isConst'] = 'false';
        }
        if (field === 'isConst' && e.target.value === true) {
          data[iValue]['label'] = data[iValue]['label'].toUpperCase();
        }

        if (field === 'isDefaultValue' && e.target.value === true) {
          data[iValue]['variableValue'] = '';
        }
        data[iValue][field] = e.target.value;
        break;

      default:
        break;
    }

    value.setValues(data);
  };

  return {
    values,
    handleAddValues,
    handleRemoveValue,
    handleChangeValue,
  };
};

export default useValuesTab;
