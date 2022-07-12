import { ELEMENT_TYPE, NEW_ID } from '@/config/constant/common';
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
  const { objects, count } = useSelector((state) => state.object);
  const { object } = useDispatch();

  const handleAddObject = () => {
    const init = JSON.parse(JSON.stringify(OBJECT));
    const data = [...objects];
    data.push({ ...init, _id: `${NEW_ID}_${count}` });
    object.setObjects(data);
    object.setCount(count + 1);
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
          data[iObject]['errorName'] = e.target.value.trim() ? null : 'Variable name should not be empty';
        }
        break;

      case ELEMENT_TYPE.SELECT:
        if (field === 'type' && e.target.value === 'structs') {
          const init = JSON.parse(JSON.stringify(OBJECT));
          data[iObject] = { ...init, _id: `${NEW_ID}_${count}`, type: e.target.value };
        } else {
          data[iObject][field] = e.target.value;
        }
        break;

      default:
        break;
    }

    object.setObjects(data);
  };

  return {
    objects,
    handleAddObject,
    handleChangeObject,
    handleRemoveObject,
  };
};

export default useObjectTab;
