import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

const CheckBoxStyled = styled(Checkbox)((theme) => ({
  color: '#64F5A6',
  '&.Mui-checked': {
    color: theme.palette.success.main,
  },
}));
const CheckBoxCustom = ({ label, handleChecked, id }) => {
  return (
    <CheckBoxStyled
      {...label}
      icon={<CircleOutlinedIcon />}
      checkedIcon={<CheckCircleIcon />}
      onChange={(e) => handleCheckedItem(e, id)}
    />
  );
};

export default CheckBoxCustom;
