import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { Input } from '../Input';
import Select from '../Select';

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

const TOOLTIP_NAME = 'Beginning character: Must be letter\nFollowing characters only contain: Letters, digits, (_)';

const MappingItem = () => {
  const [scope, setScope] = useState(SCOPE[0].value);
  const [variableName, setVariableName] = useState('');
  const handleScopeChange = (event) => {
    setScope(event.target.value);
  };

  const handleVariableNameChange = (event) => {
    setVariableName(event.target.value);
  };

  return (
    <Grid container spacing={2} style={{ marginBottom: 30 }}>
      <Grid item xs={4}>
        <Select label={'SCOPE'} value={scope} options={SCOPE} onChange={handleScopeChange} />
      </Grid>
      <Grid item xs={4}>
        <Input
          isRequired={true}
          label={'VARIABLE NAME'}
          value={variableName}
          tooltip={TOOLTIP_NAME}
          onChange={handleVariableNameChange}
        />
      </Grid>
    </Grid>
  );
};

export default MappingItem;
