import { LOCATION_TYPE_OPTION } from '@/config/constant/common';
import useValidateVariableName from '@/hooks/useValidateVariableName';
import _ from 'lodash';
import { useSelector } from 'react-redux';

const useDeclaration = () => {
  const { listType } = useSelector((state) => state.declaration);
  const { validateSyntax, checkExistingFunction, checkExistingStateVariable } = useValidateVariableName();

  const indentifierError = (value) => {
    let errorText = '';
    if (!value) {
      errorText = 'This field is required';
    } else {
      if (checkExistingFunction(value)) {
        errorText = 'Found an existing function with the same name';
      } else if (!validateSyntax(value)) {
        errorText = 'Invalid name';
      }
    }
    return errorText;
  };

  const convertDeclaration = (data, listData = [], position = { x: 100, y: 200 }) => {
    if (data?.type === 'declaration') {
      const { params } = data;
      const decla = {
        ...params,
        declarationType: params?.type,
        assignType: params?.value?.type,
        inputText: '',
        type: data?.type,
        position,
      };
      listData.push(decla);
    }

    if (!_.isEmpty(data?.next)) {
      const newPosition = { ...position, x: position?.x + 300 };
      convertDeclaration(data?.next, listData, newPosition);
    }

    return listData;
  };

  const validateDeclaration = (data) => {
    const properties = Object.getOwnPropertyNames(data);
    console.log(properties);

    if (!data?.type || (data?.type && _.findIndex(listType, (item) => item.value === data.type) === -1)) {
      return 'Type is invalid';
    }

    if (data?.errorIsArray) {
      return 'Array wrong format';
    }

    if (data?.location && _.findIndex(LOCATION_TYPE_OPTION, (item) => item.value === data.location) === -1) {
      return 'Location is invalid';
    }

    if (data?.indentifier && !validateSyntax(data?.indentifier)) {
      return 'Indentifier is invalid';
    }

    if (data?.indentifier && checkExistingFunction(data?.indentifier)) {
      return 'Found an existing function params with the same name';
    }

    if (data?.indentifier && checkExistingStateVariable(data?.indentifier)) {
      return 'Found an existing declaration with the same name';
    }

    // TODO Validate value
  };

  return {
    listType,
    indentifierError,
    convertDeclaration,
    validateDeclaration,
  };
};

export default useDeclaration;
