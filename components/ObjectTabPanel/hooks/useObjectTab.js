/* eslint-disable no-case-declarations */
import { ELEMENT_TYPE, OBJECT_TYPE } from '@/config/constant/common';
import { REGEX } from '@/config/constant/regex';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const OBJECT = {
  type: '',
  item: '',
  isArray: false,
  scope: 'public',
  name: '',
  functions: [],
  assignedValues: [],
};

const regex = new RegExp(REGEX.VARIABLE_NAME);

const useObjectTab = () => {
  const { objects } = useSelector((state) => state.object);
  const moduleState = useSelector((state) => state.userModule);
  const { object, userModule } = useDispatch();

  const handleAddObject = () => {
    const init = JSON.parse(JSON.stringify(OBJECT));
    const data = [...objects];
    data.push({ ...init, _id: Date.now() });
    object.setObjects(data);
    const dataClone = convertToObjectModule(data);
    userModule.updateObjects(dataClone);
  };

  const handleRemoveObject = (objectId) => {
    const iObject = objects.findIndex(({ _id }) => _id === objectId);
    const data = [...objects];
    data.splice(iObject, 1);
    const dataClone = convertToObjectModule(data);
    userModule.updateObjects(dataClone);
    object.setObjects(data);
  };

  const handleChangeObject = (objectId, field, e, type) => {
    const iObject = objects.findIndex(({ _id }) => _id === objectId);
    const data = [...objects];

    switch (type) {
      case ELEMENT_TYPE.INPUT:
        data[iObject][field] = e.target.value;
        if (field === 'name') {
          data[iObject]['errorName'] = null;

          if (!e.target.value.trim()) {
            data[iObject]['errorName'] = 'This field is required';
          } else if (!regex.test(e.target.value.trim())) {
            data[iObject]['errorName'] = 'Invalid variable name';
          }
        }
        break;

      case ELEMENT_TYPE.SELECT:
        switch (field) {
          case 'type':
            data[iObject][field] = e?.value;
            if (e?.value === OBJECT_TYPE.STRUCT) {
              const init = JSON.parse(JSON.stringify(OBJECT));
              data[iObject] = { ...init, _id: Date.now(), type: e?.value };
            }
            break;
          case 'item':
            data[iObject][field] = e?.value;
            const struct = moduleState?.sources?.structs?.find((item) => item?.name === e?.value);
            const contents = JSON.parse(JSON.stringify(struct?.content));
            data[iObject]['assignedValues'] = [{ _id: Date.now(), contents: contents }];
            break;
          case 'isArray':
            data[iObject][field] = e?.value;
            if (!e.value) {
              const struct = moduleState?.sources?.structs?.find((item) => item?.name === data[iObject]?.item);
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

    object.setObjects(data);
    const dataClone = convertToObjectModule(data);
    userModule.updateObjects(dataClone);
  };

  const handleAddAssignedValue = (objectId) => {
    const iObject = objects.findIndex(({ _id }) => _id === objectId);
    const struct = moduleState?.sources?.structs?.find((item) => item?.name === objects[iObject]?.item);
    const contents = JSON.parse(JSON.stringify(struct?.content));
    const data = [...objects];
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

  const handleChangeAssignedValues = (e, objectId, assignId, contentId) => {
    const iObject = objects.findIndex(({ _id }) => _id === objectId);
    const iAssign = objects[iObject]?.assignedValues.findIndex(({ _id }) => _id === assignId);
    const iContent = objects[iObject]?.assignedValues[iAssign]?.contents.findIndex(({ _id }) => _id === contentId);
    const data = [...objects];
    data[iObject].assignedValues[iAssign].contents[iContent].value = e.target.value;

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
        objectType: item?.type,
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
    const cloneData = data?.map((item, iData) => {
      const functions = item?.functions?.map(({ func, variable }) => {
        return `${func?._id}-${variable}`;
      });

      const assignedValues = item?.valueDefault?.map((assigned, iAssigned) => {
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
      });
      return {
        _id: iData,
        type: item?.objectType || OBJECT_TYPE.STRUCT,
        item: item?.type,
        isArray: item?.isArray,
        scope: item?.scope,
        name: item?.label,
        functions: functions,
        assignedValues: assignedValues,
        errorName: null,
      };
    });
    object.setObjects(cloneData);
    return cloneData;
  };

  const objectHasError = () => {
    let isError = false;
    const data = [...objects];
    data.forEach((item) => {
      if (!item?.name) {
        item.errorName = 'Variable name should not be empty';
        isError = true;
      } else if (!regex.test(item?.name?.trim())) {
        item.errorName = 'Invalid variable name';
        isError = true;
      }
    });

    object.setObjects(data);
    if (isError) {
      toast.warning('Has errors');
    }

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
