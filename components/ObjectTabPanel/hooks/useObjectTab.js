import { ELEMENT_TYPE } from '@/config/constant/common';
import { REGEX } from '@/config/constant/regex';
import { useDispatch, useSelector } from 'react-redux';

const OBJECT = {
  type: '',
  item: '',
  isArray: false,
  scope: 'public',
  name: '',
  functions: [],
  assignedValues: [],
};

const useObjectTab = () => {
  const { objects } = useSelector((state) => state.object);
  const moduleState = useSelector((state) => state.userModule);
  const { object } = useDispatch();

  const handleAddObject = () => {
    const init = JSON.parse(JSON.stringify(OBJECT));
    const data = [...objects];
    data.push({ ...init, _id: `${Math.floor(Date.now())}` });
    object.setObjects(data);
  };

  const handleRemoveObject = (objectId) => {
    const iObject = objects.findIndex(({ _id }) => _id === objectId);
    const data = [...objects];
    data.splice(iObject, 1);

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
          const regex = new RegExp(REGEX.VARIABLE_NAME);
          if (!e.target.value.trim()) {
            data[iObject]['errorName'] = 'Variable name should not be empty';
          } else if (regex.test(e.target.value.trim())) {
            data[iObject]['errorName'] = 'Invalid variable name';
          }
        }
        break;

      case ELEMENT_TYPE.SELECT:
        if (field === 'type' && e.target.value === 'structs') {
          const init = JSON.parse(JSON.stringify(OBJECT));
          data[iObject] = { ...init, _id: `${Math.floor(Date.now())}`, type: e.target.value };
        } else {
          data[iObject][field] = e.target.value;
        }
        if (field === 'item') {
          const struct = moduleState?.sources?.structs?.find((item) => item?._id === e.target.value);
          const contents = JSON.parse(JSON.stringify(struct?.content));
          data[iObject]['assignedValues'].push({ _id: `${Math.floor(Date.now())}`, contents: contents });
        }
        if (field === 'isArray' && !e.target.value) {
          const struct = moduleState?.sources?.structs?.find((item) => item?._id === data[iObject]?.item);
          const contents = JSON.parse(JSON.stringify(struct?.content));
          data[iObject]['assignedValues'] = [{ _id: `${Math.floor(Date.now())}`, contents: contents }];
        }
        break;

      default:
        break;
    }

    object.setObjects(data);
  };

  const handleAddAssignedValue = (objectId) => {
    const iObject = objects.findIndex(({ _id }) => _id === objectId);
    const struct = moduleState?.sources?.structs?.find((item) => item?._id === objects[iObject]?.item);
    const contents = JSON.parse(JSON.stringify(struct?.content));
    const data = [...objects];
    data[iObject]['assignedValues'].push({ _id: `${Math.floor(Date.now())}`, contents: contents });
    object.setObjects(data);
  };

  const handleRemoveAssignedValue = (objectId, assignId) => {
    const iObject = objects.findIndex(({ _id }) => _id === objectId);
    const iAssign = objects[iObject]?.assignedValues.findIndex(({ _id }) => _id === assignId);
    const data = [...objects];
    data[iObject]?.assignedValues?.splice(iAssign, 1);

    object.setObjects(data);
  };

  const handleChangeAssignedValues = (e, objectId, assignId, contentId) => {
    const iObject = objects.findIndex(({ _id }) => _id === objectId);
    const iAssign = objects[iObject]?.assignedValues.findIndex(({ _id }) => _id === assignId);
    const iContent = objects[iObject]?.assignedValues[iAssign]?.contents.findIndex(({ _id }) => _id === contentId);
    const data = [...objects];
    data[iObject].assignedValues[iAssign].contents[iContent].value = e.target.value;

    object.setObjects(data);
  };

  return {
    objects,
    handleAddObject,
    handleChangeObject,
    handleRemoveObject,
    handleAddAssignedValue,
    handleRemoveAssignedValue,
    handleChangeAssignedValues,
  };
};

export default useObjectTab;
