import { NEW_ID } from '@/config/constant/common';
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

  return {
    values,
    handleAddValues,
  };
};

export default useValuesTab;
