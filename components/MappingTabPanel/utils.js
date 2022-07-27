export const compareMappingVariable = (value1, value2) => {
  return value1.func === value2.func && value2.variable === value2.variable;
};

export const convertMappingObjToArr = (keyValueObj) => {
  let keyValueArr = [];
  const loop = true;
  while (loop) {
    const _data = keyValueObj.map;
    const {
      key,
      values: { type },
    } = _data;

    keyValueArr.push({ key, value: type });
    keyValueObj = { ..._data.values };
    if (!keyValueObj.map) break;
  }

  return keyValueArr;
};
