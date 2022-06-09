import { Box, CardContent, Grid } from '@mui/material';
import React from 'react';
import { Card } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const dashboard = () => {
  return (
    <Grid container spacing={2} sx={{ padding: '20px 8px 0 24px' }}>
      <Grid item xs={2}>
        <Card>
          <CardContent sx={{ height: '100vh' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid #8C8C8C',
                py: 1,
                alignItems: 'center',
              }}>
              <h3>Forder</h3>
              <AddCircleIcon />
            </Box>
            <Box sx={{ justifyContent: 'center', fontSize: '14px', paddingTop: '50%' }}>
              Create folders & files here, on clicking on the “<AddCircleIcon fontSize="small" /> “ icon and organise
              the smart contracts by Drag & Drop
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={10}>
        <Card></Card>
      </Grid>
    </Grid>
  );
};

export default dashboard;
