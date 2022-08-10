import { Checkbox, Grid, styled } from '@mui/material';
import React, { useState } from 'react';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Select from '../Select';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import NameField from './NameField';
import { SCOPE_OPTIONS, VALUE_TYPE_OPTIONS } from '@/config/constant/common';

const RemoveButton = styled(RemoveCircleOutlineIcon)(({ theme }) => ({
  cursor: 'pointer',
  color: theme.palette.primary.main,
}));

const ParameterItem = ({ data, onRemove, onUpdate }) => {
  const { name, scope, type } = data;
  const [isArray, setIsArray] = useState(false);

  const handleNameChange = (value) => {
    const updatedData = { ...data, name: value };
    if (!onUpdate) return;
    onUpdate(updatedData);
  };

  const handleScopeChange = (event) => {
    const value = event.target.value;
    const updatedData = { ...data, scope: value };
    if (!onUpdate) return;
    onUpdate(updatedData);
  };

  const handleTypeChange = (event) => {
    const value = event.target.value;
    const updatedData = { ...data, type: value };
    if (!onUpdate) return;
    onUpdate(updatedData);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Select placeholder="Type" value={type} options={VALUE_TYPE_OPTIONS} onChange={handleTypeChange} />
      </Grid>
      <Grid item xs={2}>
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<RadioButtonCheckedIcon />}
          checked={isArray}
          onClick={() => setIsArray((hasParameters) => !hasParameters)}
        />
        Is Array
      </Grid>
      <Grid item xs={3}>
        <Select placeholder="Scope" value={scope} options={SCOPE_OPTIONS} onChange={handleScopeChange} />
      </Grid>
      <Grid sx={{ display: 'flex', alignContent: 'center' }} item xs={3}>
        <div>
          <NameField value={name} setValue={handleNameChange} />
        </div>
      </Grid>
      <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }} item xs={1}>
        <RemoveButton onClick={() => onRemove(data.id)} />
      </Grid>
    </Grid>
  );
};

export default ParameterItem;
