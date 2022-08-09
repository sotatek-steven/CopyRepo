import { EDIT_ID } from '@/config/constant/common';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

const VALUE = {
  name: '',
};

const useEnumPage = () => {
  const { enums } = useSelector((state) => state.enumState);
  const { enumState } = useDispatch();

  const getEnums = async (lstEnum) => {
    const data = lstEnum?.map((item, idx) => {
      return {
        _id: `${EDIT_ID}_${idx}`,
        enumId: item?._id,
        name: item?.name,
        values: item?.values,
      };
    });

    const dataOrigin = JSON.parse(JSON.stringify(data));
    enumState.setOriginEnums(dataOrigin);
    enumState.setEnums(data);
  };

  const handelAddEnum = (initEnum) => {
    const init = JSON.parse(JSON.stringify(initEnum));
    const initData = init?.map((item, index) => {
      return {
        ...item,
        _id: `${Date.now()}-${index}`,
      };
    });
    const data = _.concat(enums, initData);
    enumState.setEnums(data);
  };

  const handelRemoveEnum = (enumId) => {
    const iEnum = enums.findIndex(({ _id }) => _id === enumId);
    const data = [...enums];
    data.splice(iEnum, 1);

    enumState.setEnums(data);
  };

  const handleChangeNameEnum = (enumId, e) => {
    const value = e.target.value;
    const iEnum = enums.findIndex(({ _id }) => _id === enumId);
    const data = [...enums];
    data[iEnum].name = value;
    data[iEnum].errorName = false;
    if (!value?.trim()) {
      data[iEnum].errorName = 'This field is required';
    }

    enumState.setEnums(data);
  };

  const handelAddValue = (enumId) => {
    const iEnum = enums.findIndex(({ _id }) => _id === enumId);
    const value = JSON.parse(JSON.stringify(VALUE));
    const data = [...enums];
    data[iEnum]?.values?.push({ ...value, _id: Date.now() });

    enumState.setEnums(data);
  };

  const handelRemoveValue = (enumId, valueId) => {
    const iEnum = enums.findIndex(({ _id }) => _id === enumId);
    const iValue = enums[iEnum]?.values.findIndex(({ _id }) => _id === valueId);
    const data = [...enums];
    data[iEnum]?.values?.splice(iValue, 1);

    enumState.setEnums(data);
  };

  const handleChangeValue = (enumId, valueId, e) => {
    const iEnum = enums.findIndex(({ _id }) => _id === enumId);
    const iValue = enums[iEnum]?.values.findIndex(({ _id }) => _id === valueId);
    const data = [...enums];
    data[iEnum].values[iValue].name = e.target.value;

    enumState.setEnums(data);
  };

  return {
    enums,
    getEnums,
    handelAddEnum,
    handelRemoveEnum,
    handleChangeNameEnum,
    handelAddValue,
    handelRemoveValue,
    handleChangeValue,
  };
};

export default useEnumPage;
