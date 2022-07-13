import { Grid } from '@mui/material';
import React, { useState } from 'react';
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

const MappingItem = () => {
  const [value, setValue] = useState(SCOPE[0].value);
  const handleChangeObject = (event) => {
    setValue(event.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Select label={'SCOPE'} value={value} options={SCOPE} onChange={handleChangeObject} />
      </Grid>
    </Grid>
  );
};

export default MappingItem;
