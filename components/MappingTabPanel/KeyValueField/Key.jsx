import { styled } from '@mui/material';
import React from 'react';
import Label from '../../atom/Label';
import Select from '../../Select';
import { PAIR_TYPE } from '.';
import { generateDataType } from '@/config/constant/common';

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginBottom: 30,
});

const LabelCustom = styled(Label)({
  minWidth: 70,
});
const Line = styled('div')(({ theme }) => ({
  height: 1,
  width: 45,
  background: theme.palette.primary.main,
  marginRight: 5,
}));

const Key = ({ value, type, id, updateKey }) => {
  const handleChange = (event) => {
    const currentValue = event.target.value;
    if (!updateKey) return;
    updateKey(id, currentValue);
  };

  return (
    <Container>
      {type !== PAIR_TYPE.first && <Line />}
      <LabelCustom>Key</LabelCustom>

      <div style={{ width: '24%' }}>
        <Select options={generateDataType()} value={value} onChange={handleChange} menuProps={true} />
      </div>
    </Container>
  );
};

export default Key;
