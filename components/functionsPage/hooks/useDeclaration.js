import { ASSIGN_TYPE, ELEMENT_TYPE, VALUE_TYPE_OPTIONS } from '@/config/constant/common';
import useValidateVariableName from '@/hooks/useValidateVariableName';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

const typeAllowLocation = ['string', 'bytes'];

const useDeclaration = () => {
  const { declaration: dataDeclaration, listType } = useSelector((state) => state.declaration);
  const { declaration } = useDispatch();
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

  const handleChange = (field, type, e) => {
    let data = {};
    switch (type) {
      case ELEMENT_TYPE.INPUT:
        data = { ...dataDeclaration, [field]: e.target.value };
        if (field === 'indentifier') {
          data = { ...data, indentifierError: indentifierError(e.target.value) };
        }
        break;
      case ELEMENT_TYPE.SELECT:
        data = { ...dataDeclaration, [field]: e.value };
        break;

      case ELEMENT_TYPE.CHECK:
        data = { ...dataDeclaration, [field]: e.target.checked };
        break;

      default:
        data = dataDeclaration;
        break;
    }

    declaration.updateDeclaration(data);
  };

  const isShowLocation = () => {
    let isShow = false;
    const typeIsStruct = VALUE_TYPE_OPTIONS.find((item) => item?.value === dataDeclaration?.declarationType);
    if (
      (dataDeclaration?.declarationType &&
        (typeAllowLocation.includes(dataDeclaration?.declarationType) || _.isEmpty(typeIsStruct))) ||
      dataDeclaration?.isArray
    ) {
      isShow = true;
    }

    return isShow;
  };

  const isShowInputText = () => {
    let isShow = false;
    if (dataDeclaration?.isAssign && dataDeclaration?.assignType === ASSIGN_TYPE.VALUE_INPUT) {
      isShow = true;
    }

    return isShow;
  };

  const isShowExpression = () => {
    let isShow = false;
    if (dataDeclaration?.isAssign && dataDeclaration?.assignType === ASSIGN_TYPE.EXPRESSION) {
      isShow = true;
    }

    return isShow;
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
    dataDeclaration,
    listType,
    handleChange,
    isShowLocation,
    isShowInputText,
    isShowExpression,
    indentifierError,
    convertDeclaration,
  };
};

export default useDeclaration;
