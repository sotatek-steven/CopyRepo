import { ButtonBase, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';

import { Box, styled } from '@mui/system';
import moment from 'moment';
import React from 'react';
import ButtonStatus from './ButtonStatus';
import DeleteIconWithX from '../../assets/icon/deletewithx.svg';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const BoxBottom = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: '#3D3D3E',
  padding: '8px',
  borderRadius: '8px',
  maxWidth: '408px',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  height: '35px',
}));
const TemplateItem = ({ data }) => {
  const router = useRouter();
  const { userContract } = useDispatch();
  const handleDelete = async (_id) => {
    const { code } = userContract.deleteSmartContract({ _id });
    if (code == 200) {
      router.push('/');
    }
  }
  return (
    <Card sx={{ maxWidth: 440, px: 1.5, maxHeight: '200px', height: '100%' }}>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Typography sx={{ fontSize: '12px' }}>{data.domain}</Typography>
        <ButtonStatus status={data.status} />
      </Box>
      <CardContent sx={{ padding: '0 16px', cursor: 'pointer' }}>
        <Typography
          sx={{ color: '#E5C2B9', fontSize: '20px', }}
          onClick={() => {
            router.push(`/smartcontract/${data._id}`);
          }}>
          {data.name}
        </Typography>
        <Grid container alignItems="flex-end" justifyContent="space-around">
          <Grid item xs={10}>
            <Typography
              sx={{
                fontSize: '10px',
                paddingRight: '32px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                lineClamp: 3,
                WebkitBoxOrient: 'vertical',
                minHeight: '45px',
              }}
              color="text.secondary">
              {data.description}
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{ textAlign: 'right' }}>
            {data.status !== 'deployed' ? <DeleteIconWithX onClick={() => { handleDelete(data._id) }} /> : null}
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
