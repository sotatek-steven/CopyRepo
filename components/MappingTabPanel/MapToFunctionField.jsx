import React from 'react';
import { useMemo } from 'react';
import SelectComponent from '../Select';
import useMappingData from './useMappingData';

const MapToFunctionField = ({ id, registerMapToFunction, unregisterMapToFunction, mappingList }) => {
  const [data, updateData] = useMappingData(id);

  const value = data?.variables || [];

  const options = useMemo(() => {
    return mappingList?.map((item) => {
      const { id: _id, label, mappingId, matching } = item;
      return {
        value: _id,
        label,
        locked: !matching || (!!mappingId && mappingId !== id),
      };
    });
  }, [mappingList]);

  const checkRegisterFunction = (variables, selectedVariables) => {
    return variables.some((item) => item === selectedVariables);
  };

  const handleChange = (event, child) => {
    const variables = event.target.value;
    updateData({ variables });

    const selectedVariables = child.props.value;
    if (checkRegisterFunction(variables, selectedVariables)) registerMapToFunction(selectedVariables, id);
    else unregisterMapToFunction(selectedVariables);
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
