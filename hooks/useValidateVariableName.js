import { REGEX } from '@/config/constant/regex';
import { useSelector } from 'react-redux';
const regex = new RegExp(REGEX.VARIABLE_NAME);

const useValidateVariableName = () => {
  const { variables: stateVariables } = useSelector((state) => state.userModule);
  const { params, name } = useSelector((state) => state.functionDefinition);
  const { functions } = useSelector((state) => state.functions);

  const checkExistingStateVariable = (value) => {
    const { mappings, structs, values } = stateVariables;
    let names = [];
    mappings.forEach((items) => {
      names.push(items.label);
    });

    structs.forEach((items) => {
      names.push(items.label);
    });

    values.forEach((items) => {
      names.push(items.label);
    });

    return names.find((name) => name === value);
  };

  const checkExistingParameter = (value, id) => {
    if (!params) return false;
    return params.find((item) => id !== item._id && item.label.value === value);
  };

  const validateSyntax = (value) => regex.test(value);

  const checkExistingFunction = (value) => {
    if (name.value === value) return true;
    if (!functions) return false;
    return functions.find((item) => item.name === value);
  };

  /**
   * checkExistingLocalVariable
   */

  return { checkExistingStateVariable, checkExistingParameter, validateSyntax, checkExistingFunction };
};

export default useValidateVariableName;
