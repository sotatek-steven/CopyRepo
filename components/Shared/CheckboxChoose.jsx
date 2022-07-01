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
  marginTop: '24px',
  marginRight: '30px',
  cursor: 'pointer',
  '@media screen and (max-width:1200px )': {
    minWidth: '400px',
    width: '150px',
  },
  '@media screen and (max-width:900px )': {
    minWidth: '320px',
  },
  '@media screen and (max-width:600px )': {
    minWidth: '200px',
  },
}));

const RadioCustom = styled(Radio)(({ theme }) => ({
  color: '#64F5A6',
  '&.Mui-checked': {
    color: theme.palette.success.main,
  },
}));

const Description = styled('div')(({ theme }) => ({
  fontSize: '14px',
  paddingRight: '32px',
  fontFamily: 'Segoe UI',
  color: theme.palette.text.primary,
  ...theme.components.truncate.threeLineEllipsis,
}));

const CheckboxChoose = ({ options, name, handleChange, idTemplate, dataDetails }) => {
  const theme = useTheme();
  return _.isArray(options) && options.length > 0 ? (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        defaultValue={options[0]._id}
        value={idTemplate}>
        {options.map((option) => (
          <div key={option._id}>
            <CheckBoxStyled
              onClick={() => handleChange(option._id)}
              sx={{
                '&:hover': { opacity: 0.7 },
                borderRight: option._id === idTemplate ? `2px solid ${theme.palette.primary.main}` : 'none',
              }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
                  <FormControlLabel
                    sx={{ margin: '0 0 0 8px' }}
                    key={option._id}
                    value={option._id}
                    control={<RadioCustom icon={<CircleOutlinedIcon />} checkedIcon={<CheckCircleIcon />} />}
                  />
                  <Typography sx={{ color: theme.palette.primary.light }}>{option?.name}</Typography>
                </Box>
                <Typography sx={{ pr: 6, fontSize: '14px', color: theme.palette.success.main, fontWeight: '400' }}>
                  Gas fee: {dataDetails?.gasFee} Gwei
                </Typography>
              </Box>
              <CardContent
                sx={{
                  padding: '0 16px',
                  maxHeight: '131px',
                  height: '100%',
                  width: '431px',
                }}>
                <Typography
                  sx={{
                    fontSize: '12px',
                    paddingRight: '32px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    lineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    minHeight: '45px',
                    '@media screen and (max-width:900px )': {
                      width: '50%',
                    },
                  }}
                  color="text.secondary">
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
