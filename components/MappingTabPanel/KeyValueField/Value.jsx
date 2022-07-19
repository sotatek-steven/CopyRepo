import { PrimaryButton } from '@/components/ButtonStyle';
import { styled } from '@mui/material';
import React from 'react';
import Label from '../../atom/Label';
import Select from '../../Select';
import { PAIR_TYPE } from '.';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

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
    value: 'int',
    label: 'int',
  },
  {
    value: 'int8',
    label: 'int8',
  },
  {
    value: 'int16',
    label: 'int16',
  },
  {
    value: 'int32',
    label: 'int32',
  },
  {
    value: 'int64',
    label: 'int64',
  },
  {
    value: 'int128',
    label: 'int128',
  },
  {
    value: 'int256',
    label: 'int256',
  },
  {
    value: 'uint',
    label: 'uint',
  },
  {
    value: 'uint8',
    label: 'uint8',
  },
  {
    value: 'uint16',
    label: 'uint16',
  },
  {
    value: 'uint32',
    label: 'uint32',
  },
  {
    value: 'uint64',
    label: 'uint64',
  },
  {
    value: 'uint128',
    label: 'uint128',
  },
  {
    value: 'uint256',
    label: 'uint256',
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

const Value = ({ value, type, lenthOfData, updateValue, returnToPreviousValue, id }) => {
  const moduleState = useSelector((state) => state.userModule);

  const options = useMemo(() => {
    const { structs } = moduleState.sources;
    const data = structs.map((struct) => ({
      value: struct.name,
      label: struct.name,
    }));
    return [...VALUE_DATA, ...data];
  }, [moduleState.sources.structs]);

  const handleChange = (event) => {
    const value = event.target.value;
    if (!updateValue) return;
    updateValue(value);
  };

  const handleClick = () => {
    if (!returnToPreviousValue) return;
    returnToPreviousValue(id);
  };

  return (
    <Container>
      {type !== PAIR_TYPE.first && <Line />}
      <LabelCustom>Value</LabelCustom>
      <div style={{ width: '24%' }}>
        {(type === PAIR_TYPE.first && lenthOfData === 1) || type === PAIR_TYPE.last ? (
          <Select value={value} options={options} onChange={handleChange} menuProps={true} />
        ) : (
          <PrimaryButton width={190} height={45} onClick={handleClick}>
            Return to previous value
          </PrimaryButton>
        )}
      </div>
    </Container>
  );
};

export default Value;
