import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import TemplateItem from '../TemplateItem/TemplateItem';

const ListSmartContract = ({ data }) => {
  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={2}>
        <Box sx={{ background: '#1E1E1F', height: '100%' }}></Box>
      </Grid>
      <Grid item xs={10}>
        <Box sx={{ fontSize: '14px', alignItems: 'center' }}>
          <Grid container spacing={2}>
            {data?.map((item, key) => {
              return (
                <Grid item xs={4} key={key} sx={{ paddingBottom: '16px !important' }}>
                  <TemplateItem key={key} data={item} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
export default ListSmartContract;
