import useModule from '@/hooks/useModule';
import { useDispatch, useSelector } from 'react-redux';

const useMappingData = (id) => {
  const {
    variables: { mappings },
  } = useSelector((state) => state.userModule);
  const { userModule, mapping } = useDispatch();
  const { checkValidateMapping } = useModule();

  const data = mappings.find((item) => item._id === id);

  const updateValue = (newValue, oldValue) => {
    return typeof newValue !== 'undefined' ? newValue : oldValue;
  };

  const updateData = ({ scope, label, functions, type }, isAddNew = false) => {
    let updatedMapping = mappings.map((item) => {
      if (item._id !== id) return item;

      const { scope: _scope, label: _label, functions: _functions, type: _type } = item;
      let error = false;
      let errorText = null;
      if (!isAddNew) {
        error = updateValue(label, _label) ? false : true;
        errorText = updateValue(label, _label) ? null : 'Variable name should not be empty';
      }

      return {
        ...item,
        scope: updateValue(scope, _scope),
        label: updateValue(label, _label),
        functions: updateValue(functions, _functions),
        type: updateValue(type, _type),
        error: error,
        errorText: errorText,
      };
    });

    const { data, numErr, funcIds } = checkValidateMapping(updatedMapping);

    mapping.setNumberError(numErr);
    mapping.setErrorFunctions(funcIds);
    userModule.updateMappings(data);
  };

  return [data, updateData, checkValidateMapping];
};

export default useMappingData;
