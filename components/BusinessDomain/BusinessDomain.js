import { Dialog, DialogContent, DialogTitle, Grid, IconButton, styled, Typography, useTheme } from '@mui/material';
import { Box, padding } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import TemplateDialogDefi from '../Dialog/TemplateDialogDefi';
import TemplateDialogNFT from '../Dialog/TemplateDialogNFT';

const Description = styled('div')(({ theme }) => ({
  fontSize: '14px',
  padding: 1,
  fontFamily: 'Segoe UI',
  ...theme.components.truncate.twoLineEllipsis,
}));

const BusinessDomain = ({ data, setOpenListDefi, setOpenListNFT, setOpenCreate }) => {
  const theme = useTheme();
  const handleClick = () => {
    if (data.name === 'Defi') {
      setOpenListDefi(true);
    } else {
      setOpenListNFT(true);
    }
    setOpenCreate(false);
  };
  return (
    <>
      <Box
        sx={{
          background: theme.palette.background.default,
          padding: '24px 24px 24px 32px',
          my: 3,
          maxWidth: '450px',
          cursor: 'pointer',
          '&:hover': { opacity: 0.7 },
        }}
        onClick={handleClick}>
        <Grid container columnSpacing={4}>
          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Avatar sx={{ bgcolor: '#685252', width: '72px', height: '72px', borderRadius: '8px' }} variant="square">
              N
            </Avatar>
          </Grid>
          <Grid item xs={10}>
            <Typography sx={{ color: theme.palette.primary.light }}>{data.name}</Typography>
            <Description>{data.description}</Description>
          </Grid>
        </Grid>
      </Box>
      {/* <TemplateDialogDefi openListDefi={openListDefi} setOpenListDefi={setOpenListDefi} />
      <TemplateDialogNFT openListNFT={openListNFT} setOpenListNFT={setOpenListNFT} /> */}
    </>
  );
};

export default BusinessDomain;
