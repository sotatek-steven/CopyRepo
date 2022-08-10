import { Grid, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Avatar from '@mui/material/Avatar';

const BusinessDomain = ({ data, setOpenCreate, setOpen, setType }) => {
  const theme = useTheme();

  const handleClick = () => {
    setType(data.name);
    setOpen(true);
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
          transition: 'all 0.3s',
          '&:hover': { background: theme.palette.background.light },
        }}
        onClick={handleClick}>
        <Grid container columnSpacing={4}>
          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Avatar sx={{ bgcolor: '#685252', width: '72px', height: '72px', borderRadius: '8px' }} variant="square">
              {data.icon}
            </Avatar>
          </Grid>
          <Grid item xs={10}>
            <Typography sx={{ color: theme.palette.primary.light }}>{data.name}</Typography>
            <Typography sx={{ fontSize: '12px', py: 1 }}>{data.decription}</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default BusinessDomain;
