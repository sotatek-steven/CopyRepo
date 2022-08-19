import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const VALUE = {
  name: '',
};

const useEnumPage = () => {
  const { enums } = useSelector((state) => state.enumState);
  const { enumState, userModule } = useDispatch();

  const getEnums = async (lstEnum) => {
    const data = lstEnum?.map((item) => {
      const values = item?.content.map((con) => {
        return {
          ...con,
          name: con.label,
        };
      });
      return {
        _id: item?._id,
        name: item?.name,
        values,
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
    userModule.updateEnums(convertToEnumModule(data));
  };

  const handelRemoveEnum = (enumId) => {
    const iEnum = enums.findIndex(({ _id }) => _id === enumId);
    const data = [...enums];
    data.splice(iEnum, 1);

    enumState.setEnums(data);
    userModule.updateEnums(convertToEnumModule(data));
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
    userModule.updateEnums(convertToEnumModule(data));
  };

  const handelAddValue = (enumId) => {
    const iEnum = enums.findIndex(({ _id }) => _id === enumId);
    const value = JSON.parse(JSON.stringify(VALUE));
    const data = [...enums];
    data[iEnum]?.values?.push({ ...value, _id: Date.now() });

    enumState.setEnums(data);
    userModule.updateEnums(convertToEnumModule(data));
  };

  const handelRemoveValue = (enumId, valueId) => {
    const iEnum = enums.findIndex(({ _id }) => _id === enumId);
    const iValue = enums[iEnum]?.values.findIndex(({ _id }) => _id === valueId);
    const data = [...enums];
    data[iEnum]?.values?.splice(iValue, 1);

    enumState.setEnums(data);
    userModule.updateEnums(convertToEnumModule(data));
  };

  const handleChangeValue = (enumId, valueId, e) => {
    const iEnum = enums.findIndex(({ _id }) => _id === enumId);
    const iValue = enums[iEnum]?.values.findIndex(({ _id }) => _id === valueId);
    const data = [...enums];
    data[iEnum].values[iValue].name = e.target.value;
    if (!e.target.value?.trim()) {
      data[iEnum].values[iValue].errorName = 'Value should not be empty';
    }

    enumState.setEnums(data);
    userModule.updateEnums(convertToEnumModule(data));
  };

  const convertToEnumModule = (listData) => {
    const cloneData = listData?.map((data) => {
      const content = data?.values.map((item) => {
        return {
          label: item?.name?.trim(),
        };
      });

      return {
        name: data?.name?.trim(),
        content,
      };
    });

    return cloneData;
  };

  const checkErrorEnumTab = () => {
    let isError = false;
    const data = [...enums];
    data.forEach((item) => {
      if (!item?.name.trim()) {
        item.errorName = 'This field is required';
        isError = true;
      }
      item?.values.map(value => {
        if (!value?.name.trim()) {
          value.errorName = 'Value should not be empty'
          isError = true;
        }
      })
    });

    enumState.setEnums(data);
    if (isError) {
      toast.warning('Enum tab has errors');
    }

    return isError;
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
    checkErrorEnumTab,
  };
};

export default useEnumPage;
