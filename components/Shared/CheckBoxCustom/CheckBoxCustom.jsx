import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

const CheckBoxStyled = styled(Checkbox)((theme) => ({
  color: '#64F5A6',
  '&.Mui-checked': {
    color: '#95D5B2 ',
  },
}));
const CheckBoxCustom = ({ label }) => {
  return <CheckBoxStyled {...label} defaultChecked icon={<CircleOutlinedIcon />} checkedIcon={<CheckCircleIcon />} />;
};

export default CheckBoxCustom;
