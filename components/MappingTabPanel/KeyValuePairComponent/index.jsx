import { styled } from '@mui/material';
import React from 'react';
import Key from './Key';
import Value from './Value';

export const PAIR_TYPE = {
  first: 'firstPair',
  middle: 'middlePair',
  last: 'lastPair',
};

const Line = styled('div')(({ theme }) => ({
  width: 1,
  background: theme.palette.primary.main,
  position: 'absolute',
  top: 0,
  height: 'calc(100% - 23px)',
}));

const KeyValuePairComponent = ({ type, lenthOfData }) => {
  return (
    <>
      <Key type={type} />
      <Value type={type} lenthOfData={lenthOfData} />
      {type !== PAIR_TYPE.first && <Line />}
    </>
  );
};

export default KeyValuePairComponent;
