import { Grid, styled } from '@mui/material';
import React from 'react';
import KeyValueField from './KeyValueField';
import MapToFunctionField from './MapToFunctionField';
import ScopeField from './ScopeField';
import VariableNameField from './VariableNameField';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const RemoveButton = styled(RemoveCircleIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 22,
  marginBottom: 12,
  cursor: 'pointer',
}));

const MappingItem = (props) => {
  const { removeItem, id } = props;

  const handleClick = () => {
    if (!removeItem) return;
    removeItem(id);
  };

  return (
    <div style={{ marginBottom: 60 }}>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <ScopeField {...props} />
        </Grid>
        <Grid item xs={3}>
          <VariableNameField {...props} />
        </Grid>
        <Grid item xs={3}>
          <MapToFunctionField {...props} />
        </Grid>
        <Grid item xs={3} style={{ display: 'flex', alignItems: 'end' }}>
          <RemoveButton onClick={handleClick} />
        </Grid>
      </Grid>
      <KeyValueField {...props} />
    </div>
  );
};

export default MappingItem;
