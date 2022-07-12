import { ELEMENT_TYPE, NEW_ID } from '@/config/constant/common';
import { useDispatch, useSelector } from 'react-redux';

const OBJECT = {
  valueType: '',
  isArray: false,
  scope: 'public',
  isConstant: false,
  variableName: '',
  variableValue: '',
  isDefaultValue: false,
  mapToFunctions: '',
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
        if (field === 'name') {
          data[iValue]['errorName'] = e.target.value.trim() ? null : 'Variable name should not be empty';
        }
        break;

      case ELEMENT_TYPE.SELECT:
        if (field === 'type' && e.target.value === 'structs') {
          const init = JSON.parse(JSON.stringify(OBJECT));
          data[iValue] = { ...init, _id: `${NEW_ID}_${count}`, type: e.target.value };
        } else {
          data[iValue][field] = e.target.value;
        }
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
