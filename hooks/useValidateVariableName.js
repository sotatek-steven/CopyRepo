import { REGEX } from '@/config/constant/regex';
import { useSelector } from 'react-redux';
const regex = new RegExp(REGEX.VARIABLE_NAME);

const useValidateVariableName = () => {
  const { name: moduleName, variables: stateVariables } = useSelector((state) => state.userModule);
  const { params, name } = useSelector((state) => state.functionDefinition);
  const { functions } = useSelector((state) => state.functions);
  const contractState = useSelector((state) => state.contract);
  const { nodes: blocksState } = useSelector((state) => state.logicBlocks);

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

  const checkExistingModule = (value) => {
    return moduleName === value;
  };

  const checkExistingContract = (value) => {
    return contractState.current.name === value;
  };

  const checkExistingVariableBlock = (value) => {
    let isDuplicate = false;
    const declarationBlock = blocksState.filter((block) => block.type === 'declaration');
    declarationBlock?.every((block) => {
      if (block?.data?.params?.indentifier === value) {
        isDuplicate = true;
        return false;
      }
      return true;
    });
    return isDuplicate;
  };

  /**
   * checkExistingLocalVariable
   */

  return {
    checkExistingStateVariable,
    checkExistingParameter,
    validateSyntax,
    checkExistingFunction,
    checkExistingModule,
    checkExistingContract,
    checkExistingVariableBlock,
  };
};

export default useValidateVariableName;
