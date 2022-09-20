/* eslint-disable no-case-declarations */
import { ELEMENT_TYPE, INIT_OBJECT_TYPE, OBJECT_TYPE } from '@/config/constant/common';
import { REGEX } from '@/config/constant/regex';
import useModule from '@/hooks/useModule';
import ObjectID from 'bson-objectid';
import _ from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const regex = new RegExp(REGEX.VARIABLE_NAME);

const useObjectTab = () => {
  const { objects } = useSelector((state) => state.object);
  const moduleState = useSelector((state) => state.userModule);
  const { duplicateNames } = useSelector((state) => state.modules);
  const { object, userModule } = useDispatch();
  const { checkMapToFunction } = useModule();

  useEffect(() => {
    const { data, numErr, funcIds } = checkValidateObject(objects);
    object.setObjects(data);
    object.setNumberError(numErr);
    object.setErrorFunctions(funcIds);
  }, [duplicateNames]);

  const checkValidateObject = (data, funcIds = []) => {
    let numErr = 0;
    let listMapFunction = [];
    // const duplicateNames = data.map(({ name }) => name).filter((v, i, vIds) => !!v && vIds.indexOf(v) !== i);
    data.forEach((item) => {
      listMapFunction = _.concat(listMapFunction, item?.functions);

      if (item?.name) {
        if (duplicateNames?.includes(item.name)) {
          item.errorName = 'Variable name cannot be duplicated';
          numErr++;
          funcIds = _.concat(funcIds, item?.functionId);
        } else {
          if (!regex.test(item?.name?.trim())) {
            item.errorName = 'Invalid variable name';
            numErr++;
            funcIds = _.concat(funcIds, item?.functionId);
          } else {
            item.errorName = null;
          }
        }
      } else if (item?.errorName) {
        numErr++;
      }
    });

    const errorMap = checkMapToFunction('objects', listMapFunction);
    funcIds = _.concat(_.uniq(_.compact(funcIds)), errorMap);

    return { data, numErr, funcIds };
  };

  const handleAddObject = (initObject) => {
    const initData = [];
    initObject?.forEach((item) => {
      if (item?.variableId) {
        const index = objects.findIndex(({ _id }) => _id === item?.variableId);
        objects[index].functions = _.concat(objects[index].functions, item?.functions);
      } else {
        initData.push({
          ...item,
          _id: ObjectID(32).toHexString(),
        });
      }
    });

    let data = _.concat(objects, initData);
    let numberErr = 0;

    const { data: dataValidate, numErr, funcIds } = checkValidateObject(data);
    data = dataValidate;
    numberErr = numErr;

    object.setObjects(data);
    object.setNumberError(numberErr);
    object.setErrorFunctions(funcIds);

    const dataClone = convertToObjectModule(data);
    userModule.updateObjects(dataClone);
  };

  const handleRemoveObject = (objectId) => {
    const iObject = objects.findIndex(({ _id }) => _id === objectId);
    let data = [...objects];
    let numberErr = 0;

    data.splice(iObject, 1);

    const { data: dataValidate, numErr, funcIds } = checkValidateObject(data);
    data = dataValidate;
    numberErr = numErr;

    object.setObjects(data);
    object.setNumberError(numberErr);
    object.setErrorFunctions(funcIds);

    const dataClone = convertToObjectModule(data);
    userModule.updateObjects(dataClone);
  };

  const handleChangeObject = (objectId, field, e, type) => {
    const iObject = objects.findIndex(({ _id }) => _id === objectId);
    let data = [...objects];
    let numberErr = 0;

    switch (type) {
      case ELEMENT_TYPE.INPUT:
        data[iObject][field] = e.target.value;
        if (field === 'name') {
          data[iObject]['errorName'] = null;

          if (!e.target.value.trim()) {
            data[iObject]['errorName'] = 'Variable name should not be empty';
          }
        }
        break;

      case ELEMENT_TYPE.SELECT:
        switch (field) {
          case 'type':
            data[iObject][field] = e?.value;
            // if (e?.value === OBJECT_TYPE.STRUCT) {
            const init = JSON.parse(JSON.stringify(INIT_OBJECT_TYPE));
            data[iObject] = { ...init, _id: Date.now(), type: e?.value };
            // }
            break;
          case 'item':
            data[iObject][field] = e?.value;
            const struct = moduleState?.sources[`${data[iObject]['type']}s`]?.find((item) => item?.name === e?.value);
            const dataContents = JSON.parse(JSON.stringify(struct?.content));
            const contents = dataContents?.map((content, iContent) => {
              return {
                ...content,
                _id: content?._id || iContent,
              };
            });
            const listType = struct?.content?.map((item) => item?.type);
            data[iObject]['assignedValues'] = [{ _id: Date.now(), contents: contents }];
            data[iObject]['listType'] = listType;
            break;
          case 'isArray':
            data[iObject][field] = e?.value;
            if (!e.value) {
              const struct = moduleState?.sources[`${data[iObject]['type']}s`]?.find(
                (item) => item?.name === data[iObject]?.item
              );
              const contents = JSON.parse(JSON.stringify(struct?.content));
              data[iObject]['assignedValues'] = [{ _id: Date.now(), contents: contents }];
            }
            break;
          case 'scope':
            data[iObject][field] = e?.value;
            break;
          case 'functions':
            data[iObject][field] = e?.map((item) => item?.value);
            break;
          default:
            data[iObject][field] = e?.value;
            break;
        }
        break;

      default:
        break;
    }

    const { data: dataValidate, numErr, funcIds } = checkValidateObject(data);
    data = dataValidate;
    numberErr = numErr;

    object.setObjects(data);
    object.setNumberError(numberErr);
    object.setErrorFunctions(funcIds);

    const dataClone = convertToObjectModule(data);
    userModule.updateObjects(dataClone);
  };

  const handleAddAssignedValue = (objectId) => {
    const iObject = objects.findIndex(({ _id }) => _id === objectId);
    const data = [...objects];
    const struct = moduleState?.sources[`${data[iObject]['type']}s`]?.find(
      (item) => item?.name === objects[iObject]?.item
    );
    const dataContents = JSON.parse(JSON.stringify(struct?.content));
    const contents = dataContents?.map((content, iContent) => {
      return {
        ...content,
        _id: content?._id || iContent,
      };
    });
    data[iObject]['assignedValues'].push({ _id: Date.now(), contents: contents });
    object.setObjects(data);
    const dataClone = convertToObjectModule(data);
    userModule.updateObjects(dataClone);
  };

  const handleRemoveAssignedValue = (objectId, assignId) => {
    const iObject = objects.findIndex(({ _id }) => _id === objectId);
    const iAssign = objects[iObject]?.assignedValues.findIndex(({ _id }) => _id === assignId);
    const data = [...objects];
    data[iObject]?.assignedValues?.splice(iAssign, 1);

    object.setObjects(data);
    const dataClone = convertToObjectModule(data);
    userModule.updateObjects(dataClone);
  };

  const handleChangeAssignedValues = (e, objectId, assignId, contentId, type) => {
    const iObject = objects.findIndex(({ _id }) => _id === objectId);
    const iAssign = objects[iObject]?.assignedValues.findIndex(({ _id }) => _id === assignId);
    const iContent = objects[iObject]?.assignedValues[iAssign]?.contents.findIndex(({ _id }) => _id === contentId);
    const data = [...objects];

    switch (type) {
      case ELEMENT_TYPE.INPUT:
        data[iObject].assignedValues[iAssign].contents[iContent].value = e.target.value;
        break;
      case ELEMENT_TYPE.SELECT:
        data[iObject].assignedValues[iAssign].contents[iContent].value = e.value;
        break;

      default:
        break;
    }

    object.setObjects(data);
    const dataClone = convertToObjectModule(data);
    userModule.updateObjects(dataClone);
  };

  const convertToObjectModule = (data) => {
    const cloneData = data?.map((item) => {
      const valueDefault = item?.assignedValues?.map((assigned) => {
        return assigned?.contents?.reduce((obj, v) => {
          obj[v.label] = v.value;
          return obj;
        }, {});
      });

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
        objecType: item?.type,
        type: item?.item,
        label: item?.name,
        scope: item?.scope,
        isArray: item?.isArray,
        functions: functions,
        valueDefault: valueDefault,
      };
    });

    return cloneData;
  };

  const convertToObjectShow = (data) => {
    const cloneData = data?.map((item) => {
      const functions = item?.functions?.map(({ func, variable }) => {
        return `${func}-${variable}`;
      });

      const assignedValues = item?.valueDefault?.map((assigned, iAssigned) => {
        if (!_.isEmpty(assigned)) {
          const arrayKey = Object.keys(assigned);
          const contents = arrayKey?.map((key, iKey) => {
            return {
              _id: iKey,
              label: key,
              value: assigned[key],
            };
          });
          return {
            _id: iAssigned,
            contents: contents,
          };
        }
      });
      return {
        _id: ObjectID(32).toHexString(),
        type: item?.objecType || OBJECT_TYPE.STRUCT,
        item: item?.type,
        isArray: item?.isArray,
        scope: item?.scope,
        name: item?.label,
        functions: functions,
        assignedValues: _.compact(assignedValues),
        errorName: null,
      };
    });
    object.setObjects(cloneData);
    return cloneData;
  };

  const objectHasError = () => {
    let isError = false;
    let data = [...objects];
    let numberErr = 0;

    data.forEach((item) => {
      if (!item?.name) {
        item.errorName = 'Variable name should not be empty';
        isError = true;
        numberErr++;
      } else if (!regex.test(item?.name?.trim())) {
        item.errorName = 'Invalid variable name';
        isError = true;
        numberErr++;
      }
    });

    object.setObjects(data);
    object.setNumberError(numberErr);

    return isError;
  };

  return {
    objects,
    handleAddObject,
    handleChangeObject,
    handleRemoveObject,
    handleAddAssignedValue,
    handleRemoveAssignedValue,
    handleChangeAssignedValues,
    objectHasError,
    convertToObjectShow,
  };
};

export default useObjectTab;
