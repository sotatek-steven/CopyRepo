import { Box, Button, CardContent, Grid } from '@mui/material';
import React, { useState } from 'react';
import { Card } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TabsBar from 'components/layout/TabsBar';
import { TabContext, TabPanel } from '@mui/lab';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const Dashboard = () => {
  const [value, setValue] = useState('dashboard');

  const TabPanelCustom = styled(TabPanel)(({ theme }) => ({
    ...theme.mixins.toolbar,
    paddingBottom: 0,
  }));

  return (
    <Grid
      container
      spacing={2}
      sx={{ padding: '20px 8px 0 24px', width: 'calc(100% - 85px) !important', overflow: 'hidden' }}>
      <Grid item xs={2}>
        <Card>
          <CardContent sx={{ height: 'calc(100vh - 100px)', padding: '5px 24px' }}>
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
            <Box sx={{ justifyContent: 'center', fontSize: '14px', paddingTop: '70%', textAlign: 'center' }}>
              Create folders & files here, on clicking on the “<AddCircleIcon fontSize="small" /> “ icon and organise
              the smart contracts by Drag & Drop
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={8}>
        {/* <Card></Card> */}
        <TabsBar setTab={setValue} tab={value} />
        <TabContext value={value}>
          <TabPanelCustom value="All">
            {/* <Overview /> */}
            <Box sx={{ fontSize: '14px', alignItems: 'center' }}>
              Build Your first smart contract with Ethereum & Polygon with an exciting way.
            </Box>
          </TabPanelCustom>
        </TabContext>
      </Grid>
      <Grid item xs={2}>
        <Box sx={{ display: 'flex', alignItems: 'center', pt: 2 }}>
          <SearchIcon />
          <Box sx={{ pl: 3 }}>
            <Button variant="contained" startIcon={<AddCircleIcon />}>
              Creat
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
