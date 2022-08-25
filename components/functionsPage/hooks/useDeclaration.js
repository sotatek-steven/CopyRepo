import useValidateVariableName from '@/hooks/useValidateVariableName';
import _ from 'lodash';
import { useSelector } from 'react-redux';

const useDeclaration = () => {
  const { listType } = useSelector((state) => state.declaration);
  const { validateSyntax, checkExistingFunction } = useValidateVariableName();

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

  return {
    listType,
    indentifierError,
    convertDeclaration,
  };
};

export default useDeclaration;
