import { REGEX } from '@/config/constant/regex';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
const regex = new RegExp(REGEX.VARIABLE_NAME);

const useMappingData = (id) => {
  const {
    variables: { mappings },
  } = useSelector((state) => state.userModule);
  const { userModule, mapping } = useDispatch();

  const data = mappings.find((item) => item._id === id);

  const duplicateNames = _.uniq(
    mappings.map(({ label }) => label).filter((v, i, vIds) => !!v && vIds.indexOf(v) !== i)
  );

  const updateValue = (newValue, oldValue) => {
    return typeof newValue !== 'undefined' ? newValue : oldValue;
  };

  const checkValidateMapping = (data) => {
    let numErr = 0;
    const duplicateNames = _.uniq(data.map(({ label }) => label).filter((v, i, vIds) => !!v && vIds.indexOf(v) !== i));

    data.forEach((item) => {
      if (item?.label.trim()) {
        if (duplicateNames?.includes(item.label)) {
          numErr++;
          item.error = true;
          item.errorText = 'Variable name cannot be duplicated';
        } else {
          if (!regex.test(item?.label?.trim())) {
            numErr++;
            item.error = true;
            item.errorText = 'Invalid variable name';
          } else {
            item.error = false;
            item.errorText = null;
          }
        }
      } else if (item.errorText) {
        numErr++;
      }
    });

    return { data, numErr };
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

    const { data, numErr } = checkValidateMapping(updatedMapping);

    mapping.setNumberError(numErr);
    userModule.updateMappings(data);
  };

  return [data, updateData, duplicateNames];
};

export default useMappingData;
