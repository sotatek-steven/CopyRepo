import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from '@mui/material';
import { useRadioGroup } from '@mui/material/RadioGroup';
import React, { useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { styled } from '@mui/material/styles';
import _ from 'lodash';

const CheckBoxStyled = styled(Card)(({ theme }) => ({
  minWidth: 500,
  px: 1.5,
  borderRadius: '4px',
  borderRight: '2px solid',
  borderColor: theme.palette.background.default,
  marginTop: '24px',
}));

const RadioCustom = styled(Radio)(({ theme }) => ({
  color: '#64F5A6',
  '&.Mui-checked': {
    color: theme.palette.success.main,
  },
}));

const CheckboxChoose = ({ options, name, handleChange }) => {
  const theme = useTheme();
  return _.isArray(options) && options.length > 0 ? (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        defaultValue={options[0]._id}>
        {options.map((option) => (
          <div key={option._id}>
            <CheckBoxStyled>
              <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
                <FormControlLabel
                  sx={{ margin: '0 0 0 8px' }}
                  key={option._id}
                  value={option._id}
                  onChange={handleChange}
                  control={<RadioCustom icon={<CircleOutlinedIcon />} checkedIcon={<CheckCircleIcon />} />}
                />
                <Typography sx={{ color: theme.palette.primary.light }}>{option?.name}</Typography>
              </Box>
              <CardContent sx={{ padding: '0 16px' }}>
                <Typography sx={{ fontSize: '12px', paddingRight: '32px' }} color="text.secondary">
                  {option?.description}
                </Typography>
              </CardContent>
            </CheckBoxStyled>
          </div>
        ))}
      </RadioGroup>
    </FormControl>
  ) : null;
};

export default CheckboxChoose;
