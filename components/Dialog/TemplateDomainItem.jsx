import { Box, Card, CardContent, Grid, styled, Typography } from '@mui/material';
import React from 'react';
import CheckBoxCustom from '../Shared/CheckBoxCustom/CheckBoxCustom';

const CheckBoxStyled = styled(Card)((theme) => ({
  maxWidth: 440,
  px: 1.5,
  borderRadius: '4px',
  borderRight: '2px solid #F07D60',
}));

const TemplateDomainItem = ({ item }) => {
  return (
    <CheckBoxStyled>
      <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
        <CheckBoxCustom />
        <Typography sx={{ color: '#E5C2B9' }}>{item.name}</Typography>
      </Box>
      <CardContent sx={{ padding: '0 16px' }}>
        <Typography sx={{ fontSize: '10px', paddingRight: '32px' }} color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
    </CheckBoxStyled>
  );
};

export default TemplateDomainItem;
