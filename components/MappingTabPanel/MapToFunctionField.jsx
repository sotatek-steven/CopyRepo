import React from 'react';
import { useMemo } from 'react';
import SelectComponent from '../Select';
import useMappingData from './useMappingData';
import useMapToFunction from './useMapToFunction';

const MapToFunctionField = ({ id }) => {
  const [data, updateData] = useMappingData(id);
  const { functions, registerMapToFunction, unregisterMapToFunction } = useMapToFunction();

  const value = data?.func || [];

  const options = useMemo(() => {
    return functions?.map((item) => {
      const { id: _id, name, mappingId } = item;
      return {
        value: _id,
        label: name,
        locked: mappingId && mappingId !== id,
      };
    });
  }, [functions]);

  const checkRegisterFunction = (functions, selectedFunction) => {
    return functions.some((item) => item.name === selectedFunction);
  };

  const handleChange = (event, child) => {
    const functions = event.target.value;

    updateData({ func: value });
    if (!registerMapToFunction) return;
    const selectedFunction = child.props.value;
    if (checkRegisterFunction(functions, selectedFunction)) registerMapToFunction(selectedFunction, id);
    else unregisterMapToFunction(selectedFunction);
  };

  return (
    <SelectComponent
      multiple={true}
      label="MAP_TO_FUNCTION"
      options={options || []}
      value={value}
      onChange={handleChange}
    />
  );
};

export default MapToFunctionField;
