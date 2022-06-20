import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';

const Navbars = ['All', 'Drafts', 'Deployed'];

const styles = {
  positionsCenter: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'start',
    flexDirection: 'column',
    backgroundColor: 'white',
    boxShadow: 'none',
    p: 'auto',
    borderBottom: '1px solid #EFEFEF',
  },

  textStyles: {
    textTransform: 'none !important',
    fontStyle: 'normal',
    fontWeight: '500 !important',
    fontSize: '16px !important',
    m: '0 8px !important',
    color: '#ffff !important',
  },
};

const TabsBar = ({ tab, setTab }) => {
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <Box sx={{ borderBottom: '1px solid #8C8C8C', paddingBottom: '1px', width: '85%' }}>
      <Tabs value={tab} onChange={handleChange} textColor="primary" indicatorColor="primary">
        {Navbars.map((navbar) => (
          <Tab sx={{ ...styles.textStyles }} key={navbar} label={navbar} value={navbar} />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabsBar;
