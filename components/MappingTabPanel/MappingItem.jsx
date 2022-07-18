import { Grid } from '@mui/material';
import React from 'react';
import KeyValueField from './KeyValueField';
import MapToFunctionField from './MapToFunctionField';
import ScopeField from './ScopeField';
import VariableNameField from './VariableNameField';

const MappingItem = (props) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <ScopeField {...props} />
        </Grid>
        <Grid item xs={3}>
          <VariableNameField {...props} />
        </Grid>
        <Grid item xs={3}>
          <MapToFunctionField {...props} />
        </Grid>
      </Grid>

      <KeyValueField {...props} />
    </div>
  );
};

export default MappingItem;
