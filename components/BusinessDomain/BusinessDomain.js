import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';

const BusinessDomain = ({ data }) => {
  useEffect(() => {
    console.log(data);
  });
  return (
    <Box sx={{ background: '#3D3D3E', padding: '24px 24px 24px 32px', my: 3, maxWidth: '450px' }}>
      <Grid container columnSpacing={4}>
        <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Avatar sx={{ bgcolor: '#685252', width: '72px', height: '72px', borderRadius: '8px' }} variant="square">
            N
          </Avatar>
        </Grid>
        <Grid item xs={10}>
          <Typography sx={{ color: '#E5C2B9' }}>{data.name}</Typography>
          <Typography sx={{ fontSize: '12px', py: 1 }}>{data.description}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BusinessDomain;
