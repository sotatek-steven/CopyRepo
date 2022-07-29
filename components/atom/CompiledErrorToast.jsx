import { Box, List, ListItem, ListItemButton, ListItemText, Typography, useTheme } from '@mui/material';
import WarningIcon from 'assets/icon/warning.svg';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';

const CompiledErrorToast = ({ errors }) => {
  const theme = useTheme();
  return (
    <Box sx={{ fontSize: '14px' }}>
      <Box
        sx={{
          height: '39px',
          backgroundColor: theme.palette.primary.light,
          padding: '0',
        }}>
        <Box sx={{ paddingLeft: '30px', display: 'flex', py: 1.5 }}>
          <WarningIcon />
          <Typography sx={{ fontWeight: '600', color: theme.palette.primary.red1, padding: '0 20px' }}>
            Errors
          </Typography>
        </Box>
      </Box>
      <Box sx={{ backgroundColor: theme.palette.background.dark }}>
        <List>
          <Scrollbars
            style={{
              height: '151px',
              overflowX: 'hidden',
            }}>
            {errors.map((item, index) => (
              <ListItem disablePadding key={index}>
                <ListItemButton>
                  <ListItemText
                    primary={item.message}
                    sx={{ borderBottom: `1px solid ${theme.shape.borderCo}`, color: theme.palette.text.primary }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </Scrollbars>
        </List>
      </Box>
    </Box>
  );
};

export default CompiledErrorToast;
