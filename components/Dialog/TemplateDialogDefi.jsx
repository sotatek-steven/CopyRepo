import { Dialog, DialogTitle, Box, Typography, IconButton, DialogContent, Grid } from '@mui/material';
import React from 'react';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import TemplateDomainItem from './TemplateDomainItem';

const data = [
  {
    _id: '62a3237d0e4b41019e4d6dbb',
    owner: 'system',
    color: 'red',
    name: 'Tempate Defi',
    domain: 'defi',
    description: 'This is tempate defi smart contract',
    tags: ['defi', 'smart-contract'],
    modules: ['62a322bd0e4b41019e4d5742'],
    coordinates: [
      {
        module: '62a322bd0e4b41019e4d5742',
        position: {
          top: 10,
          left: 100,
        },
      },
    ],
  },
];
const TemplateDialogDefi = ({ openListDefi, setOpenListDefi }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={openListDefi}
      onClose={() => setOpenListDefi(false)}
      aria-labelledby="responsive-dialog-title">
      <DialogTitle sx={{ textAlign: 'left', mb: 2 }} id="responsive-dialog-title">
        <Box>
          <Typography sx={{ fontSize: '22px' }}>Suggested Smart Contracts for you</Typography>
          <Typography sx={{ fontSize: '12px', py: 1 }}>
            Please go through the following questionnaire and identify the appropriate match for your requirement.
          </Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={() => setOpenListDefi(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.primary.contrastText,
          }}>
          <CancelOutlinedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container sx={{ borderTop: '1px solid #8C8C8C' }}>
          <Grid
            sx={{
              '&:hover': { opacity: 0.7 },
              paddingTop: '24px',
            }}
            item
            xs={6}>
            {data.map((item) => {
              return <TemplateDomainItem key={item._id} item={item} />;
            })}
          </Grid>
          <Grid xs={6}>
            <Box sx={{ width: '589px', height: '548px', background: '#3D3D3E' }}></Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateDialogDefi;
