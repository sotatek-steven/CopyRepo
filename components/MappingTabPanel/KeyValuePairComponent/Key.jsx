import { styled } from '@mui/material';
import React from 'react';
import { PAIR_TYPE } from '.';
import Label from '../../atom/Label';
import Select from '../../Select';

const KEY_DATA = [
  {
    value: 'address',
    label: 'address',
  },
  {
    value: 'bool',
    label: 'bool',
  },
  {
    value: 'int(8-256)',
    label: 'int(8-256)',
  },
  {
    value: 'uint(8-256)',
    label: 'uint(8-256)',
  },
  {
    value: 'string',
    label: 'string',
  },
];

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

const Key = ({ type }) => {
  const handleChange = (event) => {
    const value = event.target.value;
  };

  return (
    <Container>
      {type !== PAIR_TYPE.first && <Line />}
      <LabelCustom>Key</LabelCustom>

      <div style={{ width: '24%' }}>
        <Select options={KEY_DATA} onChange={handleChange} />
      </div>
    </Container>
  );
};

export default Key;
