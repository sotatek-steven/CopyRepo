import { useSelector, useDispatch } from 'react-redux';

// Robust way to check if it's Node or browser
export const checkServer = () => typeof window === 'undefined';

export const getState = (listState) => {
  const result = {};
  listState.forEach((item) => {
    result[item] = useSelector((state) => state[item]);
  });
  return result;
};

export const getDispatch = (listReducer) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  const result = {};
  listReducer.forEach((item) => {
    const splitItem = item.split(':');
    const nameDispatch = splitItem[0];
    const splitItem2 = splitItem[1].split('/');
    const storeName = splitItem2[0];
    const storeFunctionName = splitItem2[1];
    result[nameDispatch] = dispatch[storeName][storeFunctionName];
  });
  return result;
};
