import { PrimaryButton } from '@/components/ButtonStyle';
import { styled } from '@mui/material';
import React from 'react';
import Label from '../../atom/Label';
import Select from '../../Select';
import { PAIR_TYPE } from '.';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { generateDataType } from '@/config/constant/common';

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
    return [...generateDataType(), ...data];
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
      <div style={{ width: '20%', marginLeft: 30 }}>
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
