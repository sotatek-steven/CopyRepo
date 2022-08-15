import { Grid, styled } from '@mui/material';
import React from 'react';
import SelectComponent from '../Select';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const RemoveButton = styled(RemoveCircleOutlineIcon)(({ theme }) => ({
  cursor: 'pointer',
  color: theme.palette.primary.main,
}));

const ReturnItem = ({ data, onRemove }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={11}>
        <SelectComponent />
      </Grid>
      <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }} item xs={1}>
        <RemoveButton onClick={() => onRemove(data.id)} />
      </Grid>
    </Grid>
  );
};

export default ReturnItem;
