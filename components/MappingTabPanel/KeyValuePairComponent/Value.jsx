import { PrimaryButton } from '@/components/ButtonStyle';
import { styled } from '@mui/material';
import React from 'react';
import { PAIR_TYPE } from '.';
import Label from '../../atom/Label';
import Select from '../../Select';

const VALUE_DATA = [
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
  {
    value: 'created structs from struct page',
    label: 'created structs from struct page',
  },
];

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
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

const Value = ({ type, lenthOfData }) => {
  const handleChange = (event) => {
    const value = event.target.value;
  };

  return (
    <Container>
      {type !== PAIR_TYPE.first && <Line />}
      <LabelCustom>Value</LabelCustom>
      <div style={{ width: '24%' }}>
        {(type === PAIR_TYPE.first && lenthOfData === 1) || type === PAIR_TYPE.last ? (
          <Select options={VALUE_DATA} onChange={handleChange} />
        ) : (
          <div style={{ width: '100%' }}>
            <PrimaryButton width={190} height={45}>
              Return to previous value
            </PrimaryButton>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Value;
