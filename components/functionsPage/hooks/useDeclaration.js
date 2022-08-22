import { ASSIGN_TYPE, ELEMENT_TYPE, VALUE_TYPE_OPTIONS } from '@/config/constant/common';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

const typeAllowLocation = ['string', 'bytes'];

const useDeclaration = () => {
  const { declaration: dataDeclaration, listType } = useSelector((state) => state.declaration);
  const { declaration } = useDispatch();

  const handleChange = (field, type, e) => {
    let data = {};
    switch (type) {
      case ELEMENT_TYPE.INPUT:
        data = { ...dataDeclaration, [field]: e.target.value };
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
    const typeIsStruct = VALUE_TYPE_OPTIONS.find((item) => item?.value === dataDeclaration?.type);
    if (
      (dataDeclaration?.type && (typeAllowLocation.includes(dataDeclaration?.type) || _.isEmpty(typeIsStruct))) ||
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

  return {
    dataDeclaration,
    listType,
    handleChange,
    isShowLocation,
    isShowInputText,
  };
};

export default useDeclaration;
