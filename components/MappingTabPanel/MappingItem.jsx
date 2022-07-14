import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Select from '../Select';
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
  const [scope, setScope] = useState(SCOPE[0].value);
  const [variableName, setVariableName] = useState('');
  const [error, setError] = useState(true);

  const handleScopeChange = (event) => {
    setScope(event.target.value);
  };

  const updateVariableName = (value) => {
    setVariableName(value);
  };

  useEffect(() => {
    console.log('mapping has error? ', error);
  }, [error]);

  return (
    <Grid container spacing={2} style={{ marginBottom: 30 }}>
      <Grid item xs={4}>
        <Select label={'SCOPE'} value={scope} options={SCOPE} onChange={handleScopeChange} />
      </Grid>
      <Grid item xs={4}>
        <VariableNameField value={variableName} updateValue={updateVariableName} updateError={setError} />
      </Grid>
    </Grid>
  );
};

export default MappingItem;
