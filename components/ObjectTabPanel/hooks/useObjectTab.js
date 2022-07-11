import { NEW_ID } from '@/config/constant/common';
import { useDispatch, useSelector } from 'react-redux';

const OBJECT = {
  type: '',
  item: '',
  isArray: false,
  scope: 'public',
  name: '',
  functions: [],
  objects: [],
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

  return {
    objects,
    handleAddObject,
  };
};

export default useObjectTab;
