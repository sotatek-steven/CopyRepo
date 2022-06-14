import { Dialog, DialogTitle, Box, Typography, IconButton, DialogContent, Grid } from '@mui/material';
import React from 'react';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
const TemplateDialogDefi = ({ openListNFT, setOpenListNFT }) => {
  console.log(openListNFT);
  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={openListNFT}
      onClose={() => setOpenListNFT(false)}
      aria-labelledby="responsive-dialog-title">
      <DialogTitle sx={{ textAlign: 'left', mb: 2 }} id="responsive-dialog-title">
        <Box>
          <Typography sx={{ fontSize: '22px' }}>Create Smart Contract</Typography>
          <Typography sx={{ fontSize: '12px', py: 1 }}>
            Please go through the following questionnaire and identify the appropriate match for your requirement.
          </Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={() => setOpenListNFT(false)}
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
          <Grid xs={6}>
            <Box sx={{ width: '589px', height: '548px', background: '#3D3D3E' }}></Box>
          </Grid>
          <Grid
            sx={{
              '&:hover': { opacity: 0.7 },
              paddingLeft: '70px',
            }}
            item
            xs={6}>
            <Typography sx={{ fontSize: '12px', py: 1 }}>
              Choose the business domain that you are creating for this smart contract
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateDialogDefi;
