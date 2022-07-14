import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from '../Select';
import MapToFunctionField from './MapToFunctionField';
import VariableNameField from './VariableNameField';

const SCOPE = [
  {
    value: 'public',
    label: 'Public',
  },
  {
    value: 'private',
    label: 'Private',
  },
];

const MappingItem = () => {
  const moduleState = useSelector((state) => state.userModule);
  const { userModule } = useDispatch();

  const [scope, setScope] = useState(SCOPE[0].value);
  const [variableName, setVariableName] = useState(''); //only save the valid variable name
  const [error, setError] = useState(true);
  const [mapToFunction, setMapToFunction] = useState([]);

  const FUNCTIONS = useMemo(() => {
    return moduleState?.sources?.functions?.map((item) => {
      const { _id, name } = item;
      return {
        value: _id,
        label: name,
      };
    });
  }, [moduleState?.sources?.functions]);

  useEffect(() => {
    const updateMappingData = (scope, variableName, mapToFunction) => {
      const {
        variables: { mappings },
      } = moduleState;
      if (!mappings) return;

      const updatedMappings = mappings.map((mappingData) => {
        if (mappingData.label === variableName)
          return {
            label: variableName,
            scope,
            functions: mapToFunction,
            type: {
              key: 'address',
              values: {
                type: 'address',
                map: {},
              },
            },
          };
        return mappingData;
      });
      userModule.updateMappings(updatedMappings);
    };

    updateMappingData(scope, variableName, mapToFunction);
  }, [scope, variableName, mapToFunction]);

  useEffect(() => {
    console.log('mapping has error? ', error);
  }, [error]);

  return (
    <Grid container spacing={2} style={{ marginBottom: 30 }}>
      <Grid item xs={4}>
        <Select label={'SCOPE'} value={scope} options={SCOPE} onChange={(event) => setScope(event.target.value)} />
      </Grid>
      <Grid item xs={4}>
        <VariableNameField updateValue={setVariableName} updateError={setError} />
      </Grid>
      <Grid item xs={4}>
        <MapToFunctionField options={FUNCTIONS} updateValue={setMapToFunction} />
      </Grid>
    </Grid>
  );
};

export default MappingItem;
