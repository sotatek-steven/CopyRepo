import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import moment from 'moment';
import React from 'react';
import ButtonStatus from './ButtonStatus';
import DeleteIconWithX from '../../assets/icon/deletewithx.svg';

const BoxBottom = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: '#3D3D3E',
  padding: '8px',
  borderRadius: '8px',
  maxWidth: '408px',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
}));
const TemplateItem = ({ data }) => {
  return (
    <Card sx={{ maxWidth: 440, px: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Typography sx={{ fontSize: '12px' }}>{data.domain}</Typography>
        <ButtonStatus status={data.status} />
      </Box>
      <CardContent sx={{ padding: '0 16px' }}>
        <Grid container alignItems="flex-end" justifyContent="space-around">
          <Grid item xs={10}>
            <Typography sx={{ color: '#E5C2B9' }}>{data.name}</Typography>
            <Typography sx={{ fontSize: '10px', paddingRight: '32px' }} color="text.secondary">
              {data.description}
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{ textAlign: 'right' }}>
            {data.status !== 'deployed' ? <DeleteIconWithX /> : null}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
        <BoxBottom>
          <Typography sx={{ fontSize: '10px', color: '#ffffff', px: 1 }}>Last Modified At</Typography>{' '}
          <Typography>{moment(data.updatedAt).format('LLL')}</Typography>
        </BoxBottom>
      </CardActions>
    </Card>
  );
};
export default TemplateItem;
