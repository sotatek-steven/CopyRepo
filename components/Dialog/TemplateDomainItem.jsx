import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  styled,
  Typography,
} from '@mui/material';
import React from 'react';
import CheckboxChoose from '../Shared/CheckboxChoose';
import CheckBoxCustom from '../Shared/CheckBoxCustom/CheckBoxCustom';

const CheckBoxStyled = styled(Card)((theme) => ({
  maxWidth: 500,
  px: 1.5,
  borderRadius: '4px',
  borderRight: '2px solid #F07D60',
  marginTop: '24px',
}));

const TemplateDomainItem = ({ item, id }) => {
  const handleChecked = (e) => {
    console.log(e.target.checked);
  };
  return (
    <CheckBoxStyled>
      <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
        {/* <CheckBoxCustom id={id} /> */}

        {/* <CheckboxChoose /> */}

        <CheckBoxStyled>
          <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
            <CheckBoxCustom id={id} />
            <CheckboxChoose />

            <Typography sx={{ color: '#E5C2B9' }}>{option.name}</Typography>
          </Box>
          <CardContent sx={{ padding: '0 16px' }}>
            <Typography sx={{ fontSize: '10px', paddingRight: '32px' }} color="text.secondary">
              {option.description}
            </Typography>
          </CardContent>
        </CheckBoxStyled>

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
