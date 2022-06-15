import { Box, Card, CardContent, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useRadioGroup } from '@mui/material/RadioGroup';
import React, { useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import styled from '@emotion/styled';
import _ from 'lodash';

const CheckBoxStyled = styled(Card)((theme) => ({
  minWidth: 500,
  px: 1.5,
  borderRadius: '4px',
  borderRight: '2px solid #F07D60',
  marginTop: '24px',
}));

const RadioCustom = styled(Radio)((theme) => ({
  color: '#64F5A6',
  '&.Mui-checked': {
    color: '#95D5B2 ',
  },
}));

const CheckboxChoose = ({ options, name, handleChange }) => {
  console.log(options);
  return _.isArray(options) && options.length > 0 ? (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        defaultValue={options[0]._id}>
        {options.map((option) => (
          <>
            <CheckBoxStyled>
              <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
                <FormControlLabel
                  sx={{ margin: '0 0 0 8px' }}
                  key={option._id}
                  value={option._id}
                  onChange={handleChange}
                  control={<RadioCustom icon={<CircleOutlinedIcon />} checkedIcon={<CheckCircleIcon />} />}
                />
                <Typography sx={{ color: '#E5C2B9' }}>{option?.name}</Typography>
              </Box>
              <CardContent sx={{ padding: '0 16px' }}>
                <Typography sx={{ fontSize: '10px', paddingRight: '32px' }} color="text.secondary">
                  {option?.description}
                </Typography>
              </CardContent>
            </CheckBoxStyled>
          </>
        ))}
      </RadioGroup>
    </FormControl>
  ) : null;
};

export default CheckboxChoose;
