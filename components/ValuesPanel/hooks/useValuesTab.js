import { ELEMENT_TYPE, INIT_VALUE_TYPE } from '@/config/constant/common';
import { REGEX } from '@/config/constant/regex';
import ObjectID from 'bson-objectid';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

const regex = new RegExp(REGEX.VARIABLE_NAME);

const useValuesTab = () => {
  const { values } = useSelector((state) => state.value);
  const { value, userModule } = useDispatch();

  const checkValidateValue = (data, funcIds = []) => {
    let numErr = 0;

    const duplicateNames = data.map(({ label }) => label).filter((v, i, vIds) => !!v && vIds.indexOf(v) !== i);
    data.forEach((item) => {
      if (item?.label) {
        if (duplicateNames?.includes(item.label)) {
          item.errorName = 'Variable name cannot be duplicated';
          numErr++;
          const index = funcIds.findIndex((func) => func?.id === item?.functionId);

          if (index > -1) {
            funcIds[index].totalError++;
          } else {
            funcIds.push({
              id: item?.functionId,
              totalError: 1,
            });
          }
        } else {
          if (!regex.test(item?.label?.trim())) {
            item.errorName = 'Invalid variable name';
            numErr++;
          } else {
            item.errorName = null;
          }
        }
      } else if (item?.errorName) {
        numErr++;
      }
    });

    return { data, numErr, funcIds };
  };

  const handleAddValues = (initValue) => {
    const initData = initValue?.map((item) => {
      return {
        ...item,
        _id: ObjectID(32).toHexString(),
      };
    });
    let data = _.concat(values, initData);
    let numberErr = 0;
    let functionError = [];

    const { data: dataValidate, numErr, funcIds } = checkValidateValue(data);
    data = dataValidate;
    numberErr = numErr;
    functionError = funcIds;

    value.setValues(data);
    value.setNumberError(numberErr);
    const dataClone = convertToValuesModule(data);
    userModule.updateValues(dataClone);

    return functionError;
  };

  const handleRemoveValue = (valueId) => {
    const iValue = values.findIndex(({ _id }) => _id === valueId);
    let data = [...values];
    let numberErr = 0;

    data.splice(iValue, 1);

    const { data: dataValidate, numErr } = checkValidateValue(data);
    data = dataValidate;
    numberErr = numErr;

    value.setValues(data);
    value.setNumberError(numberErr);
    const dataClone = convertToValuesModule(data);
    userModule.updateValues(dataClone);
  };

  const handleChangeValue = (valueId, field, e, type) => {
    const iValue = values.findIndex(({ _id }) => _id === valueId);
    let data = [...values];
    let numberErr = 0;

    switch (type) {
      case ELEMENT_TYPE.INPUT:
        data[iValue][field] = e.target.value;
        if (field === 'label') {
          if (data[iValue]['constant'] == true) data[iValue][field] = e.target.value.toUpperCase();

          data[iValue]['errorName'] = null;
          if (!e.target.value.trim()) {
            data[iValue]['errorName'] = 'This field is required';
          }
        }

        break;

      case ELEMENT_TYPE.SELECT:
        switch (field) {
          case 'isArray':
            data[iValue][field] = e?.value;
            if (e?.value) {
              data[iValue]['constant'] = '';
            }
            break;
          case 'constant':
            data[iValue][field] = e?.value;
            if (e?.value) {
              data[iValue]['label'] = data[iValue]['label'].toUpperCase();
              data[iValue]['isArray'] = false;
            }
            break;
          case 'isDefaultValue':
            data[iValue][field] = e?.value;
            if (e?.value) {
              data[iValue]['valueDefault'] = '';
            }
            break;
          case 'functions':
            data[iValue][field] = e?.map((item) => item?.value);
            break;
          default:
            data[iValue][field] = e?.value;
            break;
        }
        break;

      default:
        break;
    }

    const { data: dataValidate, numErr } = checkValidateValue(data);
    data = dataValidate;
    numberErr = numErr;

    value.setValues(data);
    value.setNumberError(numberErr);
    const dataClone = convertToValuesModule(data);
    userModule.updateValues(dataClone);
  };

  const convertToValuesModule = (data) => {
    const cloneData = data?.map((item) => {
      let valueDefault = [item?.valueDefault];
      if (item?.isArray) {
        valueDefault = item?.valueDefault?.split(',');
      }
      const functions = item?.functions?.map((func) => {
        const array = func?.split('-');
        if (array.length >= 2) {
          return {
            func: array[0],
            variable: array[1],
          };
        }
      });
      return {
        type: item?.type,
        isArray: item?.isArray,
        scope: item?.scope,
        constant: item?.constant,
        label: item?.label,
        valueDefault: item?.isDefaultValue ? [] : valueDefault,
        functions: functions || [],
      };
    });
    return cloneData;
  };

  const converToValueShow = (data) => {
    const cloneData = data?.map((item, iData) => {
      const functions = item?.functions?.map(({ func, variable }) => {
        return `${func}-${variable}`;
      });

      const valueDefault = item?.valueDefault?.join();

      return {
        _id: iData,
        type: item?.type,
        isArray: item?.isArray,
        constant: item?.constant,
        scope: item?.scope,
        label: item?.label,
        valueDefault: valueDefault,
        isDefaultValue: !item?.valueDefault?.length,
        functions: functions,
        errorName: null,
      };
    });

    value.setValues(cloneData);
    return cloneData;
  };

  const valueHasError = () => {
    let isError = false;
    let data = [...values];
    let numberErr = 0;

    data.forEach((item) => {
      if (!item?.label) {
        item.errorName = 'Variable name should not be empty';
        isError = true;
        numberErr++;
      }
    });

    value.setValues(data);
    value.setNumberError(numberErr);

    return isError;
  };

  return {
    values,
    handleAddValues,
    handleRemoveValue,
    handleChangeValue,
    converToValueShow,
    valueHasError,
  };
};

export default useValuesTab;
