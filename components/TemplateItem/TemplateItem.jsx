import { ButtonBase, Card, CardActions, CardContent, CardHeader, Grid, Typography, useTheme } from '@mui/material';

import { Box, styled } from '@mui/system';
import moment from 'moment';
import React, { useState } from 'react';
import ButtonStatus from './ButtonStatus';
import DeleteIconWithX from '../../assets/icon/deletewithx.svg';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import ConfirmDeleteDialog from '../atom/Dialog/ConfirmDeleteDialog';

const BoxBottom = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  padding: '8px',
  borderRadius: '8px',
  maxWidth: '408px',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  height: '35px',
}));
const TemplateItem = ({ data }) => {
  const [confirmDelOpen, setConfirmDelOpen] = useState(false);
  const handleAgreeDel = async () => {
    const { code } = await userContract.deleteSmartContract({ _id: data._id });
    setConfirmDelOpen(false);
    console.log(code);
    if (code == 200) {
      router.push('/');
    }
  };

  const handleCancel = () => {
    setConfirmDelOpen(false);
  };
  const router = useRouter();
  const { userContract } = useDispatch();
  const handleDelete = async (_id) => {
    const { code } = userContract.deleteSmartContract({ _id });
    if (code == 200) {
      router.push('/');
    }
  };
  const theme = useTheme();
  return (
    <Card
      sx={{ maxWidth: 440, px: 1.5, maxHeight: '200px', height: '100%', background: theme.palette.background.dark }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Typography sx={{ fontSize: '16px' }}>{data.domain}</Typography>
        <ButtonStatus status={data.status} />
      </Box>
      <CardContent sx={{ padding: '0 16px', cursor: 'pointer' }}>
        <Typography
          sx={{ color: 'primary.light', fontSize: '20px', marginBottom: '5px' }}
          onClick={() => {
            router.push(`/smartcontract/${data._id}`);
          }}>
          {data.name}
        </Typography>
        <Grid container alignItems="flex-end" justifyContent="space-around">
          <Grid item xs={11}>
            <Typography
              sx={{
                fontSize: '14px',
                paddingRight: '32px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                lineClamp: 2,
                WebkitBoxOrient: 'vertical',
                minHeight: '45px',
              }}
              color="text.secondary"
              onClick={() => {
                router.push(`/smartcontract/${data._id}`);
              }}>
              {data.description}
            </Typography>
          </Grid>
          <Grid item xs={1} sx={{ textAlign: 'right' }}>
            {data.status !== 'deployed' ? (
              <DeleteIconWithX
                onClick={() => {
                  setConfirmDelOpen(true);
                }}
              />
            ) : null}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
        <BoxBottom>
          <Typography sx={{ fontSize: '14px', color: '#ffffff', px: 1 }}>Last Modified At</Typography>{' '}
          <Typography>{moment(data.updatedAt).format('LLL')}</Typography>
        </BoxBottom>
      </CardActions>
      <ConfirmDeleteDialog
        open={confirmDelOpen}
        onClose={handleCancel}
        onAgree={handleAgreeDel}
        desciption="Do you really want to delete these records? This process cannot be undone."
      />
    </Card>
  );
};
export default TemplateItem;
