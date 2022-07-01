import { Box, Tab, Tabs, useTheme } from '@mui/material';
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
    m: '0 4px !important',
    color: '#ffff !important',
    maxWidth: '24px',
  },
};

const TabsBar = ({ tab, setTab }) => {
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <Box sx={{ paddingBottom: '1px', width: '90%' }}>
      <Tabs
        value={tab}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{
          '.MuiTabs-indicator': {
            height: '5px',
          },
          borderBottom: '1px solid',
          borderColor: theme.shape.borderColor,
          pt: 1,
        }}>
        {Navbars.map((navbar) => (
          <Tab sx={{ ...styles.textStyles }} key={navbar} label={navbar} value={navbar} />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabsBar;
